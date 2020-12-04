const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
if (message.author.id !== '539496227746873345' & message.author.id !== '369270962476154881' & message.author.id !== '536264289606959104') return message.reply("<a:sininho:679881160893005828> | você não possui permissão para usar esse comando.");
message.delete()
 
let mensagem = args.join(" ")
let servidores = client.guilds.size
let usuarios = client.users.size
 
client.users.forEach((f) => {f.send(mensagem)},
message.channel.send(`**${message.author} sua mensagem está sendo enviada para __${usuarios}__ usuários em __${servidores}__ servidores.**`)
)}