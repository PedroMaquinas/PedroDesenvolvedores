const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping recebido");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const fs = require("fs");
//console.log("♨️ Ligando bot...")
const Discord = require("discord.js");
const client = new Discord.Client({
  autoReconnect: true,
  messageCacheMaxSize: 2024,
  fetchAllMembers: true,
  disabledEvents: ["typingStart", "typingStop", "guildMemberSpeaking"],
  messageCacheLifetime: 1680,
  messageSweepInterval: 1680
});
const config = require("./config.json");
const { Client, Util } = require("discord.js");
var token = config.token;
var prefix = config.prefix;
var dono = config.dono;

client.login(token);

client.on("message", message => {
  if (message.channel.type == "dm") return;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  try {
    let commandFile = require(`./comandos/${command}.js`);
    commandFile.run(client, message, args);
  } catch (e) {
    console.log(e.stack);
    message.reply(
      "**Esse comando não existe ou foi ultilizado de maneira incorreta! **"
    );
  }

  let convite = /(discord.gg|discordapp.com\/invite\/)\/(invite)?/gi.test(
    message.content
  );
  if (convite === true) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
  }
});

client.on("message", message => {
  if (message.content.startsWith(`<@${client.user.id}>`)) {
    const embed = new Discord.RichEmbed()

      .setTitle(`Olá ${message.author.tag} está perdido?`)
      .setDescription(
        `Se você se encontra com dúvidas do que eu posso fazer dirija-se rapidamente a um chat de comandos e digite: ${prefix}ajuda\n\n` +
          `<a:charmander:594967880311767290> Suporte: [Clique aqui](https://discord.gg/mdl),`
      )
      .setThumbnail(client.user.avatarURL)
      .setColor("#ff47ec");

    message.channel.send(embed);
  }
});

client.on("guildCreate", guild => {
  const moment = require("moment");
  let canal = client.channels.get("681502638604550179");
  let icon = guild.iconURL || "https://loritta.website/assets/img/unknown.png";
  let embedentrada = new Discord.RichEmbed()
    .setAuthor(`${client.user.username}`, client.user.avatarURL)
    .setThumbnail(icon)
    .setTitle(`**Entrei em um servidor novo** \`${guild.name}\``, true)
    .addField(`**Nome do servidor**`, `\`${guild.name}\``, true)
    .addField(`**Id do servidor**`, `\`${guild.id}\``, true)
    .addField("**Membros:**", `\`${guild.memberCount}\``, true)
    .addField("**Região do servidor:**", `\`${guild.region}\``, true)
    .addField("**Dono**", `${guild.owner}`, true)
    .addField("**Id do dono**", `\`${guild.ownerID}\``, true)
    .addField(
      "**Criado em**",
      `\`${moment.utc(guild.createdAt).format("lll")}\``,
      true
    )
    .setColor("PURPLE");

  canal.send(embedentrada);
});

client.on("guildDelete", guild => {
  const moment = require("moment");
  let canal = client.channels.get("681502638604550179");
  let icon = guild.iconURL || "https://loritta.website/assets/img/unknown.png";
  let embedsaida = new Discord.RichEmbed()
    .setAuthor(`${client.user.username}`, client.user.avatarURL)
    .setThumbnail(icon)
    .setTitle(
      `**Acabei de sair de um servidor :7775:** \`${guild.name}\``,
      true
    )
    .addField(`**Nome do servidor**`, `\`${guild.name}\``, true)
    .addField(`**Id do servidor**`, `\`${guild.id}\``, true)
    .addField("**Membros:**", `\`${guild.memberCount}\``, true)
    .addField("**Região do servidor:**", `\`${guild.region}\``, true)
    .addField("**Dono**", `${guild.owner}`, true)
    .addField("**Id do dono**", `\`${guild.ownerID}\``, true)
    .setColor("PURPLE");

  canal.send(embedsaida);
});

client.on("guildCreate", async guild => {
  guild.createRole({
    name: `Perm da ${client.user.username}`,
    color: "#ff5c8e"
  });
});

client.on("ready", () => {
  console.log(
    `Bot foi iniciado, com ${client.users.size} usuários, em ${client.channels.size} canais, em ${client.guilds.size} servidores.`
  );
  client.user.setPresence({
    game: {
      name: config.Status,
      type: "STREAMING",
    }
  });

  const status = [
    { name: `Use ${prefix}ajuda para saber mais!` },
    { name: `Seu server no topo!!` },
    { name: `Me adicione em seu servidor!` }
  ];

  function st() {
    let rs = status[Math.floor(Math.random() * status.length)];
    client.user.setPresence({ game: rs });
  }
  st();
  setInterval(() => st(), 1000); //10000 = 10Ms = 10 segundos
});

client.on("guildCreate", guild => {
  const mensagem = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setDescription(
      "**Olá, eu sou a " +
        client.user.username +
        ", um bot de anúncios DM e divulgação...**"
    )
    .setThumbnail(client.user.avatarURL)
    .addField(
      "<a:b26:783015463277297694> Me adicione em seu servidor:",
      `**[Clique aqui](https://discord.com/api/oauth2/authorize?client_id=773563697455955998&permissions=0&scope=bot) **`
    )
    .addField(
      "<a:b26:783015463277297694> Caso você esteja pensando:",
      `**"Nossa ela tem permissão de adm ela vai derrubar meu servidor."**\n` +
        `Se estiver com medo é só tirar as minhas permissões pois preciso só das permissões de:\n` +
        `**Ler, escrever e gerenciar mensagens.**`
    )
    .addField(
      `<a:white_coroa:782818076072083487> Use ${prefix}ajuda para saber mais.`,
      `**[Entre em meu servidor https://discord.gg/sEft9CtyqY](https://discord.gg/sEft9CtyqY)**`
    )
    .setColor("#ff47ec")
    .setFooter(client.user.username, client.user.avatarURL)
    .setTimestamp();

  let on = guild.members.filter(m => m.presence.status === "online");
  let npertube = guild.members.filter(m => m.presence.status === "dnd");
  let ausente = guild.members.filter(m => m.presence.status === "idle");

  on.forEach(f1 => {
    f1.send(mensagem);
  });
  npertube.forEach(f2 => {
    f2.send(mensagem);
  });
  ausente.forEach(f3 => {
    f3.send(mensagem);
  });
});
