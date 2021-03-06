import { Message, MessageEmbed } from 'discord.js';
import { IServer } from '../database/models/Servers';

export const AvatarCommand = async (message: Message, server: IServer) => {
  const { bot } = server;
  if (!bot || !bot.primaryColor) return;
  await message.channel.send(
    // prettier-ignore
    new MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
      .setTitle("Avatar")
      .setDescription(`${message.author} Este es tu avatar!!!`)
      .setColor(`${bot.primaryColor}`)
      .setImage(`${message.author.avatarURL()}`)
  );
};
