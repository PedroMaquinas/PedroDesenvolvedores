const Discord = require("discord.js");
const config = require("../config.json");

exports.run = (client, message, args) => {
  var prefix = config.prefix;

  const embed = new Discord.RichEmbed()
    .setAuthor("Comandos", client.user.displayAvatarURL)
    .setColor(message.member.displayHexColor)
    .setDescription(
      `\`${prefix}aviso\` ─ Envie um aviso para todos no seu servidor.` +
        "\n\n" +
        `\`${prefix}convite\` ─ O meu convite!` +
        "\n\n" +
        `\`${prefix}cc\` ─ Cria um convite permanente do servidor!`
    )
    .setFooter(message.author.tag, message.author.displayAvatarURL)
    .setThumbnail(client.user.displayAvatarURL)
    .setTimestamp();

  message.reply(embed);
};
