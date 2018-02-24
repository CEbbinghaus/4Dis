const s = require("./settings.json")
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
	c.username = m.channel.type == "dm" ? "Anon" : parseInt(m.author.id.toString()).toString(36);
	c.avatarURL = "https://pbs.twimg.com/profile_images/834093730244079616/0um-zqxI_400x400.jpg"
	webhook.send(m.content.toString().replace("@everyone", "NOPE"), c);
})

Bot.on("guildMemberAdd", m => {
	m.setNickname("anon")
})

Bot.login(s.t)