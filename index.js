const s = require("./settings.json")
var Base64 = require('js-base64').Base64;
const {Client, WebhookClient} = require("discord.js");
let Bot = new Client();
let webhook = new WebhookClient(s.wid, s.wt);
Bot.on('ready', () => {
	console.log("ready");
})

Bot.on('message', m => {
	if(m.author.bot)return;
	m.channel.type != "dm" ? m.delete() : null;
	let c = {};
	c.username = m.channel.type == "dm" ? "Anon" : Base64.btoa(m.author.id.toString().toString());
	//if(m.fil)
	c.color = stringToColor(m.author.id.toString());
	c.avatarURL = "https://pbs.twimg.com/profile_images/834093730244079616/0um-zqxI_400x400.jpg"
	webhook.send(m.content.toString().replace("@everyone", "NOPE"), c);
})

Bot.on("guildMemberAdd", m => {
	m.setNickname("anon")
})

Bot.login(s.t);

var stringToColor = function(str) {
	var hash = 0;
	for (var i = 0; i < str.length; i++) {
	  hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	var colour = '#';
	for (var i = 0; i < 3; i++) {
	  var value = (hash >> (i * 8)) & 0xFF;
	  colour += ('00' + value.toString(16)).substr(-2);
	}
	return colour;
  };