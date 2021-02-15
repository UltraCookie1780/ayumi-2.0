module.exports = {
  name: "waifu",
  category: "fun",
  aliases: ["w"],
  cooldown: 2,
  usage: "waifu",
  description: "Sends you collectable waifus",
  run: async (client, message, args, user, text, prefix, waifuPoints) => {
    const Sequelize = require("sequelize");
    const { Users, Waifus } = require('../../rsc/connect')
    const { waifucost } = require('../../config.json');
    const url = await Waifus.findOne({ order: Sequelize.literal('random()') });
    message.channel.send(url.url).then((msg) => {
      msg.react("❤️").catch((err) => console.error(err));

      const filter = (reaction, user) => {
        return reaction.emoji.name === "❤️" && user.id === message.author.id;
      };
      const collector = msg.createReactionCollector(filter, { time: 30000 });

      collector.on("collect", async (reaction, user) => {
        const WaifuPoints = waifuPoints.get(message.author.id)
        if (WaifuPoints.messages >= waifucost) {
          const { waifucost } = require("../../config.json");
          const user = await Users.findOne({ where: { user_id: message.author.id } });
          waifuPoints.addb(message.author.id, -waifucost);
          await user.addWaifu(url);
          message.reply(`your waifu list has been updated.`);
        } else {
          message.reply(`you need ${waifucost - WaifuPoints.messages} more waifupoints to collect this waifu. See your waifu points with the \`${prefix}waifupoints\` command.`);
        }
      });
    });
  },
};
