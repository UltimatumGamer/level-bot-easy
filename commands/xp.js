const botconfig = require('./../botconfig.json');
const Discord = require('discord.js');

const lv = require('./../level.json');
module.exports.run = (client, bot, message, args, con) => {
  message.delete() 
  let target = message.mentions.users.first() || client.users.get(args[0]) || message.author;

con.query(`SELECT * FROM xp WHERE id = '${target.id}' AND guild = '${message.guild.id}'`, (err, rows) => {
if(err) throw err;
if(!rows[0]) return message.channel.send("Dieser Nutzer hat noch keine Daten bei uns.").then(msg => {msg.delete(4000)}).catch(console.error)
  let xp = rows[0].xp
  let xl = 1000
  nlevel = xl
  if(xp > lv.level1) {level = '1' 
  nlevel = lv.level2} else {level = '0'
  nlevel = lv.level1}
  if(xp > lv.level2) {level = '2'
  nlevel = lv.level3} 
  if(xp > lv.level3) {level = '3'
  nlevel = lv.level4} 
  if(xp > lv.level4) {level = '4'
  nlevel = lv.level5}
  if(xp > lv.level5) {level = '5'
  nlevel = lv.level6} 
  if(xp > lv.level6) {level = '6'
  nlevel = lv.level7}  
  if(xp > lv.level7) {level = '7'
  nlevel = lv.level8} 
  if(xp > lv.level8) {level = '8'
  nlevel = lv.level9}
  if(xp > lv.level9) {level = '9'
  nlevel = lv.level10}  
  if(xp > lv.level10) {level = '10'
  nlevel = 'MAX-LEVEL'} 

    var XPEE = new Discord.RichEmbed()
    .setTitle("__***XP - System***__")
    .setDescription(`${botconfig.prefix.prefix}xp-info für weitere Informationen.\n${botconfig.prefix.prefix}xp-top für die Bestenliste`)
    .setThumbnail(target.displayAvatarURL)
    .addField(`Du bist Level: ${level}`,
              "Du hast: " + "__" + xp + "__/"+ nlevel + `${xp < lv.level10 ? 'XP':''}`, true)

    .setColor(`RANDOM`)
    .setFooter(`${target.username}`,target.displayAvatarURL)
    .setTimestamp()

    message.channel.send(XPEE);
  });


 








}
module.exports.config = {
  name: "xp",
  aliases: [],
  noaliases: "Keine Aliases",
  description: "Zeigt dir deine XP an.",
  usage: "xp [@USER]",
  berechtigung: "",
}
