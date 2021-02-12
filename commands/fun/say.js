module.exports = {
    name: "say",
    category: "fun",
    aliases: ["say", "sayit"],
    cooldown: 2,
    usage: "say <Text>",
    description: "Resends the message",
    run: async (client, message, args, user, text, prefix) => {	
        if (text != "") {
            message.channel.send(text);
        }
    }
}