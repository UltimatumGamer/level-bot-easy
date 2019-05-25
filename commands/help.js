const Discord = require('discord.js');
const botconfig = require('./../botconfig.json');
module.exports.run = async (client, bot, message, args) => {   
    if (args[0]){
        let command= args[0]
        if (client.commands.has(command)){
            commandn = client.commands.get(command);
            message.author.lastMessage.delete()
            var SHembed = new Discord.RichEmbed()
            .setColor(0x04B404)
            .setAuthor(`Hilfe - ${client.user.username}`, client.user.avatarURL)
            .setTimestamp()
            .setThumbnail('https://discord-bots.de/wp-content/uploads/2019/05/question.png')
            .setDescription(`Der Bot prefix ist: ${botconfig.prefix.prefix}\n\n**Befehl:** ${commandn.config.name}\n\n**Aliases:** ${commandn.config.aliases || commandn.config.noaliases}\n\n**Beschreibung:** ${commandn.config.description || "Keine Beschribung"}\n\n**Benutzung:** ${commandn.config.usage || "Keine Benutzungs-Info"}\n\n**Berechtignungslevel:** ${commandn.config.berechtigung || "Keins"}`)
            .setFooter(`${message.author.username}`, `${message.author.displayAvatarURL}`)
            .setTimestamp()
            message.channel.send(SHembed)
        }
    }

    if (!args[0]){
        message.delete();
       
            const embed = new Discord.RichEmbed();
            embed.setAuthor(`Hilfe - ${client.user.username}`, client.user.avatarURL);
            embed.setColor(0xdf4b11);
            embed.setFooter(`Angefragt von: ${message.author.username}`,message.author.avatarURL);
            embed.setTimestamp()
            embed.setThumbnail('https://discord-bots.de/wp-content/uploads/2019/05/question.png')
            embed.addField("Befehle", `**`+botconfig.prefix.prefix+`help** \`\`BEFEHL\`\`\n
            **`+botconfig.prefix.prefix+`invite - Lade mich auf deinen Server ein.**\n
            **`+botconfig.prefix.prefix+`xp \`\`@USER\`\` - Lasse dir die XP eines Nutzers anzeigen.**
            **`+botconfig.prefix.prefix+`xp-info - Levelübersicht auf diesem Server.**
            **`+botconfig.prefix.prefix+`xp-top \`\`ANZAHL\`\` - Bestenliste des Servers.**`)
           message.channel.send(embed)
    }
}
module.exports.config = {
    name: "help",
    aliases: ["hilfe"],
    noaliases: "Keine Aliases",
    description: "In diesem Befehl können Sie alle Befehle anzeigen. ",
    usage: "help [CMD]",
    berechtigung: "",
}

