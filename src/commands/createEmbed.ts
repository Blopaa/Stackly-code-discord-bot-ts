import { Message, MessageEmbed } from 'discord.js';

export const createEmbed = (msg: Message, args: string[]) => {
  const embed = new MessageEmbed().setDescription(args.join(' '));

  msg.channel.send(embed);
};
