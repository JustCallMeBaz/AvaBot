import * as Discord from 'discord.js';

const client: Discord.Client = new Discord.Client();

//TODO:: CHANGE THIS TO AVA'S ID
const avaID: string = '224494447239495682';
var avaUser: Discord.User;

client.on('ready', async () => {
	console.log(`Logged in as ${client.user?.tag}!`);
	avaUser = await client.users.fetch(avaID);
});



client.login('ODYwNjM1NDEyMjg0NzAyNzIw.YN-HMA.ftzSqbckjFvqhS2Bx8fVrwI_0Hs');