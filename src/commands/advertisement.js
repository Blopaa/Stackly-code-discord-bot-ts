const { MessageEmbed } = require("discord.js");

const advertisments = async (msg, args, server) => {
  const {bot} = server
  const sEmbed = new MessageEmbed()
    .setTimestamp()
    .setTitle(`📢 | Anuncio`)
    .setDescription(`${args.join(" ")}`)
    .setColor(bot.color.primary)
    .setFooter(`${msg.author.tag}`)

  if (msg.member.hasPermission("ADMINISTRATOR")) {
    await msg.delete({timeout: 1000})
    if (!args || args.length === 0) {
      msg.reply("por favor escribe lo que desees sugerir despues del comando");
    }
    //we say to the user that his message was suscefully sended
    msg.channel.send(sEmbed);
  } else {
    msg.reply("no tienes permisos o algo salio mal");
  }
};

exports.advertisments = advertisments;
