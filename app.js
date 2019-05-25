const Discord = require('discord.js');
const client = new Discord.Client();
const bot = new Discord.Client({disableEveryone: true});
const fs = require('fs');
const botconfig = require('./botconfig.json');
const db = JSON.parse(fs.readFileSync("./database.json", "utf8"));

//--------------------------- Login --------------------------------------
client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}...`)
  var datetime = new Date();
  console.log(datetime);
  let statuses = [
    `auf ${client.users.size} Benutzer`,
    `${botconfig.prefix.prefix}help für Hilfe`
  ]
  setInterval(function() {
    let status = statuses[Math.floor(Math.random() * statuses.length)]
    client.user.setActivity(status, {type: "WATCHING"})
    
  })
})
//--------------------------- CMD HANDLER --------------------------------------
client.on('ready',async () => {
  client.commands = new Discord.Collection();
      client.aliases = new Discord.Collection();
  await fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err)
  let jsfile = files.filter(f => f.split(".").pop() === "js")
      if(jsfile.length <= 0) {
        return console.log("[LOGS] Konnte Cmd nicht finden.");}
  
    jsfile.forEach((f, i) => {
      let pull = require(`./commands/${f}`);
      client.commands.set(pull.config.name, pull);
      pull.config.aliases.forEach(alias => {
        client.aliases.set(alias, pull.config.name)
       });
      });
    });
  })

//--------------------------- LEVEL SYSTEM --------------------------------------
const talkedRecently = new Set();
//--------------------------- MYSQL - Daten -------------------------------------

    // if the user is not on db add the user and change his values to 0
    if (!db[message.author.id]) db[message.author.id] = {
        xp: 0,
        level: 0
      };
    db[message.author.id].xp++;
    let userInfo = db[message.author.id];
    if(userInfo.xp > 100) {
        userInfo.level++
        userInfo.xp = 0
     message.channel.send("HGW, du bist nun Level "+userInfo.level+"! "+message.author+"")
    }
      fs.writeFile("./database.json", JSON.stringify(db), (x) => {
        if (x) console.error(x)
      });

      if(command === "rank") {
        let userInfo = db[message.author.id];
        let member = message.mentions.members.first();
        let embed = new Discord.RichEmbed()
        .setColor(0x4286f4)
        .addField("Level", userInfo.level)
        .addField("XP", userInfo.xp+" | 100")
        if(!member) return message.channel.send(embed)
        let memberInfo = db[member.id]
        let embed2 = new Discord.RichEmbed()
        .setColor(0x4286f4)
        .addField("Level", memberInfo.level)
        .addField("XP", memberInfo.xp+" | 100")
        message.channel.send(embed2)
    .catch(error => message.channel.send(error)
          
           )}    
    

//--------------------------- MESSAGE EVENTS --------------------------------------
//Server - Message
  client.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;
    if (message.content.startsWith(botconfig.prefix.prefix)) {
    let prefixi = botconfig.prefix.prefix
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
      
     if (!db[message.author.id]) db[message.author.id] = {
        xp: 0,
        level: 0
      };
    db[message.author.id].xp++;
    let userInfo = db[message.author.id];
    if(userInfo.xp > 100) {
        userInfo.level++
        userInfo.xp = 0
     message.channel.send(`${message.author}, du bist nun Level ${userInfo.level}!`)
    }
      fs.writeFile("./database.json", JSON.stringify(db), (x) => {
        if (x) console.error(x)
      });

      let commandfile = client.commands.get(cmd.slice(prefixi.length)) || client.commands.get(client.aliases.get(cmd.slice(prefixi.length)))
      if(commandfile) commandfile.run(client, bot, message, args, con)
    
  }})

client.login(botconfig.token);


