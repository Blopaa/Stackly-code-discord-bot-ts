import {
  GuildMember,
  Message,
  MessageEmbed,
  MessageReaction,
  PartialGuildMember,
  User,
} from 'discord.js';
import { IServer } from '../database/models/Servers';

export const verification = (msg: Message, args: string[], server: IServer) => {
  const { bot, roles } = server;
  //   if (!bot?.primaryColor) return;
  if (!roles.verificated) {
    msg.reply('no hay un rol de verificacion');
    return;
  }

  const vMsg = new MessageEmbed()
    .setColor(bot.primaryColor)
    .setTitle('verificacion')
    .setDescription(args.join(' '));

  msg.channel.send(vMsg).then((msg: Message) => {
    msg.react('🎟️');
    const filter = (reaction: MessageReaction, user: User) => {
      return reaction.emoji.name === '🎟️' && user.id !== msg.author.id;
    };

    const collector = msg.createReactionCollector(filter, { dispose: true });

    collector.on(
      'collect',
      async (reaction: MessageReaction, user: GuildMember) => {
        const member = msg.guild?.member(user);
        member?.roles.add(roles.verificated);
      }
    );

    collector.on(
      'remove',
      async (reaction: MessageReaction, user: GuildMember) => {
        const member = msg.guild?.member(user);
        member?.roles.remove(roles.verificated);
      }
    );
  });

  msg.delete({ timeout: 1000 });
};
