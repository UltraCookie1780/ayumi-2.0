//variables
const { Client, Collection } = require("discord.js");
const { Users, Waifus, Servers } = require('./rsc/connect');
const { Op } = require('sequelize');
const fs = require("fs");

const config = require("./config.json");
const prefix = (config.prefix);
const waifuPoints = new Collection();
const servermessages = new Collection();

//help methods
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

Reflect.defineProperty(servermessages, 'addb', {
	value: async function addb(id, amount) {
		const server = servermessages.get(id);
		if (server) {
			server.messages += Number(amount);
			return server.save();
		}
		const newServer = await Servers.create({ server_id: id, messages: amount, verified: false });
		servermessages.set(id, newServer);
		return newServer;
	},
});

Reflect.defineProperty(servermessages, 'getb', {
	value: function getb(id) {
		const server = servermessages.get(id);
		return server ? server.messages : 0;
	},
});

//initialize client
const client = new Client({
    disableEveryone: true,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});

//client collections
client.commands = new Collection();
const cooldowns = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");

//command handler/loader
["command"].forEach(handler => {
    require(`./handlers/command`)(client);
});
const eventhandler = require("./handlers/events"); 
eventhandler(client);

//startup execution
client.on('ready', async () => {
    //sync collections with database
    const wp = await Users.findAll();
    wp.forEach(b => waifuPoints.set(b.user_id, b));
    const sm = await Servers.findAll();
    sm.forEach(b => servermessages.set(b.server_id, b));
  });

//when receiving a message
client.on("message", async message => {
    //message handling
    if (message.channel.type == "dm") return;
    servermessages.addb(message.guild.id, 1);
    if (message.author.bot) return;
    waifuPoints.addb(message.author.id, 1);

    if (!message.content.startsWith(prefix) && message.content.startsWith(client.user.id)) return message.reply(`My Prefix is: **\`${prefix}\`**, type \`${prefix}help\` for more information!`);
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    //when executable command exists
    if (command)
    {
        //cooldown initialization
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Collection());
        }

        //permission handler
        if (command.owner) {
          if (message.author.id != config.owner) {
            return message.reply(`you can't use this command.`);
          }
        }
        
        //cooldown handling
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
        //execute command
        command.run(client, message, args, message.author, args.join(" "), prefix, waifuPoints, servermessages);
      }catch (error){
        //error handling
        console.log(error)
        return message.reply(`Something went wrong while executing: \`${command.name}\``)
      }
    } 
    else
    return message.reply(`Unkown command, try: **\`${prefix}help\`**`)
    
});

//login client
client.login(config.token);