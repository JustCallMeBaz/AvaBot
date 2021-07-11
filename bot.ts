import Discord from 'discord.js';
import schedule from 'node-schedule';
import { getRndInt, getRndValue, contains } from './helper';
import fs from 'fs/promises';

const client: Discord.Client = new Discord.Client();

const botToken = 'ODYwNjM1NDEyMjg0NzAyNzIw.YN-HMA.FjykWLmReOk7uJG3R1P3Yo4RDnE';

const cpm: number = 438;

var names: string[] = ['', 'love', 'bubs', 'hun', 'honey', 'ava', 'lovebug'];

//^TODO:: CHANGE THIS TO AVA'S ID
const avaID: string = '459551521512620032';

const avaBotTeam: string[] = ['342811962041827358', '272121677247283200', 
'252286645481635840', '209678211993305088', '224494447239495682'];

var avaUser: Discord.User;

var avaBotTeamUsers: Discord.User[] = [];

var goodMorningSchedule: schedule.Job;
var goodNightSchedule: schedule.Job;
var dailyMessageSchedule: schedule.Job;
var avaBotTeamSchedule: schedule.Job;

//TODO: Finish dailyMessageMap
var dailyMessageMap: Map<number, string> = new Map<number, string>( 
	[
		[ 0, `hey, love! this is athena, talking to you from the past in a bot i made. i hope this makes up for me leaving for a week. i know you were gonna feel lonely, so i made this for you. when i said i was working on my 'internship,' i was actually working on this. i do have an internship, but i haven't really been working on it, yet. 
this bot takes many commands. there's plenty of surprises that you'll come to see, but to check the commands, type !commands for a list
		
i love you, bubs. it's your lock screen, so i know you like hearing that. and i know your password too, now :P
oh. btw. this is named AVABot or
	**A**ffection and 
	**V**alentine for 
	**A**va 
	Bot
		
i thought you would like that name. anyways. i'll be back soon, love. i love you <3

oh and also, i track the messages that you send to the bot!! just so i can see them whenever i'm back. i want you to know that, so it's not creepy. now i'll see you later <3`], 
		[ 1, `hey bubs! it's me again! make sure you take care of yourself while i'm gone, ok? eat actual meals. take showers. brush your teeth. drink water. if not for you, for me, alright? i love you, and i believe in you <3

oh, and i asked ash and a few other people for help for this project. you can see the full list with !credits, just to see who helped :P
		
that's all i have for you today, love. remember to take care of yourself, and i'll do the same. i'll have another message for you tomorrow <3`],
		[ 2, `hiii! hope you had a good day! i'm at camp. probably hurting my ankle again like i did the year prior. i actually get hurt at camp a lot, but it's ok. it's not actually hurt, more so just pain :P
		
for example i hurt my wrist one year from being run over by a gigantic gopher cage ball. then the following year, i hurt my *other* wrist by playing capture the flag. i ran to catch up with a guy from the other team, who was running back (who was actually pretty fast, he had long legs). i actually caught up with him, tagged him, then immediately fell, falling on my bent wrist. i ended up with a sprain after that. he didn't go to jail either. i'm still upset about that :P
		
but then later in the week, we played lacrosse with cut milk jugs, so we could scoop the ball up. i jumped to get the ball, but then landed while my ankle was twisted. i limped to the side, and actually almost passed out. it was kinda funny tho :P
		
anyways, i promise i'll be ok. worst case scenario i'm in pain and then i get to go to the hospital and text you more. cya hopefully Friday!!`], 
		[ 3, `hello, love! today's wednesday! that means we're over half way there!! i hope you're having a fun time. remember to eat healthy, drink water, etc. we always have a funny news network each year, CNN (Camp News News). they make good jokes, talk about what happened the previous day, and create inside jokes
		
one year, they talked about how someone in the 10th grade girl's cabin was taking a shower, and found a spider. she then ran out of the bathroom, without putting on clothes first, and screamed to everyone else. it was definitely an experience that i'll remember for a while
		
i hope these stories are fun for you to read, and they give you a little sense of connection to me, even if i can't be there currently. i love you, bubs. enjoy!
		
oh, and btw. in case you didn't know already, you can say "i love you," and the bot'll respond for me! you're amazing, love. see you soon <3`],
		[ 4, `it's a new day, a new message from me. currently writing this at 1 am the day before leaving. can't expect me to not procrastinate something *any* chance i get :P
		
but it's thursday!! one day until i come back!! today is cry night, where we have a very sappy, very sad, very emotional night for everyone. we sing (usually people sing about god and stuff but singing is still fun nonetheless), and focus on ourselves (and god, but again who really cares about about the fake sky daddy?)
		
i had forgotten square dancing was yesterday, or should have been at least. square dancing is fun!! we should do it!! you go in circles, and everyone fails at dancing. every year we dress up all southern, despite the stereotypes, and have straw cowboy hats, flannels, jeans. it's fun. almost like halloween!
		
anyways love, i'll talk to you tomorrow. but *actually!!* i love you <3`],
		[ 5, `final day!! i'll see you in a few hours!! :D
		
today should've been CCC! (California Co-Ed Cickball) ((ignore how kickball is spelled just shhh)) it's where you have a partner, and you can't break hands. if you do, it's either an out for your team, or a home run for the other depending on what team you're on at the time of the break. i'm not sure who i'll be stuck with as a partner this year, since all of my friends technically graduated, and aren't here this year. but hopefully it'll be fine. worst case scenario i just won't play and just watch, which knowing me, i'll probably be hurt anyways :P. if only you were here, then we could play this together!! maybe next time? :eyes: 
		
only a few more hours and we can talk again!! see you soon, love!! <3`]
	]
);

