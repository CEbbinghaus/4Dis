const s = require("./settings.json")
const fetch = require("node-fetch");
const {Client, Attachment} = require("discord.js");
let Bot = new Client();
Bot.on('ready', () => {
	console.log(`Ready to Serve ${Bot.users.size} Active Users on ${Bot.guilds.size} Servers. Invite me here: https://discordapp.com/oauth2/authorize?client_id=${Bot.user.id}&scope=bot&permissions=67497153`);
})
let asyncLoop = async (a, c) => {
	let loop = async (a, c) => {
		let e = a.shift();
		await c(e);
		if (e.length) loop(a, c);
	}
	loop(a, c);
}
process.on("unhandledRejection", console.error);
Bot.on('message', async m => {
	if (m.author.bot) return;
	if (!m.isMentioned(Bot.user)) return;
	let args = m.content.toLowerCase().replace(/<@(!|)\d{18}>/, "").trim().split(" ");
	console.log(args);
	if (args[0] == "dump") {
		let a = [];
		if (!args[1]) return m.reply("You are Missing some Arguments");
		let q = args[1].split("/");
		await fetch(`http://a.4cdn.org/${q[0]}/thread/${q[1]}.json`).then(r => {
			r.json().then(j => {
				j.posts.forEach(p => {
					if (p.tim) {
						a.push(`https://i.4cdn.org/${q[0]}/${p.tim}${p.ext}`);
					}
				})
				asyncLoop(a, async (s) => {
					await m.channel.send(new Attachment(s));
					return;
				})
			})
		})
	}
})

Bot.login(s.t);