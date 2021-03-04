module.exports = {
    name: "modify",
    category: "admin",
    aliases: ["m", "mf"],
    cooldown: 0,
    owner: true,
    usage: "modify <<waifus>/<messages>> <add/remove> <<count>/<url>> <user>",
    description: "Modifies database data",
    run: async (client, message, args, user, text, prefix) => {
        const { Users, Waifus, UserWaifus, Servers } = require('../../rsc/connect');	
        if (args[0] == "waifus") {
            if (args[1] == "add") {
                const url = await Waifus.findOne({ where: { url: args[2] } });
                if (!url) return message.reply(`this is not a valid waifu url.`);
                const user = await Users.findOne({ where: { user_id: message.mentions.users.first().id } });
                if (!user) return message.reply(`you need to provide an existing user.`);
                await user.addWaifu(url);
                message.reply(`this waifu has been successfully added to the database.`);
            } else if (args[1] == "remove") {
                const url = await Waifus.findOne({ where: { url: args[2] } });
                if (!url) return message.reply(`this is not a valid waifu url.`);
                const user = await Users.findOne({ where: { user_id: message.mentions.users.first().id } });
                if (!user) return message.reply(`you need to provide an existing user.`);
                await user.delWaifu(url);
                message.reply(`this waifu has been successfully removed from the database.`);
            } else {
                message.reply(`please provide valid arguments. Expected: \`add\`/\`remove\``);
            }
        } else if (args[0] == "messages") {
            if (args[1] == "add") {
                var target = message.mentions.members.first() || message.member;
                function isInt(value) { 
                    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
                }
                const cnt = args[2];
                if (!isInt(cnt)) return message.reply(`please provide a valid number.`);
                client.waifuPoints.addb(target.id, cnt);
                message.reply(`the message count has been successfully added.`);
            } else if (args[1] == "remove") {
                var target = message.mentions.members.first() || message.member;
                function isInt(value) { 
                    return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
                }
                const cnt = args[2];
                if (!isInt(cnt)) return message.reply(`please provide a valid number.`);
                client.waifuPoints.addb(target.id, -cnt);
                message.reply(`the message count has been successfully removed.`);
            } else {
                message.reply(`please provide valid arguments. Expected: \`add\`/\`remove\``);
            }
        } else {
            message.reply(`please provide valid arguments. Expected: \`waifus\`/\`messages\``);
        }
    }
}