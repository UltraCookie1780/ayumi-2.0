module.exports = {
    name: "server",
    category: "info",
    aliases: ["s", "serverinfo"],
    cooldown: 5,
    usage: "server",
    description: "Displays all information about the server",
    run: async (client, message, args, user, text, prefix) => {	
        const { MessageEmbed } = require("discord.js");
        const { Servers } = require("../../rsc/connect");
        const verified = await Servers.findOne({ where: { server_id: message.guild.id } });
        if (!verified) {
            return message.reply(`an error occurred, please try again.`);
        }
        const embed = new MessageEmbed()
        .setColor("BLACK")
        .setThumbnail(client.user.displayAvatarURL())
        .setTitle("Server: " + message.guild.name)
        .addField("Name:", "`" + message.guild.name +"`")
        .addFields(
            { name: "Members:", value: "`" + message.guild.memberCount + "`", inline: true},
            { name: "Messages:", value: "`" + client.servermessages.getb(message.guild.id) + "`", inline: true},
            { name: "Verified", value: verified.verified, inline: true },

        )
        .setFooter("Owner: " + message.guild.owner.displayName);
        message.channel.send(embed)
    }
}