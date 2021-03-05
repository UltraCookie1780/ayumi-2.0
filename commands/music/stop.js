module.exports = {
    name: "stop",
    category: "music",
    aliases: ["stopsong", "stopqueue"],
    cooldown: 5,
    usage: "stop",
    description: "Deletes the current server queue",
    run: async (client, message, args, user, text, prefix) => {	
        const { MessageEmbed } = require("discord.js");
        const channel = message.member.voice.channel;
        if (!channel) return message.reply(`you need to be inside a voice channel.`);
        const q = client.queue.get(message.guild.id);
        if (!q) return message.reply(`I can't stop an empty queue.`);
        if (!q.connection) return;
        if (!q.connection.dispatcher) return;
        try {
            q.connection.dispatcher.end();
        } catch (e) {
            message.guild.me.voice.channel.leave();
            client.queue.delete(message.guild.id);
            return message.reply(`an error occurred. The queue has been cleared.`);
        }
        client.queue.delete(message.guild.id);
        q.songs = [];
        message.react("👌");
    }
}