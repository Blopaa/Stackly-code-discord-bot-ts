import { Message } from "discord.js";
import User from "../../database/models/Users";

export const CoinsCommand = async (msg: Message) => {
  if(!User) return

  const userData = await User.findOne({ IDuser: msg.author.id });
  if (userData) {
    const { user } = userData;
    if(!user.coins) return
    if (userData && user) {
      msg.reply(`tienes ${user.coins} monedas`);
    }
  } else {
    return;
  }
};
