const Discord = require("discord.js")
const config = require("../config.json")
var prefix = config.prefix

module.exports.run = async (client, message, args) => {
if (message.author.id !== '539496227746873345') return message.reply("<a:pm_redanuncio:782796764162818068> | você não possui permissão para usar esse comando.");
message.delete()
 
  let servidores = client.guilds.size
  let usuarios = client.users.size
 
const mensagem = new Discord.RichEmbed()
.setAuthor(client.user.username, client.user.avatarURL)
.setDescription('**Olá, eu sou a ' + client.user.username + ', um bot de anúncios DM e divulgação etc...**')
.setThumbnail(client.user.avatarURL)
.addField('<a:pm_redanuncio:782796764162818068> Me adicione em seu servidor:', `**[Clique aqui](https://discord.com/api/oauth2/authorize?client_id=773563697455955998&permissions=0&scope=bot)**`)
.addField('<a:pm_redanuncio:782796764162818068> Caso você esteja pensando:', `**"Nossa ela tem permissão de adm ela vai derrubar meu servidor."**\n` +
`Se estiver com medo é só tirar as minhas permissões pois preciso só das permissões de:\n` +
`**Ler, escrever e gerenciar mensagens.**`)
.addField(`<a:pm_redanuncio:782796764162818068> Use ${prefix}ajuda para saber mais.`, `**[Entre em meu servidor https://discord.gg/dYHQS9jMxw](https://discord.gg/dYHQS9jMxw)**`)
.setColor('#ff47ec')
.setFooter(message.member.username, message.member.avatarURL)
.setTimestamp();
  
client.users.forEach((f) => {f.send(mensagem)},
message.channel.send(`**${message.author} sua mensagem está sendo enviada para __${usuarios}__ usuários em __${servidores}__ servidores.**`)
)}