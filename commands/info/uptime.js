//Here the command starts
module.exports = {
    //definition
    name: "uptime",
    category: "info",
    aliases: ["up"],
    cooldown: 10,
    usage: "uptime",
    description: "Uptime information",

    run: async (client, message, args, user, text, prefix, waifuPoints) => {
        function duration(ms) { 
            const sec = Math.floor(ms / 1000 % 60).toString();
            const min = Math.floor(ms / (60*1000) % 60).toString();
            const hrs = Math.floor(ms / (60*60*1000) % 60).toString();
            const days = Math.floor(ms / (24*60*60*1000) % 60).toString();
            return `\`${days} Days\`, \`${hrs} Hours\`, \`${min} Minutes\`, \`${sec} Seconds\``
        }
        message.reply(`:white_check_mark: **${client.user.username}** is up since ${duration(client.uptime)}`);
    }
}