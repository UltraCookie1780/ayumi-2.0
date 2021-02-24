module.exports = {
    name: "verify",
    category: "admin",
    aliases: ["v", "verifyserver"],
    cooldown: 0,
    owner: true,
    usage: "verify <server-id>",
    description: "Gives a server the verified status",
    run: async (client, message, args, user, text, prefix) => {
        if (args == "") {
            message.reply(`please provide a valid guild id.`);
        } else if (client.servermessages.get(message.guild.id)) {
            const { Users, Waifus, UserWaifus, Servers } = require('../../rsc/connect');
            const server = await Servers.findOne({ where: { server_id: message.guild.id } });
            await server.verify(message.guild.id);
            message.reply(`the guild has been successfully verified!`);
        }
    }
}