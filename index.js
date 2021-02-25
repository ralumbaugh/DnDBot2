const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
client.characters = [];
client.initiative = [];
const commandFiles = fs.readdirSync('./BotCommands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./BotCommands/${file}`);

    client.commands.set(command.name, command);
}

const {prefix, token} = require('./config.json');

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    console.log(`Command: ${command} Args: ${args}`);
    if(!client.commands.has(command)) return;

    try{
        client.commands.get(command).execute(client, message, args);
    } catch (error) {
        console.error(error);
        message.reply(`I can't do that, ${message.author.username}`);
    }
});

client.login(token);