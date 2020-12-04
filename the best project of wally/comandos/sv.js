exports.run = async (client, message, args) => {
  const Discord = require("discord.js");
  if (message.author.id !== '539496227746873345') return message.channel.send(`** ${message.author} Apenas meu criador tem acesso a este comando**`)
  let string = '';
    let string2= ''; //Ooops
    client.guilds.forEach(guild => {
    string += 'Nome`' + guild.name + '`\nID **»** ' + guild.id + '\n\n'

    })
  
  
    let botembed = new Discord.RichEmbed()
        .setColor(process.env.COLOR)
        .addField( `${string}`)
  
    message.author.send(botembed);
    message.channel.send(`** ${message.author} Meus servidores foram enviados na sua dm!**`)
}