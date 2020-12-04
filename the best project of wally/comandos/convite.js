const Discord = require("discord.js")
const client = new Discord.Client();

exports.run = (client,message,args) => {
    let embed = new Discord.RichEmbed()

    .setTitle("Meu Convite para adcionar no seu Servidor!")
    .setColor("#ff47ec")
    .setDescription(`**Clique [aqui](https://discord.com/api/oauth2/authorize?client_id=772790415170207765&permissions=0&scope=bot Para adcionar a Kotaya em Seu Servidor.**`)
    .setFooter(`${client.user.username}`, client.user.avatarURL)
    .setTimestamp()

    message.channel.send(embed);
}

exports.help = {
    name: "convite"
}