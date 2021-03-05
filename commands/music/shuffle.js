module.exports = {
    name: "shuffle",
    category: "music",
    aliases: ["shufflequeue", "shufflesongs"],
    cooldown: 7,
    usage: "shuffle",
    description: "Shuffles the current server queue",
    run: async (client, message, args, user, text, prefix) => {	
        const q = client.queue.get(message.guild.id);
        if (!q) return message.reply(`the queue is empty.`);
        try {
            const songs = q.songs;
            for (var i = songs.length - 1; i > 1; i--) {
                var j = 1 + Math.floor(Math.random() * i);
                [songs[i], songs[j]] = [songs[j], songs[i]];
            }
            q.songs = songs;
            client.queue.set(message.guild.id, q);
            message.react("👌");
        } catch (e) {
            message.guild.me.voice.channel.leave();
            client.queue.delete(message.guild.id);
            return message.reply(`an error occurred. The queue has been cleared.`);
        }
    }
}