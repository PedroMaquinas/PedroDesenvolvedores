const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {
    let clientping = new Date() - message.createdAt;

    message.channel.send(`${message.author}`)
    let pEmbed = new Discord.RichEmbed()
        .setTitle("<a:z_PING:783520919884529725> | Ping dessa merdakk", message.author.displayAvatarURL)
        .addField("<:bottag:783521125808078889> | BOT: ", Math.floor(clientping) + "ms")
        .addField("<a:w_computadorBR:783521203516080169> | API: ", Math.floor(client.ping) + "ms")
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL)
        .setColor("#ff0101")

        message.channel.send(pEmbed)
}

module.exports.help = {
    name: "ping"
}