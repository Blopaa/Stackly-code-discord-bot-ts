const { MessageEmbed } = require("discord.js");

const warnCommand = async (msg, server) => {
  const {roles} = server
  const user = msg.mentions.users.first();
  const wEmbed = new MessageEmbed()
    .setTitle("Warn")
    .setDescription(`el usuario ${user} ha sido avisado con un warning`);
  if (msg.member.hasPermission("ADMINISTRATOR")) {
    console.log("has perms");
    if (user) {
      const member = msg.guild?.member(user);
      if (member) {
        if (msg.member?.roles.cache.has(roles.warning)) {
          msg.reply(` ${user} ya tiene warning`);
        } else {
          console.log("warning");
          member.roles.add(roles.warning).then(() => {
            msg.channel.send(wEmbed);
          });
        }
      }
    } else {
      msg.reply(`no se puede encontrar al usuario ${user}`);
    }
  } else {
    msg.reply(`no tienes permisos para poder hacer warn a el usuario ${user}`);
  }
};

exports.warnCommand = warnCommand;
