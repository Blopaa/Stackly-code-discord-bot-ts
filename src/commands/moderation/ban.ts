import {Message, MessageEmbed} from 'discord.js'
import { IServer } from '../../database/models/Servers';

export const banCommand = async (msg: Message, server: IServer) => {
  if(!msg || !msg.member) return;
  const {name} = server
  const userModed = msg.mentions.members?.first();
  if(!userModed) return;
  const kEmbed = new MessageEmbed()
    .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL()}`)
    .setTitle("ban")
    .setDescription(
      `${msg.author} ${userModed} ha sido baneado de ${name}`
    );
  console.log(msg.member.hasPermission("BAN_MEMBERS"));

  if (msg.member.hasPermission("BAN_MEMBERS")) {
    if (!userModed) {
      msg.reply("Hey, debes mencionar al usuario que quieres banear!");
    }
    userModed
      .ban()
      .then(() => {
        msg.channel.send(kEmbed);
      })
      .catch((err) => {
        msg.reply(`No se pudo banear a el usuario ${userModed}`);
        // Log the error
        console.error(err);
      });
  } else {
    msg.reply(
      "Hey, no tienes permisos suficientes o el usuario al que intentas banear no existe!"
    );
  }
};
