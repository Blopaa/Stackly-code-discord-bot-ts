import { Message } from 'discord.js';

export const callUsers = (msg: Message, args: string[]) => {
  const times: number = Number(args.slice(1, 2).join());
  const message: string = args.slice(2).join(' ');
  console.log(times);
  const fluxus = msg.mentions.users.first();
  for (let i = 0; i < times; i++) {
    msg.channel.send(`<@${fluxus}> ${message}`);
    fluxus?.send(message);
  }
};
