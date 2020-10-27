"use strict";

const dotenv = require("dotenv");
dotenv.config();
const Discord = require("discord.js");
const User = require("./database/models/Users");
const Server = require("./database/models/Servers");
const { MessageEmbed } = require("discord.js");
const { suggestions } = require("./commands/suggestion");
const { AvatarCommand } = require("./commands/avatar");
const { kickCommand } = require("./commands/moderation/kick");
const { banCommand } = require("./commands/moderation/ban");
const { warnCommand } = require("./commands/moderation/warn");
const { advertisments } = require("./commands/advertisement");
const { helpCommand } = require("./commands/help");
const { clearCommand } = require("./commands/clear");
const { supportCommand } = require("./commands/tickets/support");
require("./database/database");
const connect = require("./database/database");
const { CoinsCommand } = require("./commands/economy/myCoins");
const client = new Discord.Client();

client.on("ready", async (i) => {
  console.log("bot online");
  await client.user?.setActivity(`Hey :D`); // establish bot activity
});

client.on("message", async (msg) => {
  let server = await Server.findOne({ serverID: msg.guild.id });
  let { serverID, bot } = server;
  let userData = await User.findOne({ IDuser: msg.author.id });

  const prefixMsg = msg.content.split(" ").shift().split("").shift();
  const commandArguments = msg.content.split(" ");
  let commandName = commandArguments.shift() || bot.prefix;
  commandName = await commandName.slice(bot.prefix.length);
  if (prefixMsg === bot.prefix && msg.guild.id === serverID) {
    switch (commandName) {
      case "avatar":
        await AvatarCommand(msg, server);
        break;
      case "kick":
        await kickCommand(msg, server);
        break;
      case "ban":
        await banCommand(msg, server);
        break;
      case "warn":
        await warnCommand(msg, server);
        break;
      case "support":
        await supportCommand(msg, server);
        break;
      case "suggestion":
        await suggestions(msg, commandArguments, server);
        break;
      case "advert":
        await advertisments(msg, commandArguments, server);
        break;
      case "clear":
        await clearCommand(msg, commandArguments);
        break;
      case "help":
        await helpCommand(msg, server);
        break;
      case "coins":
        await CoinsCommand(msg);
    }
  }



  if (!userData) {
    await User.create({
      user: {
          name: msg.author.tag,
          coins: 0,
        },
        IDuser: msg.author.id
    });
    msg.reply('se te ha creado un usuario, ahora podras ganar monedas para ver tus monedas haz **!coins**')
  }

 if(userData){
  userData.user.coins += 1;
  await userData.save();
 }
});

client.on("guildMemberAdd", async (member) => {
  const server = await Server.findOne({ serverID: member.guild.id });
  const { channels, roles, bot } = server;
  if (roles.invitado) {
    member.roles.add(roles.invitado);
  }
  const channel = member.guild.channels.cache.find(
    (ch) => ch.id === channels.bienvenidas
  );

  if (!channel) return;

  const welcomeEmbed = new MessageEmbed()
    .setTitle("BIENVENIDO")
    .setColor(bot.color.primary)
    .setDescription(`Bienvenido al servidor ${member}`);

  channel.send(welcomeEmbed);
});

(async () => {
  connect();
})();

client.login(`${process.env.BOT_TOKEN}`);
