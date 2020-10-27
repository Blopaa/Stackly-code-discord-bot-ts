const { MessageEmbed } = require("discord.js");

const suggestions = async (msg, args, server) => {
  const  {bot, channels} = server
  let sChannel = msg.guild.channels.cache.find(
    (x) => x.id === channels.sugerencias
  ); //where will go the suggestion
  console.log(args.length)
  if (!args || args.length === 0) {
    msg.reply(`ey, usa ${bot.prefix}suggestion <sugerencia>`);
  } else if (!sChannel) {
    msg.reply("Hey, no puede encontrar el canal Sugerencias!");
  } else{
    //we say to the user that his message was suscefully sended
    msg.channel.send(`Su sugerencia fue enviada a <#${channels.sugerencias}>`);
    await msg.delete({ timeout: 1000 }) //we remove the command message

    const sEmbed = new MessageEmbed()
      .setTimestamp()
      .setTitle(`🎟️ | Sugerencia`)
      .setDescription(`${args.join(" ")}`)
      .setColor(bot.color.primary)
      .setFooter(` ${msg.author.tag}`)
    sChannel.send(sEmbed).then((message) => {
      message.react("👍");
      message.react("👎");
    });
  }
};

exports.suggestions = suggestions;
