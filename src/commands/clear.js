const clearCommand = async (msg, msgRemoved) => {
  if (!msgRemoved) {
    msg.reply("por favor selecciona el numero de mensajes que desees borrar");
  } else {
    let msgToRemove = parseInt(msgRemoved.shift());
    msgToRemove = parseInt(msgToRemove + 1);
    if (msg.member.hasPermission("ADMINISTRATOR")) {
      const Rmsg = await msg.channel.messages.fetch({ limit: msgToRemove });
      msg.channel.bulkDelete(Rmsg);
    } else {
      msg.reply("no tienes suficientes permisos o algo salio mal");
    }
  }
};

exports.clearCommand = clearCommand;
