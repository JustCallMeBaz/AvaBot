import Discord from 'discord.js';
import schedule from 'node-schedule';
import { getRndInt, getRndValue, contains } from './helper';

const client: Discord.Client = new Discord.Client();

const cpm: number = 438;

var names: string[] = ['', 'love', 'bubs', 'hun', 'honey', 'ava'];

//^TODO:: CHANGE THIS TO AVA'S ID
const avaID: string = '224494447239495682';
var avaUser: Discord.User;

var goodMorningSchedule: schedule.Job;
var goodNightSchedule: schedule.Job;
var dailyMessageSchedule: schedule.Job;

//TODO: Finish dailyMessageMap
var dailyMessageMap: Map<number, string> = new Map<number, string>( 
	// [[0, 'message'], [1, 'lmfao']] (template)
);

client.login('ODYwNjM1NDEyMjg0NzAyNzIw.YN-HMA.ftzSqbckjFvqhS2Bx8fVrwI_0Hs'); // hard coding ids like this is a bad idea

client.on('ready', async () => {
	console.log(`Logged in as ${client.user?.tag}!`);
	avaUser = await client.users.fetch(avaID);

	createSchedules();
});


client.on('message', (message: Discord.Message) => {
	var user: Discord.User = message.author;
	var content: string = message.content.trim();

	if(user.id !== avaID) return;

	if(contains(content, 'i love you', 'i love u', 'i luv you', 'i luv u')) {
		sendAvaMessage(`i love you too ${getRandomName()}${getRndInt(0, 2) ? '!' : ''}`); // fixed spacing
		return;
	}
});

async function sendAvaMessage(message: string) {

	if(avaUser.dmChannel == null) {
		await avaUser.createDM();
	}

	// why?
	if(avaUser.dmChannel == null) {
		console.log("FUCK");
	}

	// why are we using `dmChannel?`, this should never be null. you're missing an undefined check tho
	avaUser.dmChannel?.startTyping();

	setTimeout(() => {
		avaUser.dmChannel?.stopTyping();
		avaUser.send(message);
	}, determineTypingTime(message));
	
}

function getRandomName(): string {
	var name = getRndValue(names);

	if(name !== '') name = `, ${name}`;
	return name; 	
}

function determineTypingTime(message: string): number {

	var cps: number = cpm / 60.0;

	var timeInSec: number = message.length / cps;
	
	return timeInSec * 1000;
}

function createSchedules() {
	const goodMorningRule = new schedule.RecurrenceRule();
	const goodNightRule = new schedule.RecurrenceRule();
	const dailyMessageRule = new schedule.RecurrenceRule();
	
	goodMorningRule.hour = 8;
	goodNightRule.hour = 20;
	dailyMessageRule.dayOfWeek = new schedule.Range(0, 5); dailyMessageRule.hour = [12, 16];

	goodMorningSchedule = schedule.scheduleJob(goodMorningRule, () => {
		return sendAvaMessage(`good morning, ${getRandomName()}! ${getRndInt(0, 2) ? '<3' : ''}`);
	});

	goodNightSchedule = schedule.scheduleJob(goodNightRule, () => {
		return sendAvaMessage(`goodnight, ${getRandomName()}! ${getRndInt(0, 2) ? '<3' : ''}`);
	});

	goodNightSchedule = schedule.scheduleJob(dailyMessageRule, (date: Date) => {
		var dayOfWeek: number = date.getDay();

		return sendAvaMessage(dailyMessageMap.get(dayOfWeek) as string); // Why is this type assertion needed? It should already be a string.

	});
}
