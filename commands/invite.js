const Discord = require('discord.js');
const botconfig = require('./../botconfig.json');
module.exports.run = async (client, bot, message, args) => {   
            message.author.lastMessage.delete()
            var SHembed = new Discord.RichEmbed()
            .setColor(0x04B404)
            .setAuthor(`Invite - ${client.user.tag}`, client.user.avatarURL)
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL)
            .addField(`Über diesen Link kannst du mich zu deinem Server hinzufügen.`,`[https://discordapp.com/oauth2/authorize?client_id=${botconfig.invite}&scope=bot&permissions=355393](https://discordapp.com/oauth2/authorize?client_id=${botconfig.invite}&scope=bot&permissions=355393)`)
            .setFooter(`Angefragt von: ${message.author.username}`, `${message.author.displayAvatarURL}`)
            .setTimestamp()
            message.channel.send(SHembed)
}

module.exports.config = {
    name: "invite",
    aliases: ["einladung"],
    noaliases: "Keine Aliases",
    description: "In diesem Befehl kannst du den Bot einladen.",
    usage: "invite",
    berechtigung: "",
}

