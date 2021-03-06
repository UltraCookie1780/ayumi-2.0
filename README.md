# Ayumi2.0 ![](https://img.shields.io/github/package-json/v/UltraCookie1780/ayumi-2.0?color=yellow&label=Version) ![](https://img.shields.io/discord/720937574318866432?color=blue&label=Discord&logo=discord&url=https://discord.gg/ZWW6yBFSQk)

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
  "dbuser": "(Your Postgres Database Username Here)",
  "owner": "(Your discord ID)",
  "privatecommands" : "(Folder name of your private commands(won't be shown with help command))",
  "statusmsg": "(Custom status message)",
  "statustype": "(WATCHING, PLAYING, STREAMING or LISTENING)",
  "standardcooldown": 1
}
```
4. You will need to install all needed dependencies(Insights -> Dependency Graph)
5. You will need to install postgreSQL and setup a database with the SAME name as your postgres username (standard: postgres)
6. Run `node rsc/dbInit.js -f` from your main directory to setup the database
7. Run `node index.js` to run the bot.

## Features
See the wiki here: [Wiki](https://github.com/UltraCookie1780/ayumi-2.0/wiki)

You are able to see all commands with the `+help` command. For more information on a specific command you can type `+help <command>`. 

## Social
- [YouTube](https://www.youtube.com/channel/UCeIM39CTf2D6_NqZOyyLx7w)
- [Discord](https://discord.gg/ZWW6yBFSQk) ![](https://img.shields.io/discord/720937574318866432?color=blue&label=Discord&logo=discord&url=https://discord.gg/ZWW6yBFSQk)
- [Instagram](https://www.instagram.com/ultracookie1780/)(Inactive)

## License
[MIT](https://choosealicense.com/licenses/mit/)
- Of course I am happy if you credit me somehow and follow me on my social media accounts.


![](https://raw.githubusercontent.com/UltraCookie1780/ayumi-2.0/master/rsc/img/cookie-3180329_1920.png)
