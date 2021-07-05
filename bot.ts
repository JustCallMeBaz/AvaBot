import Discord from 'discord.js'
import schedule from 'node-schedule';
import { getRndNum, getRndValue } from './helper';

const client: Discord.Client = new Discord.Client();

var names: string[] = ['love', 'bubs', 'hun', 'honey', 'ava'];

//TODO:: CHANGE THIS TO AVA'S ID
const avaID: string = '224494447239495682';
var avaUser: Discord.User;

var goodMorningSchedule: schedule.Job;
var goodNightSchedule: schedule.Job;

client.login('ODYwNjM1NDEyMjg0NzAyNzIw.YN-HMA.ftzSqbckjFvqhS2Bx8fVrwI_0Hs');

client.on('ready', async () => {
	console.log(`Logged in as ${client.user?.tag}!`);
	avaUser = await client.users.fetch(avaID);
	
	createSchedules();
});


client.on('message', async(message: Discord.Message) => {
	var user: Discord.User = message.author;
	var content: string = message.content;

	if(user.id !== avaID) return;

	if(contains(content, 'i love you', 'i love u', 'i luv you', 'i luv u')) {
		sendAvaMessage(`i love you too, ${getRandomName()}`);
		return;
	}
});

function sendAvaMessage(message: string) {
	avaUser.send(message);
}

function getRandomName(): string {
	return getRndValue(names);
}

function createSchedules() {
	const goodMorningRule = new schedule.RecurrenceRule();
	const goodNightRule = new schedule.RecurrenceRule();

	goodMorningRule.hour = 8;
	goodNightRule.hour = 20;

	goodMorningSchedule = schedule.scheduleJob(goodMorningRule, () => {
		return sendAvaMessage(`good morning, ${getRandomName()}!
			${Math.floor(getRndNum(0, 2)) ? ' <3' : ''}`);
	});

	goodNightSchedule = schedule.scheduleJob(goodNightRule, () => {
		return sendAvaMessage(`goodnight, ${getRandomName()}! <3`);
	});
}

function contains(str: string, ...phrases: string[]): boolean {
	
	for(var x = 0; x < phrases.length; x++) {
		if(str.includes(phrases[x])) return true;
	}
	
	return false;
}