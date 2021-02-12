module.exports = {
    name: "number",
    category: "fun",
    aliases: ["num", "random", "rand"],
    cooldown: 2,
    usage: "number <<min> <max>>",
    description: "Returns a random number. Default: 1 - 100",
    run: async (client, message, args, user, text, prefix) => {
        if (args == "") {
            message.reply(Math.floor(Math.random() * 100) + 1);
        } else if (!isNaN(args[0]) && !isNaN(args[1])) {
            message.reply(Math.floor(Math.random() * (args[1] - args[0])) + Math.floor(args[0]));
        } else {
            message.reply(`please provide valid arguments.`);
        }
    }
}
