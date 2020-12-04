const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
if (message.author.id !== '539496227746873345' & message.author.id !== '369270962476154881' & message.author.id !== '536264289606959104') return message.reply(":7775: | você não possui permissão para usar esse comando.");
message.delete();
 
let on = client.users.filter(m => m.presence.status === 'online')
let npertube = client.users.filter(m => m.presence.status === 'dnd')
let ausente = client.users.filter(m => m.presence.status === 'idle')
let todos = client.users.filter(m => m.presence.status === 'idle' || m.presence.status === 'dnd' || m.presence.status === 'online')
let off = client.users.filter(m => m.presence.status === 'offline')

let servidores = client.guilds.size
let usuarios = client.users.size

let mensagem = args.join(" ")
  let diguinho = client.users.send
      
message.channel.send(`**<:mdWarn:781231650545336330> A mensagem está sendo enviada para:**\n\n` +
`**:green_circle: ${on.size}** **onlines**\n` +
`**:red_circle: ${npertube.size}** **ocupados**\n` +
`**:yellow_circle: ${ausente.size}** **ausentes**\n\n` +
`**:link: Total de usuários:** **${todos.size}**\n\n` +
`__**:black_circle: ${off.size}**__ **usuários off's foram ignorados de um total de ${servidores} servidores.**`)
on.forEach((f1) => {f1.send(mensagem)}); 
    
npertube.forEach((f2) => {f2.send(mensagem)});
    
ausente.forEach((f3) => {f3.send(mensagem)});

  diguinho.forEach((f4) => {
        message.channel.send(`**A mensagem foi enviada para:**\n\n` +
`**:green_circle: ${on.size}** **onlines**\n` +
`**:red_circle: ${npertube.size}** **ocupados**\n` +
`**:yellow_circle: ${ausente.size}** **ausentes**\n\n` +
`**:link: Total de usuários:** **${todos.size}**\n\n` +
`__**:black_circle: ${off.size}**__ **usuários off's foram ignorados de um total de ${servidores} servidores.**`)
  });

}