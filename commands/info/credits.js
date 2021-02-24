module.exports = {
    name: "credits",
    category: "info",
    aliases: ["creds", "c"],
    cooldown: 2,
    usage: "credits",
    description: "Shows developer credits",
    run: async (client, message, args, user, text, prefix) => {
        const { MessageEmbed } = require("discord.js");
        const embed = new MessageEmbed()
        .setColor("BLACK")
        .setThumbnail('https://i.imgur.com/qeme9e0.png')
        .setTitle("CREDITS")
        .setDescription("[YouTube](https://www.youtube.com/channel/UCeIM39CTf2D6_NqZOyyLx7w)\n[Discord](https://discord.gg/ZWW6yBFSQk)\n[Instagram](https://www.instagram.com/ultracookie1780/)(Inactive)")
        .setFooter("Ayumi2.0 - provided by UltraCookie#0818");
        message.channel.send(embed)
    }
}