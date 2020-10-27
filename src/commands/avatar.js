const {MessageEmbed} = require('discord.js');


const AvatarCommand = async (message, server) => {
  const {bot} = server
  await message.channel.send(
    // prettier-ignore
    new MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
      .setTitle("Avatar")
      .setDescription(`${message.author} Este es tu avatar!!!`)
      .setColor(`${bot.color.primary}`)
      .setImage(`${message.author.avatarURL()}`)
  );
}

exports.AvatarCommand = AvatarCommand
