module.exports = client => {
    const config = require("../config.json");
    console.log(`Discord Bot ${client.user.tag} is online!`);
    client.user.setActivity(`${config.statusmsg}`, { type: `${config.statustype}`}); //"PLAYING", "WATCHING", "LISTENING", "STREAMING"
}