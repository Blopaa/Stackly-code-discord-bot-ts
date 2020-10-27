const User = require("../../database/models/Users");

const CoinsCommand = async (msg) => {
  let userData = await User.findOne({ IDuser: msg.author.id });
  if (userData) {
    const { user } = userData;
    const coins = parseInt(user.coins);
    if (userData && user) {
      msg.reply(`tienes ${coins} monedas`);
    }
  } else {
    return;
  }
};

exports.CoinsCommand = CoinsCommand;
