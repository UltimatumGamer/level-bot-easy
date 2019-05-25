const Discord = require('discord.js');
const client = new Discord.Client();
const bot = new Discord.Client({disableEveryone: true});
const fs = require('fs');
const botconfig = require('./botconfig.json');
const mysql = require('mysql');

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
//--------------------------- EVENT HANDLER -------------------------------------
client.on('raw', event => {
  const eventName = event.t;
  if(eventName === 'GUILD_MEMBER_REMOVE') 
  {
con.query(`SELECT * FROM xp WHERE id = '${event.d.user.id}' AND guild = '${event.d.guild_id}'`, (err, rows) => {
    if(err) throw err;
  con.query(`SELECT * FROM xp WHERE id = '${event.d.user.id}' AND guild = '${event.d.guild_id}'`, (err, rows) => {
    if(err) throw err;
    let sql;
    if(rows.length > 0){
        sql = `DELETE FROM xp WHERE id = '${event.d.user.id}';`
      } else return 
    con.query(sql);
});
})
  }
  })
//--------------------------- LEVEL SYSTEM --------------------------------------
const talkedRecently = new Set();
//--------------------------- MYSQL - Daten -------------------------------------
  var coni = {
    host: botconfig.mysql.host,
    user: botconfig.mysql.user,
    port: botconfig.mysql.port,
    password: botconfig.mysql.password,
    database: botconfig.mysql.database,
    supportBigNumbers: true,
    bigNumberStrings: true
  
  };
  var con;
  function handleDisconnect() {
    con = mysql.createConnection(coni); // Recreate the connection, since
                                                    // the old one cannot be reused.
  
    con.connect(function(err) { 
      console.log("Datenbank Verbindung aktiv.")                // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
        console.log('Fehler beim Verbindungsaufbau zur Datenbank <> Code #6577', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    con.on('error', function(err) {
      console.log('Datenbank Fehler  <> Code #6344', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
      }
    });
  }
  handleDisconnect();

  function generateXp() {
    let min = 2;
    let max = 20;
  
    return Math.floor(Math.random() * (max - min + 1)) + min;
  
  }

  client.on("message", message => {
    if(message.author.bot || message.channel.type === "dm") return;


    if (talkedRecently.has(message.author.id)) return
  con.query(`SELECT * FROM xp WHERE id = '${message.author.id}' AND guild = '${message.guild.id}'`, (err, rows) => {
     if(err) throw err;
    if(message.author.bot) return;
  
  con.query(`SELECT * FROM xp WHERE id = '${message.author.id}' AND guild = '${message.guild.id}'`, (err, rows) => {
      if(err) throw err;
      let sql;
      if(rows.length < 1){
        sql = `INSERT INTO xp (guild , id, xp) VALUES ('${message.guild.id}', '${message.author.id}', ${generateXp()})`
      } else{
      let xp = rows[0].xp;
        sql = `UPDATE xp SET xp = ${xp + generateXp()} WHERE id = '${message.author.id}' AND guild = '${message.guild.id}'`;
      }
  con.query(sql);
    });
  

  })
    talkedRecently.add(message.author.id);
    setTimeout(() => {
    talkedRecently.delete(message.author.id);
    }, 60000);
  })




//--------------------------- MESSAGE EVENTS --------------------------------------
//Server - Message
  client.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;
    if (message.content.startsWith(botconfig.prefix.prefix)) {
    let prefixi = botconfig.prefix.prefix
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);

      let commandfile = client.commands.get(cmd.slice(prefixi.length)) || client.commands.get(client.aliases.get(cmd.slice(prefixi.length)))
      if(commandfile) commandfile.run(client, bot, message, args, con)
    
  }})

client.login(botconfig.token);


