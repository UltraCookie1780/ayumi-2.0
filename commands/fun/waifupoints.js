module.exports = {
    name: "waifupoints",
    category: "fun",
    aliases: ["wp"],
    cooldown: 2,
    usage: "waifupoints",
    description: "Shows your waifupoints",
    run: async (client, message, args, user, text, prefix) => {	
        var target = message.mentions.users.first() || message.author;
        var wp = client.waifuPoints.get(target.id);
        if (!wp) {
            const emoji1 = client.emojis.cache.find(emoji => emoji.name === "popukosad");
            message.reply(`this user has no waifupoints.${emoji1}`);
        } else {
            const emoji2 = client.emojis.cache.find(emoji => emoji.name === "zerotwohappy");
            message.channel.send(`${target.username} has ${wp.messages}${emoji2} waifupoints.`);
        }
    }
}