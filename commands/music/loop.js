module.exports = {
    name: "loop",
    category: "music",
    aliases: ["loopqueue"],
    cooldown: 5,
    usage: "loop",
    description: "Loops the current server queue",
    run: async (client, message, args, user, text, prefix) => {	
        const { MessageEmbed } = require("discord.js");
        const queue = client.queue.get(message.guild.id);
        if (queue) {
            queue.loop = !queue.loop;
            return message.channel.send({
                embed: {
                    color: "BLUE",
                    description: `🔁  **|**  Loop is now **\`${queue.loop === true ? "enabled" : "disabled"}\`**`
                }
            });
        };
        return message.channel.send("I can't loop an empty queue.");
    }
}