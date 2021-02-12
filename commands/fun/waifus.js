const Discord = require('discord.js');
const fs = require('fs');
module.exports = {
  name: "waifus",
  category: "fun",
  aliases: ["waifs"],
  cooldown: 5,
  usage: "waifus",
  description: "Displays your waifu collection",
  run: (client, message, args, user, text, prefix) => {
    const users = require("../../rsc/users.json");
    if (users[message.author.id].waifu_count > 0) {
      let page = 1;

      var embed = new Discord.MessageEmbed()
        .setColor("#19bcfc")
        .setTitle(`${message.author.username}'s waifus`)
        .setImage(users[message.author.id].waifus[`${page}`])
        .setFooter(`Page ${page} of ${users[message.author.id].waifu_count}`)
        .setTimestamp();

      message.channel.send(embed).then((msg) => {
        msg.react("⏪").then((r) => {
          msg.react("🗑️").then((r) => {
            msg.react("⏩");
            const controls = {
              NEXT: "⏩",
              PREV: "⏪",
              DEL: "🗑️",
            };
            const filter = (reaction, user) => {
              return user.id === message.author.id;
            };
            const collector = msg.createReactionCollector(filter, {
              time: 120000,
            });

            collector.on("collect", (reaction, user) => {
              switch (reaction.emoji.name) {
                case controls.PREV: {
                  if (page === 1) return;
                  page--;
                  embed.setImage(users[message.author.id].waifus[`${page}`]);
                  embed.setFooter(
                    `Page ${page} of ${users[message.author.id].waifu_count}`
                  );
                  msg.edit(embed);
                  break;
                }
                case controls.NEXT: {
                  if (page === users[message.author.id].waifu_count) return;
                  page++;
                  embed.setImage(users[message.author.id].waifus[`${page}`]);
                  embed.setFooter(
                    `Page ${page} of ${users[message.author.id].waifu_count}`
                  );
                  msg.edit(embed);
                  break;
                }
                case controls.DEL: {
                  delete users[message.author.id].waifus[`${page}`];
                  if (page != users[message.author.id].waifu_count) {
                    users[message.author.id].waifus[`${page}`] = users[message.author.id].waifus[`${users[message.author.id].waifu_count}`];
                    delete users[message.author.id].waifus[`${users[message.author.id].waifu_count}`];
                  }
                  users[message.author.id].waifu_count--;
                  if (users[message.author.id].waifu_count > 0) {
                    page = 1;
                  } else {
                    msg.delete();
                    message.reply("your waifu list has been updated.");
                    fs.writeFileSync("./rsc/users.json", JSON.stringify(users), (err) => {
                      if (err) console.log(err);
                    });
                    break;
                  }
                  embed.setImage(users[message.author.id].waifus[`${page}`]);
                  embed.setFooter(
                    `Page ${page} of ${users[message.author.id].waifu_count}`
                  );
                  msg.edit(embed);
                  message.reply("your waifu list has been updated.");
                  fs.writeFileSync("./rsc/users.json", JSON.stringify(users), (err) => {
                    if (err) console.log(err);
                  });
                }
              }
            });
          });
        });
      });
    } else {
      message.reply(
        `You don't have any waifus. Get them with the \`${prefix}waifu\` command!`
      );
    }
  },
};
