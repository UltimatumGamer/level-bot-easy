const botconfig = require('./../botconfig.json');
const Discord = require('discord.js');

const lv = require('./../level.json');
module.exports.run = (client, bot, message, args, con) => {
  message.delete()
con.query(`SELECT * FROM xp WHERE guild = '${message.guild.id}' ORDER BY xp DESC`, (err, rows) => {
    if(err) throw err
    

      if(!rows[0]) return message.channel.send("Es gibt noch keine Bestenliste.").then(msg => {msg.delete(8000)}).catch(console.error)

      if(!args[0]) {
        var  num = 5
      } else {
        var num = args[0]
      }
      let amount = parseInt(num);
      if (isNaN(amount)) {
          return message.reply('Du musst eine Zahl angeben - bal-top [ANZAHL]');
      }
      if(rows.length < num) return message.channel.send(`Die Bestenliste geht derzeit nur bis ${rows.length}.`).then(msg => {msg.delete(8000)}).catch(console.error)
      if(args[0] > 25) return message.channel.send(`Die Bestenliste geht nur bis zum 25.Platz.`).then(msg => {msg.delete(8000)}).catch(console.error)
  
      const embed = new Discord.RichEmbed()
      .setTitle("__***XP - Top " + num + "***__")
      .setDescription(`Hier ist die Bestenliste vom Server`)
      .setColor(`RANDOM`)
      .setTimestamp()
      .setFooter(message.guild.name,message.guild.iconURL)
  
      for(let i = 0; i < num; i++) {  
   
      var xp= (rows[i]).xp
      let user = client.users.find(user => user.id == (rows[i]).id);
  
        embed.addField(`**${i+1}.Platz**`, `${user} => ${xp} XP`);
     
   }
  
      message.channel.send(embed);
 

  });



 



}
module.exports.config = {
  name: "xp-top",
  aliases: [],
  noaliases: "Keine Aliases",
  description: "?",
  usage: "?",
  berechtigung: "Administrator",
}
