import { CollectorFilter, Message, MessageReaction, ReactionCollector, ReactionEmoji, User } from "discord.js";
import { IServer } from "../../database/models/Servers";

export const supportCommand = async (msg: Message, server: IServer) => {
  
  if(!msg || !msg.guild) return 
  const {categories, roles}: IServer = server
  
  if(!categories || !roles) return
  
  let Smsg = await msg.channel.send("reacciona para crear un canal de soporte");
  await Smsg.react("✉️");
  
  let collector = Smsg.createReactionCollector((reaction, user) => {
    return user.id !== msg.client.user?.id && user.id == msg.author.id;
  });

  collector.on("collect", async (reaction: MessageReaction) => {
    Smsg.delete();

    let reason;

    if (reaction.emoji.name === "✉️") {
      reason = "soporte";
    }
    
    msg.channel
    .send(`Se ha creado un canal de soporte para ti para ${reason}`)
    .then(async (m) => {
        await m.delete({ timeout: 10000 });
      });

      const RandomNum = Math.floor(Math.random() * (9999 - 1));
      const Schannel = `Soporte ${RandomNum}`;
      
      msg.guild?.channels
      .create(Schannel, {
        type: "text"
      })
      .then(async (channel) => {
        await channel.setParent(categories.SOPORTE);
        
        await channel.overwritePermissions([
          {
            id: roles.admin,
            allow: [
              "SEND_MESSAGES",
              "VIEW_CHANNEL",
              "READ_MESSAGE_HISTORY",
              "ADD_REACTIONS",
            ],
          },
          {
            id: roles.everyone,
            deny: [
              "SEND_MESSAGES",
              "VIEW_CHANNEL",
              "READ_MESSAGE_HISTORY",
              "ADD_REACTIONS",
            ],
          },
          {
            id: msg.author.id,
            allow: [
              "SEND_MESSAGES",
              "VIEW_CHANNEL",
              "READ_MESSAGE_HISTORY",
              "ADD_REACTIONS",
            ],
          },
        ]);

        const m  = await channel.send(`el usuario <@${msg.author}> ha creado este canal`)
        
        await m.react("📢")
        await m.awaitReactions((reaction: MessageReaction): any => {
                    if (reaction.emoji.name === "📢") {
                        reaction.message.channel
                          .send(
                              " ¿Seguro que desees que quieres borrar este canal de soporte?"
                            )
              
                      .then(async (m: Message) => {
                        m.react("✅");
                        m.react("❌");
                        await m.awaitReactions((reaction: MessageReaction, user: User): any => {
                          if (user.bot) return false;
                          if (reaction.emoji.name === "✅") {
                              reaction.message.channel.send(
                              "El canal actual sera borrado en 10 segundos"
                            );
                        setTimeout(async () => {
                            await reaction.message.channel.delete();
                          }, 10000);
                        } else if (reaction.emoji.name === "❌") {
                            reaction.message.channel
                              .send("El canal no se borrara")
                              .then(async (m) => {
                            await m.delete({ timeout: 10000 });
                          });
                      }
                    });
                  });
              }
            });
            });
        });
        await msg.delete({ timeout: 10000 });
    }


