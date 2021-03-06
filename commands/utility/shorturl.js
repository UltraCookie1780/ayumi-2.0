module.exports = {
    name: "shorturl",
    category: "utility",
    aliases: ["short", "shorten", "tinyurl", "su", "urlshort", "tu"],
    cooldown: 10,
    usage: "short [url] <(custom name) or lookup>",
    description: "Creates a tiny url or searches for one",
    run: async (client, message, args, user, text, prefix) => {	
        const { MessageEmbed } = require("discord.js");
        const tu = require("isgd");
        function validURL(str) {
            var pattern = new RegExp('^(https?:\\/\\/)?'+
              '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
              '((\\d{1,3}\\.){3}\\d{1,3}))'+
              '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
              '(\\?[;&a-z\\d%_.~+=-]*)?'+
              '(\\#[-a-z\\d_]*)?$','i');
            return !!pattern.test(str);
        }
        var result = "";
        var s = args.join(" ");
        if (!s) return message.reply(`you need to provide a link.`);
        if (validURL(args[0])) {
            if (!args[1]) {
                tu.shorten(args[0], function(res) {
                    if (res.startsWith('Error:')) {
                        return message.reply(`an error occurred. Have you entered a valid URL?`);
                    }
                    message.reply(`**<${res}>**`);
                });
            } else {
                tu.custom(args[0], args[1], function(res) {
                    if (res.startsWith('Error:')) {
                        return message.reply(`an error occurred. This custom URL might be already used.`);
                    }
                    message.channel.send(`**<${res}>**`);
                });
            }
        } else {
            return message.reply(`this is not a valid URL.`);
        }
    }
}