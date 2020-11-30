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
    );
  }
};
