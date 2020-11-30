import {
  GuildMember,
  Message,
  MessageReaction,
  TextChannel,
  User,
} from 'discord.js';

export const addReactionsRoles = async (msg: Message, args: string[]) => {
  const role = msg.mentions.roles.first();
  const emoji: string = args.slice(3, 4).join();
  const channelmentioned = msg.mentions.channels.first()?.id;
  console.log(emoji);

  if (!role) {
    msg.reply('no mencionaste un rol');
    return;
  }

  const channel = msg.guild?.channels.cache.find(
    (x) => x.id === channelmentioned
  );

  const filter = (reaction: MessageReaction, user: User) => {
    return reaction.emoji.name === emoji;
  };

  (channel as TextChannel).messages
    .fetch(args.slice(1, 2).join())
    .then((msg: Message) => {
      const collector = msg.createReactionCollector(filter, { dispose: true });
      msg.react(emoji);

      collector.on(
        'collect',
        async (reaction: MessageReaction, user: GuildMember) => {
          const member = msg.guild?.member(user);
          member?.send(`se te a añadido el rol ${role.name}`);
          member?.roles.add(role);
        }
      );

      collector.on(
        'remove',
        async (reaction: MessageReaction, user: GuildMember) => {
          const member = msg.guild?.member(user);
          member?.send(`se te a quitao el rol ${role.name}`);
          member?.roles.remove(role);
        }
      );
    });
};
