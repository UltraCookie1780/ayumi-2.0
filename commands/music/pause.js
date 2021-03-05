module.exports = {
    name: "pause",
    category: "music",
    aliases: ["pausesong", "pausequeue"],
    cooldown: 5,
    usage: "pause",
    description: "Pauses the current server queue",
    run: async (client, message, args, user, text, prefix) => {	
        const { MessageEmbed } = require("discord.js");
        const config = require("../../config.json");
        const q = client.queue.get(message.guild.id);
        if (q && q.playing) {
            q.playing = false;
            try {
                q.connection.dispatcher.pause();
            } catch (e) {
                client.queue.delete(message.guild.id);
                return message.reply(`an error occurred. The queue has been cleared.`);
            }
            const embed = new MessageEmbed()
            .setDescription(`⏸️ The music has been paused. Resume with the \`${config.prefix}resume\` command.`)
            .setTitle("Music has been paused")
            .setColor("BLUE")
            return message.channel.send(embed);
        }
        return message.reply(`I can't pause an empty queue.`);
    }
}