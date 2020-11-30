import { Message, MessageEmbed } from 'discord.js';
import { IServer } from '../database/models/Servers';

export const advertisments = async (
  msg: Message,
  args: string[],
  server: IServer
) => {
  if (!msg.member) return;
  const { bot } = server;
  if (!bot?.primaryColor) return;
  const sEmbed = new MessageEmbed()
    .setTimestamp()
    .setTitle(`📢 | Anuncio`)
    .setDescription(`${args.join(' ')}`)
    .setColor(bot.primaryColor)
    .setFooter(`${msg.author.tag}`);

  if (msg.member.hasPermission('ADMINISTRATOR')) {
    await msg.delete({ timeout: 1000 });
    if (!args || args.length === 0) {
      msg.reply('por favor escribe lo que desees sugerir despues del comando');
    }
    //we say to the user that his message was suscefully sended
    msg.channel.send(sEmbed);
  } else {
    msg.reply('no tienes permisos o algo salio mal');
  }
};
