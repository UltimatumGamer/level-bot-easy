const botconfig = require('./../botconfig.json');
const Discord = require('discord.js');
const lv = require('./../level.json');
module.exports.run = (client, bot, message, args, con) => {
  message.delete()
  let sEmbed = new Discord.RichEmbed()
  .setColor(`RANDOM`)
  .setTitle("**__XP - Info__**")
  .setTimestamp()
  .setTitle(`__***XP - System***__`)
  .addField(`**Level 1**: ${lv.level1} XP\n
**Level 2**: ${lv.level2} XP\n
**Level 3**: ${lv.level3} XP\n
**Level 4**: ${lv.level4} XP\n
**Level 5**: ${lv.level5} XP\n
**Level 6**: ${lv.level6} XP\n
**Level 7**: ${lv.level7} XP\n
**Level 8**: ${lv.level8} XP\n
**Level 9**: ${lv.level9} XP\n
**Level 10**: ${lv.level10} XP\n
`, `Wenn du schreibst bekommst du jede Minute XP.`, true)
.setFooter(`${message.author.username}`,message.author.displayAvatarURL)
  message.channel.send({embed: sEmbed})





}
module.exports.config = {
  name: "xp-info",
  aliases: ["xi","xpinfo"],
  noaliases: "Keine Aliases",
  description: "Mit diesem Befehl siehst du alle verfügbaren Level.",
  usage: "xp-info",
  berechtigung: "",
}
