import { Message } from 'discord.js';
import { IServer } from '../database/models/Servers';

const { MessageEmbed } = require('discord.js');

export const helpCommand = async (msg: Message, server: IServer) => {
  const { bot, channels } = server;
  if (!bot || !channels) return;
  if (
    (msg.member?.hasPermission('BAN_MEMBERS') &&
      msg.member?.hasPermission('KICK_MEMBERS')) ||
    msg.member?.hasPermission('ADMINISTRATOR')
  ) {
    await msg.channel.send(
      new MessageEmbed()
        .setTitle('Useful Commands:')
        .setColor(bot.primaryColor)
        .setDescription(`**here you will find help for commands**`)
        .setDescription(`prefix: ${bot.prefix}`)
        .addField(`${bot.prefix}avatar`, 'will show your avatar')
        .addField(
          `${bot.prefix}sugerencia`,
          `your suggestion will be sended in <#${channels.sugerencias}>`
        )
        .addField(`${bot.prefix}kick @user`, 'will kick te member mentioned')
        .addField(`${bot.prefix}ban @user`, 'will ban user mentioned')
        .addField(`${bot.prefix}warn @user`, 'will warn user mentioned')
        .addField(
          `${bot.prefix}advert`,
          `send an stylized embed to advert something`
        )
        .addField(
          `${bot.prefix}clear number`,
          'will clear the number of messages desired'
        )
        .addField(
          `${bot.prefix}support`,
          'will send a message click in the reaction to enter in the new support channel'
        )
        .addField(`${bot.prefix}coins`, `this will show your coins`)
        .addField(`${bot.prefix}embed TEXT`, `this will create a simple embed`)
        .addField(
          `${bot.prefix}callUsers USER TIMES_TO_REPEAT MESSAGE`,
          `this will spam a user any times you want with a custom message`
        )
        .addField(
          `${bot.prefix}addReaction CHANNEL MESSAGE_ID ROLE EMOJI`,
          `this will create a reaction role in a desired message`
        )
        .addField(
          `${bot.prefix}verification TEXT`,
          `this will create a custom embed for verification removing the role unverified and add verifird role when you react`
        )
    );
  } else {
    await msg.channel.send(
      new MessageEmbed()
        .setTitle('Useful Commands:')
        .setColor(bot.primaryColor)
        .setDescription(`**here you will find help for commands**`)
        .setDescription(`prefix: ${bot.prefix}`)
        .addField(`${bot.prefix}avatar`, 'will show your avatar')
        .addField(
          `${bot.prefix}sugerencia`,
          `your suggestion will be sended in <#${channels.sugerencias}>`
        )
        .addField(
          `${bot.prefix}support`,
          'will send a message click in the reaction to enter in the new support channel'
        )
        .addField(`${bot.prefix}coins`, `this will show your coins`)
        .addField(`${bot.prefix}embed TEXT`, `this will create a simple embed`)
    );
  }
};
