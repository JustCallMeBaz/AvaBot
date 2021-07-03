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
const client = new Discord.Client();
//TODO:: CHANGE THIS TO AVA'S ID
const avaID = '224494447239495682';
var avaUser;
client.on('ready', async () => {
    console.log(`Logged in as ${client.user?.tag}!`);
    avaUser = await client.users.fetch(avaID);
    sendAvaMessage('fjasdk');
});
client.on('message', async (message) => {
    var user = message.author;
    if (user.id === client.user?.id)
        return;
    message.channel.send('bruh');
});
function sendAvaMessage(message) {
    avaUser.send(message);
}
client.login('ODYwNjM1NDEyMjg0NzAyNzIw.YN-HMA.ftzSqbckjFvqhS2Bx8fVrwI_0Hs');
