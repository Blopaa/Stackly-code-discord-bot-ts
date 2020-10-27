import { Message } from "discord.js";
import { IServer } from "../../database/models/Servers";

const { MessageEmbed } = require("discord.js");


export const kickCommand = async (msg: Message, server: IServer) => {
    if(!msg || !msg.member) return;
    const {name} = server
    const userModed = msg.mentions.members?.first();
    if(!userModed) return
    const kEmbed = new MessageEmbed()
    .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL()}`)
    .setTitle("Kick")
    .setDescription(`¡ ${msg.author} ${userModed} ha sido echado de ${name}`)
    console.log(msg.member.hasPermission('KICK_MEMBERS'))

    if(msg.member.hasPermission('KICK_MEMBERS')){
        if (!userModed) {
            msg.reply("procura mencionar a la persona que deseas echar");
          }
        userModed.kick()
            .then(() => {
                msg.channel.send(
                    kEmbed
                )
            }).catch((err: Error) => {
                msg.reply(`No se pudo expulsar a el usuario ${userModed}`);
                // Log the error
                console.error(err);
              });
    }else{
        msg.reply(
            "no tienes permisos suficientes o el usuario al que intentas expulsar no existe"
          );
    }
}