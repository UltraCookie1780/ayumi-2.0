module.exports = {
    name: "skip",
    category: "music",
    aliases: ["skipsong", "next", "jump"],
    cooldown: 3,
    usage: "skip",
    description: "Skips current song",
    run: async (client, message, args, user, text, prefix) => {	
        const { MessageEmbed } = require("discord.js");
        const channel = message.member.voice.channel;
        if (!channel) return message.reply(`you need to be inside a channel to execute this command.`);
        const q = message.client.queue.get(message.guild.id);
        if (!q) return message.reply(`I can't skip a song in an empty queue.`);
        if (!q.connection) return;
        if (!q.connection.dispatcher) return;
        if (q && !q.playing) {
            q.playing = true;
            q.connection.dispatcher.resume();
            const embed = new MessageEmbed()
            .setTitle("Resuming music")
            .setDescription("▶ Resuming paused music.")
            .setColor("BLUE");
            return message.channel.send(embed).catch(err => console.log(err));
        }
        try {
            q.connection.dispatcher.end();
        } catch (e) {
            q.voice.leave();
            client.queue.delete(message.guild.id);
            return message.channel.send("an error has occurred. The current queue has been cleared.");
        }
        message.react("👌");
    }
}