const discord = require('discord.js');
exports.run = async (Stancy, message, args, con) => {
message.delete()
    if(!message.member.hasPermission("BAN_MEMBERS", false, true, true)) {
        return message.reply("**<:mdWarn:781231650545336330> | Desculpe, você não tem permissão de desbanir usuários neste servidor!** ").catch(()=>{}).then(msg => msg.delete(8000));
    }
    if (!message.guild.me.hasPermission("BAN_MEMBERS", false, true)) {
        return message.reply("**<:mdWarn:781231650545336330> | Eu não tenho permissão para desbanir usuários nesse servidor.** ").catch(()=>{}).then(msg => msg.delete(8000));
    }
    let bannedUsers = await message.guild.fetchBans().catch(()=>{});
    let size = bannedUsers.size;
    message.channel.send(`**Começando a desbanir**  (0/${size})`)
        .then(async m => {
            let i = 0;
            for (var user of bannedUsers.values()) {
                await m.guild.unban(user)
                    .then(() => {
                        ++i;
                        if (i % 10 === 0) {
                            m.edit(`${i}/${size}`).catch(()=>{});
                        }
                    })
                    .catch(()=>{});
            }
            m.edit("> **<a:e_pulapula:780976926353260564> | Todos usuários desbanidos com sucesso **").catch(()=>{}).then(msg => msg.delete(8000));
        })
        .catch(()=>{});
    };
    module.exports.help = {
        name: 'unbanall',
        aliases: [false]
    };