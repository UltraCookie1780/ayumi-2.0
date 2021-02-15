const { Client, Collection } = require("discord.js");

const config = require("./config.json");
const prefix = (config.prefix);

const fs = require("fs");

const { Users, Waifus } = require('./rsc/connect');
const { Op } = require('sequelize');
const waifuPoints = new Collection();

const client = new Client({
    disableEveryone: true,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
}); 

client.commands = new Collection();
const cooldowns = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/command`)(client);
});
const eventhandler = require("./handlers/events"); 
eventhandler(client);

Reflect.defineProperty(waifuPoints, 'addb', {
	value: async function addb(id, amount) {
		const user = waifuPoints.get(id);
		if (user) {
			user.messages += Number(amount);
			return user.save();
		}
		const newUser = await Users.create({ user_id: id, messages: amount });
		waifuPoints.set(id, newUser);
		return newUser;
	},
});

Reflect.defineProperty(waifuPoints, 'getb', {
	value: function getb(id) {
		const user = waifuPoints.get(id);
		return user ? user.messages : 0;
	},
});

client.on('ready', async () => {
    const storedBalances = await Users.findAll();
    storedBalances.forEach(b => waifuPoints.set(b.user_id, b));
  });

client.on("message", async message => {

    if (message.author.bot) return;
    waifuPoints.addb(message.author.id, 1);

    if (!message.content.startsWith(prefix) && message.content.startsWith(client.user.id)) return message.reply(`My Prefix is: **\`${prefix}\`**, type \`${prefix}help\` for more information!`);
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

   
    if (command)
    {
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Collection());
        }
        
        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 1) * 1000;
      
        if (timestamps.has(message.author.id)) {
          const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
      
          if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply( 
              `Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`
            );
          }
        }
      
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      try{
        command.run(client, message, args, message.author, args.join(" "), prefix, waifuPoints);
      }catch (error){
        console.log(error)
        return message.reply(`Something went wrong while executing: \`${command.name}\``)
      }
    } 
    else
    return message.reply(`Unkown command, try: **\`${prefix}help\`**`)
    
});

client.login(config.token);