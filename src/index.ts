"use strict";

import { Message, MessageEmbed, GuildMember, PartialGuildMember, Client, TextChannel } from "discord.js";


import dotenv from 'dotenv'
dotenv.config();
import Discord from "discord.js"
import User from "./database/models/Users";
import Server, { IServer } from "./database/models/Servers";
import {connect} from "./database/database";
const client: Client = new Discord.Client();

client.on("ready", async () => {
  console.log("bot online");
  await client.user?.setActivity(`Hey :D`); // establish bot activity
});

client.on("message", async (msg: Message) => {
  if(!msg.guild) return
  let server = await Server.findOne({ serverID: msg.guild.id});
  if(!server) return
  let { serverID, bot }: IServer = server;
  if(!serverID || !bot) return
  let userData = await User.findOne({ IDuser: msg.author.id });

  if(!msg.content.startsWith(bot.prefix)){
    return
  }

  const commandArguments = msg.content.split(" ");
  let commandName = commandArguments.shift() || bot.prefix;
  commandName = await commandName.slice(bot.prefix.length);
  if (msg.guild.id === serverID) {
    // switch (commandName) {
    //   case "avatar":
    //     await AvatarCommand(msg, server);
    //     break;
    //   case "kick":
    //     await kickCommand(msg, server);
    //     break;
    //   case "ban":
    //     await banCommand(msg, server);
    //     break;
    //   case "warn":
    //     await warnCommand(msg, server);
    //     break;
    //   case "support":
    //     await supportCommand(msg, server);
    //     break;
    //   case "suggestion":
    //     await suggestions(msg, commandArguments, server);
    //     break;
    //   case "advert":
    //     await advertisments(msg, commandArguments, server);
    //     break;
    //   case "clear":
    //     await clearCommand(msg, commandArguments);
    //     break;
    //   case "help":
    //     await helpCommand(msg, server);
    //     break;
    //   case "coins":
    //     await CoinsCommand(msg);
    // }
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

client.on("guildMemberAdd", async (member: GuildMember | PartialGuildMember): Promise<void> => {
  const server = await Server.findOne({ serverID: member.guild.id });
  if(!server) return
  const { channels, roles, bot }: IServer = server;
  if(!roles || !channels || !bot || !bot.color) return;
  if (roles.invitado) {
    member.roles.add(roles.invitado);
  }
  const channel = member.guild.channels.cache.find(
    (ch) => ch.id === channels.bienvenidas
  );

  if (!channel) return;

  await (channel as TextChannel).send(
     new MessageEmbed()
    .setTitle("BIENVENIDO")
    .setColor(bot.color.primary)
    .setDescription(`Bienvenido al servidor ${member}`)
  );
});

(async () => {
  connect();
})();

client.login(`${process.env.BOT_TOKEN}`);