const commands: string = 
`\`\`\`
					  		List of Commands
		'i love you' - a quick command to help you feel less alone <3
		   	  		!commands - shows this list!! :P
	  		!daily - shows the daily message (no peaking :P)
	!credits - shows the people who helped me in any way with this bot!!\`\`\``
const credits: string = 
`\`\`\`
						People Who Helped in this Project
								me (coding), 
								ash (ideas), 
							chess (coding help), 
					ero, caleb, and everyn (maintenance)\`\`\``

client.login(botToken);

client.on('ready', async () => {
	console.log(`Logged in as ${client.user?.tag}!`);
	avaUser = await client.users.fetch(avaID);
	avaUser = await client.users.fetch(avaID);

	avaBotTeam.forEach(async (id: string) => {
		avaBotTeamUsers.push(await client.users.fetch(id));
	});

	createSchedules();
});


client.on('message', async (message: Discord.Message) => {
	var user: Discord.User = message.author;
	var content: string = message.content.trim();
	
	if(user.id !== avaID) return;
	
	await writeToLog(`${user.username}: ${content}`);

	if(content === '!daily') {
		var date: Date = new Date();
		var hour: number = date.getHours();
		var dayOfWeek: number = date.getDay();
		
		if(hour < 16 && dayOfWeek === 0) {
			sendAvaMessage(`there are no messages for you to see yet${getRandomName()}!`);
		} else if(hour < 16) {
			sendAvaMessage(`here's the message from yesterday. you can't get the new one early :P
			${dailyMessageMap.get(dayOfWeek - 1)}`);
		} else {
			sendAvaMessage(`here's the message from earlier today${getRandomName()}!!
			${dailyMessageMap.get(dayOfWeek)}`);
		}
		return;
	}


	if(content === '!commands') {
		sendAvaMessage(commands);
		return;
	}
	
	if(content === '!credits') {
		sendAvaMessage(credits);
		return;
	}
	
	if(contains(content, 'hello', 'hi', 'hey')) {
		sendAvaMessage(`hello${getRandomName()}!`);
	}

	if(contains(content, 'i love you', 'i love u', 'i luv you', 'i luv u')) {
		sendAvaMessage(`i love you too${getRandomName()}${getRndInt(0, 2) ? '!' : ''}`);
		return;
	}
});

async function sendAvaMessage(message: string) {

	await writeToLog(`${client.user?.username}: ${message}`);
	if(avaUser.dmChannel == null) {
		await avaUser.createDM();
	}

	avaUser.dmChannel?.startTyping();

	setTimeout(() => {
		avaUser.dmChannel?.stopTyping();
		avaUser.send(message);
	}, determineTypingTime(message));
	
}

async function writeToLog(message: string) {

	await fs.readFile('./log.txt', 'utf-8').then(async (text: string) => {
		text += "\n" + message;

		await fs.writeFile('./log.txt', text, 'utf-8');
	});
}

function sendAvaBotTeamMessage(message: string) {
	avaBotTeamUsers.forEach((user: Discord.User) => {

		try {
			user.send(message);
		}
		catch {
			console.log(`${user.username} is gay!`);
		}

	});
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
	const avaBotTeamRule = new schedule.RecurrenceRule();
	
	goodMorningRule.hour = 8; goodMorningRule.minute = 0;
	goodMorningRule.dayOfWeek = new schedule.Range(1, 5);
	goodNightRule.hour = 20; goodNightRule.minute = 0; goodNightRule.dayOfWeek = new schedule.Range(0, 4);
	dailyMessageRule.dayOfWeek = new schedule.Range(0, 5); dailyMessageRule.hour = 16; 
	dailyMessageRule.minute = 0;
	avaBotTeamRule.hour = [7, 15, 19]; avaBotTeamRule.minute = [0, 30];

	goodMorningSchedule = schedule.scheduleJob(goodMorningRule, () => {
		return sendAvaMessage(`good morning${getRandomName()}! ${getRndInt(0, 2) ? '<3' : ''}`);
	});

	goodNightSchedule = schedule.scheduleJob(goodNightRule, () => {
		return sendAvaMessage(`goodnight${getRandomName()}! ${getRndInt(0, 2) ? '<3' : ''}`);
	});

	goodNightSchedule = schedule.scheduleJob(dailyMessageRule, (date: Date) => {
		var dayOfWeek: number = date.getDay();

		return sendAvaMessage(dailyMessageMap.get(dayOfWeek) as string) ;

	});

	avaBotTeamSchedule = schedule.scheduleJob(avaBotTeamRule, () => {
		return sendAvaBotTeamMessage('i\'m alive!');
	});

}