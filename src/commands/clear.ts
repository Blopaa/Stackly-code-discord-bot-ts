import { Message, TextChannel } from "discord.js";

export const clearCommand = async (msg: Message, msgRemoved: string[]) => {
  if (!msgRemoved) {
    msg.reply("por favor selecciona el numero de mensajes que desees borrar");
    return;
  }
  let msgToRemove: number = parseInt(msgRemoved.shift() || '');
  msgToRemove = msgToRemove + 1;
  if (msg.member?.hasPermission("ADMINISTRATOR")) {
    const Rmsg = await msg.channel.messages.fetch({ limit: msgToRemove });
    (msg.channel as TextChannel).bulkDelete(Rmsg);
  } else {
    msg.reply("no tienes suficientes permisos o algo salio mal");
  }
};
