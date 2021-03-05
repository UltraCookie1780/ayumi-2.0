module.exports = {
    name: "volume",
    category: "music",
    aliases: ["vol", "setvolume", "changevolume"],
    cooldown: 5,
    usage: "volume [0 - 150]",
    description: "Loops the current server queue",
    run: async (client, message, args, user, text, prefix) => {	
        const { MessageEmbed } = require("discord.js");
        const channel = message.member.voice.channel;
        if (!channel) return message.reply(`you need to be inside a voice channel.`);
        const q = client.queue.get(message.guild.id);
        if (!q) return message.reply(`the queue is empty.`);
        if (!q.connection) return message.reply(`the queue is empty.`);
        if (!args[0]) return message.channel.send(`🔊  **|**  Volume is: **\`${q.volume}%\``);
        if (isNaN(args[0])) return message.channel.send(`:notes: Please provide a valid number.`).catch(err => console.log(err));
        if (parseInt(args[0]) > 150 || (args[0]) < 0) return message.reply(`you need to provide a number between 150 and 0.`);
        q.volume = args[0];
        q.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
        const embed = new MessageEmbed()
        .setDescription(`The volume has been set to: **${args[0]}%**`)
        .setAuthor("Changed volume", "https://raw.githubusercontent.com/UltraCookie1780/ayumi-2.0/master/rsc/img/record.jpg")
        .setColor("BLUE")
        return message.channel.send(embed);
    }
}