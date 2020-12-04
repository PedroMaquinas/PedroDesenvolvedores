exports.run = (client, message, args) => {
  let mensagem = args.join(' ');

  if (!message.member.hasPermission('ADMINISTRATOR')) {
    return message.channel.send(`😢 **|** ${message.author} ─ Você não tem permissão para usar este comando.`);
  }

  message.reply({
    embed: {
      color: 0,
      author: {
        name: message.author.username,
        icon_url: message.author.displayAvatarURL
      },
      fields: [
        {
          name: 'Mensagem a ser enviada:',
          value: `\`\`\`${mensagem}\`\`\``
        }
      ]
    }
  })
  let contar = message.guild.memberCount;

  message.guild.fetchMembers().then(guild => {
    guild.members.forEach(member => {
      return member.send(mensagem).catch(function(e) {
        console.log(`(${member.user.username}) O usuário desativou mensagens privadas.`);
      });
    });
  });

  message.channel.send(`Mensagem enviada para \`${contar}\` membros.`)
  }
