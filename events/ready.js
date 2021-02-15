module.exports = client => {
    console.log(`Discord Bot ${client.user.tag} is online!`);
    client.user.setActivity(`over the cookies.`, { type: "WATCHING"}) //"PLAYING", "WATCHING", "LISTENING", "STREAMING"
}