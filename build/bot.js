"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = __importStar(require("discord.js"));
const schedule = __importStar(require("node-schedule"));
const client = new Discord.Client();
var names = ['love', 'bubs', 'hun', 'ava'];
//TODO:: CHANGE THIS TO AVA'S ID
const avaID = '224494447239495682';
var avaUser;
var goodNightSchedule;
client.on('ready', async () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    avaUser = await client.users.fetch(avaID);
    createGoodnightSchedules();
});
function createGoodnightSchedules() {
    const goodNightRule = new schedule.RecurrenceRule();
    goodNightRule.minute = new schedule.Range(0, 59);
    goodNightSchedule = schedule.scheduleJob(goodNightRule, function () {
        return sendAvaMessage(`goodnight, ${getRandomName()}`);
    });
}
client.on('message', async (message) => {
    var user = message.author;
    var content = message.content;
    if (user.id !== avaID)
        return;
    if (contains(content, 'i love you', 'i love u', 'i luv you', 'i luv u')) {
        sendAvaMessage(`i love you too, ${getRandomName()}`);
        return;
    }
});
function sendAvaMessage(message) {
    avaUser.send(message);
}
function getRandomName() {
    var rndNum = Math.floor((Math.random() * (names.length)));
    return names[rndNum];
}
client.login('ODYwNjM1NDEyMjg0NzAyNzIw.YN-HMA.ftzSqbckjFvqhS2Bx8fVrwI_0Hs');
function contains(str, ...phrases) {
    for (var x = 0; x < phrases.length; x++) {
        if (str.includes(phrases[x]))
            return true;
    }
    return false;
}
