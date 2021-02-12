const { Client, Collection } = require("discord.js");
const config = require("./config.json");
const users = require("./rsc/users.json");
const prefix = (config.prefix);
const fs = require("fs");

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

client.on("message", async message => {

    if (message.author.bot) return;

    if (!users[message.author.id]) {
      users[message.author.id] = {
        messages: 0,
        waifus: {},
        waifu_count: 0
      };
    }
    users[message.author.id].messages++;
    if (users[message.author.id].messages == 100) {
      const role = message.guild.roles.cache.find(role => role.name === '100 Messages');
      message.member.roles.add(role)
    }
    fs.writeFile("./rsc/users.json", JSON.stringify(users), err => {
      if (err) console.log(err);
    });

    if(!message.content.startsWith(prefix)&& message.content.startsWith(client.user.id)) return message.reply(`My Prefix is: **\`${prefix}\`**, type \`${prefix}help\` for more information!`);
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
        command.run(client, message, args, message.author, args.join(" "), prefix);
        /* /////////////////////////////////////////
          client is: the <DiscordClient>
          message is: the <Message>
          user is: the <DiscordUser>
          text is: <everything after the command>
          prefix is: <config.prefix>
        */ ///////////////////////////////////////////////////////
      }catch (error){
        console.log(error)
        return message.reply(`Something went wrong while executing: \`${command.name}\``)
      }
    } 
    else
    return message.reply(`Unkown command, try: **\`${prefix}help\`**`)
    
});

client.login(config.token);