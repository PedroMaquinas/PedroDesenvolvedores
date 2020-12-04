
const Discord = require('discord.js')

exports.run = async (bot, message, args, db) => {
  
  let inExecutation = new Set();
  let ref = db.ref("Servidores/" + message.guild.id + "/Sistemas/Contador")
  let embedConfig = new Discord.RichEmbed()
                    .setAuthor("Configurações do Contador", "https://cdn.discordapp.com/emojis/700768595290095668.png?v=1")
                    .setDescription(`**Servidor:** \`${message.guild.name}\` `)
                    .setThumbnail(message.guild.iconURL)
                    .setFooter(message.author.tag, message.author.displayAvatarURL)
                    .setColor('#9bffff')
  
  
  ref.once("value").then(async function(snap){
    if(!snap.val()){
      embedConfig.addField("Opções", "<a:1_:754665687527456809> | Ativar ou desativar o contador\n> <a:off1:681865530918830191>  Desativado\n" +
                                     "<a:2_:707347477191458877> | Texto do contador\n> Não definido\n" +
                                     "<a:3_:707347478953066636> | Estilo do contador\n>      <a:0_:754666164579467334> <a:1_:754665687527456809> <a:2_:707347477191458877>\n" +
                                     "<a:4_:707347477497643079> | Canal do contador\n> Não definido");
      ref.set({
        modulo: "<a:off1:681865530918830191>  Desativado",
        texto: "Não definido",
        estilo: "<a:0_:754666164579467334> <a:1_:754665687527456809> <a:2_:707347477191458877>",
        canal: "Não definido"
      });
    } else {
      embedConfig.addField("**Opções:**", `<a:1_:754665687527456809> | Ativar ou desativar o contador\n> ${snap.val().modulo}\n` +
                                          `<a:2_:707347477191458877> | Texto do contador\n> ${snap.val().texto}\n` +
                                          `<a:3_:707347478953066636> | Estilo do contador\n>      ${snap.val().estilo}\n` +
                                          `<a:4_:707347477497643079> | Canal do contador\n> ${snap.val().canal}`);
    };
    
    Continuar();
    
  });
  
  
  async function Continuar(){
    
    let msg = await message.channel.send(embedConfig);
    
    await msg.react("1_:754665687527456809");
    await msg.react("2_:707347477191458877");
    await msg.react("3_:707347478953066636");
    await msg.react("4_:707347477497643079");
    
    let collection = msg.createReactionCollector((r, u) => (r.emoji.id === "754665687527456809", "707347477191458877", "707347478953066636", "707347477497643079") && (u.id !== bot.user.id && u.id === message.author.id));
    collection.on("collect", async r => {
      switch (r.emoji.id){
        case '707347473731158058':
          r.remove(message.author);
          if(inExecutation.has(message.author.id)) return message.reply("**Você ja tem uma configuração aberta**").then(m => m.delete(7000));
          let status = "<a:on1:681865530780680257>  Ativado";
          ref.once("value").then(async function(snap){
            if(snap.val().modulo === "<a:on1:681865530780680257>  Ativado"){
              if(snap.val().canal !== "Não definido") await bot.channels.get(snap.val().canal.replace("<#", "").replace(">", "")).setTopic(" ");
              status = "<a:off1:681865530918830191>  Desativado";
            };       
            await ref.set({
              modulo: status,
              texto: snap.val().texto,
              estilo: snap.val().estilo,
              canal: snap.val().canal
            });
            AtualizarMsg(msg);
          });
        break;
        case '707347477191458877':
          r.remove(message.author);
          if(inExecutation.has(message.author.id)) return message.reply("**Você ja tem uma configuração aberta**").then(m => m.delete(7000));
          let mesg = await message.channel.send(new Discord.RichEmbed()
                                                .setDescription("<:texto:700765393635246081> Qual texto que você quer por no contador?\n> Variaveis: `{contador}` e `{servidor}`")
                                                .setColor('#9bffff'));
          inExecutation.add(message.author.id);
          mesg.react("limpar:708048450478145727");
          let collectionTxtM = message.channel.createMessageCollector(m => (m.author.id !== bot.user.id && m.author.id === message.author.id), { time: 60000 });
          let collectionTxtR = mesg.createReactionCollector((r, u) => (r.emoji.id === "708048450478145727") && (u.id !== bot.user.id && u.id === message.author.id), { time: 60000 });
          collectionTxtR.on("collect", async r => {
            ref.once("value").then(async function(snap){
              await ref.set({
                modulo: snap.val().modulo,
                texto: "Não definido",
                estilo: snap.val().estilo,
                canal: snap.val().canal
              });
              mesg.delete(200)
              collectionTxtR.stop();
              collectionTxtM.stop();
              AtualizarMsg(msg);
            });
          });
          collectionTxtM.on("collect", async m => {
            mesg.delete(200);
            m.delete(200);
            if(!m.content){
              message.reply("**Texto invalido**");
              return AtualizarMsg(msg);
            };
            ref.once("value").then(async function(snap){
              await ref.set({
                modulo: snap.val().modulo,
                texto: m.content,
                estilo: snap.val().estilo,
                canal: snap.val().canal
              });
              AtualizarMsg(msg);
              collectionTxtR.stop();
              collectionTxtM.stop();
            });
          })
          collectionTxtM.on("end", async cabou => {
            if(cabou.map(c => c.content)[0]) return;
            mesg.delete(200).catch(erro => {});
            message.reply("**O tempo acabou!**");
            AtualizarMsg(msg);
          });
        break;
        case '707347478953066636':
          r.remove(message.author);
          if(inExecutation.has(message.author.id)) return message.reply("**Você ja tem uma configuração aberta**").then(m => m.delete(7000));
          Estilos(msg);
        break;
        case '707347477497643079':
          r.remove(message.author);
          if(inExecutation.has(message.author.id)) return message.reply("**Você ja tem uma configuração aberta**").then(m => m.delete(7000));
          let messg = await message.channel.send(new Discord.RichEmbed()
                                                .setDescription("<:texto:700765393635246081> Qual canal você deseja colocar o contador?")
                                                .setColor('#9bffff'));
          inExecutation.add(message.author.id);
          messg.react("limpar:708048450478145727");
          let collectionCnlM = message.channel.createMessageCollector(m => (m.author.id !== bot.user.id && m.author.id === message.author.id) && (m.mentions.channels.first() || m.guild.channels.get(m.content)), { time: 60000 });
          let collectionCnlR = messg.createReactionCollector((r, u) => (r.emoji.id === "708048450478145727") && (u.id !== bot.user.id && u.id === message.author.id), { time: 60000 });
          collectionCnlR.on("collect", async r => {
            ref.once("value").then(async function(snap){
              await bot.channels.get(snap.val().canal.replace("<#", "").replace(">", "")).setTopic(" ");
              await ref.set({
                modulo: snap.val().modulo,
                texto: snap.val().texto,
                estilo: snap.val().estilo,
                canal: "Não definido"
              });
              messg.delete(200)
              collectionCnlR.stop();
              collectionCnlM.stop();
              AtualizarMsg(msg);
            });
          });
          collectionCnlM.on("collect", async m => {
            messg.delete(200);
            m.delete(200);
            let canal;
            if(m.mentions.channels.first()){
              canal = m.mentions.channels.first().id
            } else {
              canal = message.guild.channels.get(m.content).id
            }
            if(!canal){
              message.reply("**Canal invalido**");
              return AtualizarMsg(msg);
            };
            ref.once("value").then(async function(snap){
              if(snap.val() && snap.val().canal !== "Não definido" && canal !== snap.val().canal.replace("<#", "").replace(">", "")) await bot.channels.get(snap.val().canal.replace("<#", "").replace(">", "")).setTopic(" ")
              await ref.set({
                modulo: snap.val().modulo,
                texto: snap.val().texto,
                estilo: snap.val().estilo,
                canal: `<#${canal}>`
              });
              AtualizarMsg(msg);
              collectionCnlR.stop();
              collectionCnlM.stop();
            });
          })
          collectionCnlM.on("end", async cabou => {
            if(cabou.map(m => m.mentions.channels.first())[0] || cabou.map(m => m.content)[0]) return;
            messg.delete(200).catch(erro => {});
            message.reply("**O tempo acabou!**");
            AtualizarMsg(msg);
          });
        break;
      };
    });
    
  };
  
  
  async function Estilos(msg){
    let mesg = await  message.channel.send(new Discord.RichEmbed()
                                           .addField("<:texto:700765393635246081> **Estilos do contador:**", "<a:0B:708098751515983904> <a:1B:708098609421221969>\n" +
                                                                                                             "<a:0C:708099815317438545> <a:2C:708099371660738642>\n" +
                                                                                                             "<a:0A:708098249453469706> <a:3A:708098494229118987>", true)
                                           .addField("** **", "<a:0D:708099999795380264> <a:4D:708100323134275584>\n" +
                                                              "<a:0E:708100919132160030> <a:5E:708100596963737701>\n" +
                                                              "<a:0_:708020148455342150> <a:6_:707347477388591174>", true)
                                           .setColor('#9bffff'));
    
    await mesg.react("1B:708098609421221969");
    await mesg.react("2C:708099371660738642");
    await mesg.react("3A:708098494229118987");
    await mesg.react("4D:708100323134275584");
    await mesg.react("5E:708100596963737701");
    await mesg.react("6_:707347477388591174");
    
    let collection = mesg.createReactionCollector((r, u) => (r.emoji.id === "708098609421221969", "708099371660738642", "708098494229118987", "708100323134275584", "708100596963737701", "707347477388591174") && (u.id !== bot.user.id && u.id === message.author.id));
    collection.on("collect", async r => {
      switch (r.emoji.id){
        case "708098609421221969":
          ref.once("value").then(async function(snap){
            ref.set({
              modulo: snap.val().modulo,
              texto: snap.val().texto,
              estilo: "<a:0B:708098751515983904> <a:1B:708098609421221969> <a:2B:708099528074461285>",
              canal: snap.val().canal,
            });
            mesg.delete(200)
            AtualizarMsg(msg);
          }); 
        break;
        case "708099371660738642":
          ref.once("value").then(async function(snap){
            ref.set({
              modulo: snap.val().modulo,
              texto: snap.val().texto,
              estilo: "<a:0C:708099815317438545> <a:1C:708099273903833179> <a:2C:708099371660738642>",
              canal: snap.val().canal,
            });
            mesg.delete(200)
            AtualizarMsg(msg);
          }); 
        break;
        case "708098494229118987":
          ref.once("value").then(async function(snap){
            ref.set({
              modulo: snap.val().modulo,
              texto: snap.val().texto,
              estilo: "<a:0A:708098249453469706> <a:1A:708098400205406259> <a:2A:708098312988786688>",
              canal: snap.val().canal,
            });
            mesg.delete(200)
            AtualizarMsg(msg);
          }); 
        break;
        case "708100323134275584":
          ref.once("value").then(async function(snap){
            ref.set({
              modulo: snap.val().modulo,
              texto: snap.val().texto,
              estilo: "<a:0D:708099999795380264> <a:1D:708100142041137174> <a:2D:708100192355745932>",
              canal: snap.val().canal,
            });
            mesg.delete(200)
            AtualizarMsg(msg);
          }); 
        break;
        case "708100596963737701":
          ref.once("value").then(async function(snap){
            ref.set({
              modulo: snap.val().modulo,
              texto: snap.val().texto,
              estilo: "<a:0E:708100919132160030> <a:1E:708100139289411626> <a:2E:708100172013633646>",
              canal: snap.val().canal,
            });
            mesg.delete(200)
            AtualizarMsg(msg);
          }); 
        break;
        case "707347477388591174":
          ref.once("value").then(async function(snap){
            ref.set({
              modulo: snap.val().modulo,
              texto: snap.val().texto,
              estilo: "<a:0_:708020148455342150> <a:1_:707347473731158058> <a:2_:707347477191458877>",
              canal: snap.val().canal,
            });
            mesg.delete(200)
            AtualizarMsg(msg);
          }); 
        break;
      };
    });
  };
  
  
  async function AtualizarMsg(msg){
     if(inExecutation.has(message.author.id)) inExecutation.delete(message.author.id);
     let embedConfig2 = new Discord.RichEmbed()
                        .setAuthor("Configurações do Contador", "https://cdn.discordapp.com/emojis/700768595290095668.png?v=1")
                        .setDescription(`**Servidor:** \`${message.guild.name}\` `)
                        .setThumbnail(message.guild.iconURL)
                        .setFooter(message.author.tag, message.author.displayAvatarURL)
                        .setColor('#9bffff')
      ref.once("value").then(async function(snap){
        if(!snap.val()){
          embedConfig2.addField("Opções", "<a:1_:707347473731158058> | Ativar ou desativar o contador\n> <a:off1:681865530918830191>  Desativado\n" +
                                          "<a:2_:707347477191458877> | Texto do contador\n> Não definido\n" +
                                          "<a:3_:707347478953066636> | Estilo do contador\n>      <a:0_:708020148455342150> <a:1_:707347473731158058> <a:2_:707347477191458877>\n" +
                                          "<a:4_:707347477497643079> | Canal do contador\n> Não definido");
          ref.set({
            modulo: "<a:off1:681865530918830191>  Desativado",
            texto: "Não definido",
            estilo: "<a:0_:708020148455342150> <a:1_:707347473731158058> <a:2_:707347477191458877>",
            canal: "Não definido"
          });
        } else {
          embedConfig2.addField("**Opções:**", `<a:1_:707347473731158058> | Ativar ou desativar o contador\n> ${snap.val().modulo}\n` +
                                               `<a:2_:707347477191458877> | Texto do contador\n> ${snap.val().texto}\n` +
                                               `<a:3_:707347478953066636> | Estilo do contador\n>      ${snap.val().estilo}\n` +
                                               `<a:4_:707347477497643079> | Canal do contador\n> ${snap.val().canal}`);
        };
        msg.edit(embedConfig2)
        
        if(snap.val() && snap.val().modulo && snap.val().modulo === "<a:on1:681865530780680257>  Ativado" && snap.val().texto !== "Não definido" && snap.val().canal !== "Não definido"){
          let estilo = bot.emojis.find(emoji => `<a:${emoji.name}:${emoji.id}>` === snap.val().estilo.split(" ")[0]).name.replace("0", "")
          bot.channels.get(snap.val().canal.replace("<#", "").replace(">", "")).setTopic(snap.val().texto.replace("{contador}", NumeroParaEmoji(message.guild.memberCount)).replace("{servidor}", message.guild.name)).catch(O_o => {});
          function NumeroParaEmoji(_membros) {
            _membros = _membros.toString();
            var contador;
            if(estilo === "_"){
              var contador = ``, membros = { 1: "<a:1_:707347473731158058>", 2: "<a:2_:707347477191458877>", 3: "<a:3_:707347478953066636>", 4: "<a:4_:707347477497643079>", 5: "<a:5_:707347477203779626>", 6: "<a:6_:707347477388591174>", 7: "<a:7_:708019059131809833>", 8: "<a:8_:708018978311897229>", 9: "<a:9_:708019250773753956>", 0: "<a:0_:708020148455342150>" };
            } else if(estilo === "C"){
              var contador = ``, membros = { 1: "<a:1C:708099273903833179>", 2: "<a:2C:708099371660738642>", 3: "<a:3C:708099451163770920>", 4: "<a:4C:708099514833174576>", 5: "<a:5C:708099570441388032>", 6: "<a:6C:708099618835005461>", 7: "<a:7C:708099668323729410>", 8: "<a:8C:708099723961041066>", 9: "<a:9C:708099771218395257>", 0: "<a:0C:708099815317438545>" };
            } else if(estilo === "B"){
              var contador = ``, membros = { 1: "<a:1B:708098609421221969>", 2: "<a:2B:708099528074461285>", 3: "<a:3B:708099466301014018>", 4: "<a:4B:708099588879548496>", 5: "<a:5B:708098822198525972>", 6: "<a:6B:708098913411792916>", 7: "<a:7B:708099277062144000>", 8: "<a:8B:708099338575806556>", 9: "<a:9B:708099401775710249>", 0: "<a:0B:708098751515983904>" };
            } else if(estilo === "E"){
              var contador = ``, membros = { 1: "<a:1E:708100139289411626>", 2: "<a:2E:708100172013633646>", 3: "<a:3E:708100321834041435>", 4: "<a:4E:708100551639957504>", 5: "<a:5E:708100596963737701>", 6: "<a:6E:708100752564027433>", 7: "<a:7E:708100794427375658>", 8: "<a:8E:708100829613130070>", 9: "<a:9E:708105536859799584>", 0: "<a:0E:708100919132160030>" };
            } else if(estilo === "D"){
              var contador = ``, membros = { 1: "<a:1D:708100142041137174>", 2: "<a:2D:708100192355745932>", 3: "<a:3D:708100241567514715>", 4: "<a:4D:708100323134275584>", 5: "<a:5D:708100333569572944>", 6: "<a:6D:708100511097683968>", 7: "<a:7D:708100560104062986>", 8: "<a:8D:708100605939286017>", 9: "<a:9D:708100652152127579>", 0: "<a:0D:708099999795380264>" };
            } else if(estilo === "A"){
              var contador = ``, membros = { 1: "<a:1A:708098400205406259>", 2: "<a:2A:708098312988786688>", 3: "<a:3A:708098494229118987>", 4: "<a:4A:708098615503093811>", 5: "<a:5A:708098685438918686>", 6: "<a:6A:708098737750278194>", 7: "<a:7A:708098814564630539>", 8: "<a:8A:708098877995352085>", 9: "<a:9A:708098929455136850>", 0: "<a:0A:708098249453469706>" };
            }            
            for(let i = 0; i < _membros.length; i++) contador +=  membros[parseInt(_membros[i])];
            return contador;
          };
        };
        
      });
  };
  
};//