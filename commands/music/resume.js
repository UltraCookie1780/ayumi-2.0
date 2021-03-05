module.exports = {
    name: "resume",
    category: "music",
    aliases: ["continue", "resumequeue", "resumesong"],
    cooldown: 5,
    usage: "resume",
    description: "Resumes the current server queue",
    run: async (client, message, args, user, text, prefix) => {	
        const { MessageEmbed } = require("discord.js");
        const config = require("../../config.json");
        const q = client.queue.get(message.guild.id);
        if (q && !q.playing) {
            q.playing = true;
            q.connection.dispatcher.resume();
            const embed = new MessageEmbed()
            .setDescription(`▶️ The music has been resumed. Pause with the \`${config.prefix}pause\` command.`)
            .setTitle("Music has been resumed")
            .setColor("BLUE")
            return message.channel.send(embed);
        }
        return message.reply(`I can't resume an empty queue.`);
    }
}