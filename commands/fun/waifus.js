module.exports = {
  name: "waifus",
  category: "fun",
  aliases: ["waifs"],
  cooldown: 5,
  usage: "waifus",
  description: "Displays your waifu collection",
  run: async (client, message, args, user, text, prefix, waifuPoints) => {
    const Discord = require('discord.js');
    const Sequelize = require("sequelize");
    const { Users, Waifus, UserWaifus } = require('../../rsc/connect');
    const User = await Users.findOne({ where: { user_id: message.author.id }});
    const waifus = await User.getWaifus();
    if (waifus.count > 0) {
      let page = 1;
      const reswaifu = await Waifus.findOne({ where: { id: waifus.rows[page - 1].waifu_id}})
      var embed = new Discord.MessageEmbed()
        .setColor("#19bcfc")
        .setTitle(`${message.author.username}'s waifus`)
        .setImage(reswaifu.dataValues.url)
        .setFooter(`Page ${page} of ${waifus.count}`)
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

            collector.on("collect", async (reaction, user) => {
              var waifus = await User.getWaifus();
              switch (reaction.emoji.name) {
                case controls.PREV: {
                  if (page === 1) return;
                  page--;
                  const reswaifu = await Waifus.findOne({ where: { id: waifus.rows[page - 1].waifu_id}})
                  embed.setImage(reswaifu.dataValues.url);
                  embed.setFooter(
                    `Page ${page} of ${waifus.count}`
                  );
                  msg.edit(embed);
                  break;
                }
                case controls.NEXT: {
                  if (page === waifus.count) return;
                  page++;
                  const reswaifu = await Waifus.findOne({ where: { id: waifus.rows[page - 1].waifu_id}})
                  embed.setImage(reswaifu.dataValues.url);
                  embed.setFooter(
                    `Page ${page} of ${waifus.count}`
                  );
                  msg.edit(embed);
                  break;
                }
                case controls.DEL: {
                  var reswaifu = await Waifus.findOne({ where: { id: waifus.rows[page - 1].waifu_id}})
                  await User.delWaifu(reswaifu);
                  waifus = await User.getWaifus();
                  if (waifus.count > 0) {
                    page = 1;
                    reswaifu = await Waifus.findOne({ where: { id: waifus.rows[page - 1].waifu_id}})
                  } else {
                    msg.delete();
                    message.reply("your waifu list has been updated.");
                    break;
                  }
                  embed.setImage(reswaifu.dataValues.url);
                  embed.setFooter(
                    `Page ${page} of ${waifus.count}`
                  );
                  msg.edit(embed);
                  message.reply("your waifu list has been updated.");
                }
              }
            });
          });
        });
      });
    } else {
      message.reply(
        `you don't have any waifus. Get them with the \`${prefix}waifu\` command!`
      );
    }
  },
};
