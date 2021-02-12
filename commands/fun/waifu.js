const fs = require('fs');

module.exports = {
  name: "waifu",
  category: "fun",
  aliases: ["w"],
  cooldown: 2,
  usage: "waifu",
  description: "Sends you collectable waifus",
  run: async (client, message, args, user, text, prefix) => {
    var waifus = require("../../rsc/waifus.json");
    var users = require("../../rsc/users.json");
    var index = Math.floor(Math.random() * waifus.pages.length);
    var url = waifus.pages[index].url;
    message.channel.send(url).then((msg) => {
      msg.react("❤️").catch((err) => console.error(err));

      const filter = (reaction, user) => {
        return reaction.emoji.name === "❤️" && user.id === message.author.id;
      };
      const collector = msg.createReactionCollector(filter, { time: 15000 });

      collector.on("collect", (reaction, user) => {
        var exists = false;
        for (var i = 1; i < users[message.author.id].waifu_count; i++) {
          if (users[message.author.id].waifus[`${i}`] == url) {
            exists = true;
          }
        }
        if (exists == false) {
          users[message.author.id].waifus[
            Object.keys(users[message.author.id].waifus).length + 1
          ] = url;
          users[message.author.id].waifu_count++;
          fs.writeFile("./rsc/users.json", JSON.stringify(users), (err) => {
            if (err) console.log(err);
          });
          message.reply("your waifu list has been updated.");
        } else {
          message.reply(
            `you already have this one in your waifu list. See it with the \`${prefix}waifus\` command.`
          );
        }
      });
    });
  },
};
