module.exports = {
    name: "lyrics",
    category: "music",
    aliases: ["findlyrics", "songlyrics"],
    cooldown: 5,
    usage: "lyrics",
    description: "Displays the lyrics for the current song",
    run: async (client, message, args, user, text, prefix) => {	
        const { MessageEmbed } = require("discord.js");
        const lf = require("lyrics-finder");
        const q = client.queue.get(message.guild.id);
        if (!q) return message.reply(`there is no song in the queue.`);
        let lyrics = null;
        try {
            lyrics = await lf(q.songs[0].title, "");
            if (!lyrics) lyrics = `Could not find lyrics for ${q.songs[0].title}.`;
        } catch (e) {
            lyrics = `Could not find lyrics for ${q.songs[0].title}.`;
        }
        let embed = new MessageEmbed()
        .setAuthor(`${q.songs[0].title} - Lyrics`, "https://raw.githubusercontent.com/UltraCookie1780/ayumi-2.0/master/rsc/img/record.jpg")
        .setThumbnail(q.songs[0].thumb)
        .setColor("BLUE")
        .setDescription(lyrics)
        .setTimestamp();

        if (embed.description.length >= 2048) {
            embed.description = `${embed.description.substr(0, 2045)}`;
        }
        return message.channel.send(embed).catch(console.error);
    }
}