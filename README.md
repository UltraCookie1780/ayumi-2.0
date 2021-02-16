# Ayumi2.0

Ayumi2.0 is a powerful discord bot based on the discord.js library. It has a lot of useful and fun features such as waifu collection, bot/server information and more. The bot is designed to keep the server active and more importantly safe.

## Setup
If you want this bot on your own server, invite the bot via this link:
[Invite](https://discord.com/api/oauth2/authorize?client_id=690883040636960778&permissions=388160&scope=bot)

If you want to use the code and setup this bot for yourself, then follow these steps to set it up properly:

1. Clone this repository to your local workspace
2. In the main directory add a file called `config.json` and copy the following:
```
{
  "token": "(Your Bot Token Here)",
  "prefix": "(Your Custom Prefix Here)",
  "waifucost": (The price to collect a waifu),
  "dbpass": "(Your Postgres Database Password Here)",
  "dbuser": "(Your Postgres Database Username Here)"
}
```
4. You will need to install all needed dependencies(Insights -> Dependency Graph
5. Run `node rsc/dbInit.js -f` from your main directory to setup the database
6. Run `node index.js` to run the bot.

## Features
See the wiki here: [Wiki](https://github.com/UltraCookie1780/ayumi-2.0/wiki)

You are able to see all commands with the `+help` command. For more information on a specific command you can type `+help <command>`. 



## License
[MIT](https://choosealicense.com/licenses/mit/)
- Of course I am happy if you credit me somehow and follow me on my social media accounts


![](https://raw.githubusercontent.com/UltraCookie1780/ayumi-2.0/master/rsc/img/cookie-3180329_1920.png)
