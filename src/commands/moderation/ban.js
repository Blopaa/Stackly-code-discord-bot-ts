const { MessageEmbed } = require("discord.js");


const banCommand = async (msg, server) => {
  const {name} = server
  const userModed = msg.mentions.members?.first();
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
        console.log(`${msg.author.tag} ${userModed.tag}  ha sido baneado de ${name}`);
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

exports.banCommand = banCommand;
