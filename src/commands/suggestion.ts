import { Message, MessageEmbed, TextChannel } from "discord.js";
import { IServer } from "../database/models/Servers";



export const suggestions = async (
  msg: Message,
  args: string[],
  server: IServer
) => {
  const { bot, channels } = server;
  if (!channels?.sugerencias || !bot?.prefix || !bot?.color) return;
  if (!msg.guild) return;

  let sChannel = msg.guild.channels.cache.find(
    (x) => x.id === channels.sugerencias
  ); //where will go the suggestion
  console.log(args.length);

  if (!args || args.length === 0) {
    msg.reply(`ey, usa ${bot.prefix}suggestion <sugerencia>`);
  } else if (!sChannel) {
    msg.reply("Hey, no puede encontrar el canal Sugerencias!");
  } else {
    //we say to the user that his message was suscefully sended

    msg.channel.send(`Su sugerencia fue enviada a <#${channels.sugerencias}>`);
    await msg
      .delete({ timeout: 1000 });//we remove the command message
      
      (sChannel as TextChannel)
      .send(
        new MessageEmbed()
          .setTimestamp()
          .setTitle(`🎟️ | Sugerencia`)
          .setDescription(`${args.join(" ")}`)
          .setColor(bot.color.primary)
          .setFooter(` ${msg.author.tag}`)
      )
      .then((message: Message) => {
        message.react("👍");
        message.react("👎");
      });
  }
};
