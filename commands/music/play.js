module.exports = {
    name: "play",
    category: "music",
    aliases: ["p", "playsong"],
    cooldown: 0,
    verified: true,
    usage: "play <link/name>",
    description: "Plays music from YouTube",
    run: async (client, message, args, user, text, prefix) => {	
        const ytdl = require("ytdl-core");
        const ytsearch = require("yt-search");
        const { Util, MessageEmbed } = require("discord.js");
        const channel = message.member.voice.channel;
        if (!channel) return message.reply(`you need to be inside a voice channel to play music.`);
        const perms = channel.permissionsFor(client.user);
        if (!perms.has("CONNECT")) return message.reply(`I can't connect to this channel.`);
        if (!perms.has("SPEAK")) return message.reply(`I can't speak in this channel.`);
        var s = args.join(" ");
        if (!s) return message.reply(`you need to provide a link/name to a video.`);
        const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
        var q = client.queue.get(message.guild.id);
        let info = null;
        let song = null;
        if (url.match(/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi)) {
            try {
                info = await ytdl.getInfo(url);
                if (!info) return message.reply(`I can't find this song on youtube.`);
                song = {
                    title: info.videoDetails.title,
                    url: info.videoDetails.video_url,
                    thumb: info.player_response.videoDetails.thumbnail.thumbnails[0].url,
                    length: info.videoDetails.lengthSeconds,
                    date: info.videoDetails.publishDate,
                    views: String(info.videoDetails.viewCount).padStart(10, " ")
                }
            } catch (e) {
                console.error(e);
                return message.reply(`an error occurred.`);
            }
        } else {
            try {
                var search = await ytsearch.search(s);
                if (search.videos.length == 0) return message.reply(`I cannot find this song on YouTube.`);
                info = search.videos[0];
                song = {
                    title: Util.escapeMarkdown(info.title),
                    views: String(info.views).padStart(10, " "),
                    url: info.url,
                    date: info.ago,
                    length: info.duration.toString(),
                    thumb: info.image
                };
            } catch (e) {
                console.error(e);
                return message.reply(`an error occurred.`);
            }
        }
        if (q) {
            q.songs.push(song);
            const addToQueue = new MessageEmbed()
            .setAuthor("Added to queue", "https://raw.githubusercontent.com/UltraCookie1780/ayumi-2.0/master/rsc/img/record.jpg")
            .setThumbnail(song.thumb)
            .setColor("BLUE")
            .addField("Name:", song.title, true)
            .addField("Length:", song.length, true)
            .setFooter(`${song.views} views | ${song.date}`);
            return message.channel.send(addToQueue);
        }
        const qconstructor = {
            channel: message.channel,
            voice: channel,
            songs: [],
            loop: false,
            volume: 100,
            playing: true,
            connection: null
        };
        client.queue.set(message.guild.id, qconstructor);
        qconstructor.songs.push(song);

        const play = async (song) => {
            const queue = client.queue.get(message.guild.id);
            if (!song) {
                message.channel.send("I left the voice channel because there are no more songs in the queue.");
                message.guild.me.voice.channel.leave();
                client.queue.delete(message.guild.id);
                return;
            }
            let music = null;
            if (song.url.includes("youtube.com")) {
                music = await ytdl(song.url);
                music.on("error", function (err) {
                    if (err) {
                        if (queue) {
                            queue.songs.shift();
                            play(queue.songs[0]);
                            return message.channel.send("An error has occurred. Skipping song.");
                        }
                    }
                });
            }
            queue.connection.on("disconnect", () => {
                client.queue.delete(message.guild.id);
            });
            const dispatcher = queue.connection.play(ytdl(song.url, { quality: "highestaudio", highWaterMark: 1024 * 1024 * 30, type: "opus" })).on("finish", () => {
                const shift = queue.songs.shift();
                if (queue.loop == true) {
                    queue.songs.push(shift);
                }
                play(queue.songs[0]);
            });
            dispatcher.setVolumeLogarithmic(queue.volume / 100);
            const playsong = new MessageEmbed()
            .setAuthor("Now playing", "https://raw.githubusercontent.com/UltraCookie1780/ayumi-2.0/master/rsc/img/record.jpg")
            .setThumbnail(song.thumb)
            .setColor("BLUE")
            .addField("Name:", song.title, true)
            .addField("Length:", song.length, true)
            .setFooter(`${song.views} views | ${song.date}`);
            queue.channel.send(playsong);
        };
        try {
            const connection = await channel.join();
            qconstructor.connection = connection;
            play(qconstructor.songs[0]);
        } catch (err) {
            console.error(err);
            client.queue.delete(message.guild.id);
            await channel.leave();
            return message.channel.send("An error occurred while joining the voice channel.");
        }
    }
}