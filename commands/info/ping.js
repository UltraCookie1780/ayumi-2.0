//Here the command starts
module.exports = {
    //definition
    name: "ping", 
    category: "info",
    aliases: ["latency"],
    cooldown: 2,
    usage: "ping",
    description: "Bot API latency information",

    run: async (client, message, args, user, text, prefix, waifuPoints) => {
        const msg = await message.channel.send(`🏓 Pinging...`); 
        msg.edit(`🏓 Pong!
        Ping is ${Math.round(client.ws.ping)}ms`);
    }
}
