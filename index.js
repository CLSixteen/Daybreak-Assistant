const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

let raidParams = [
    { name:'title', value: 'Château Nathria' },
    { name:'mode', value: 'Héroïque' },
    { name:'date', value: '' },
    { name:'time', value: '21:00 - 00:00' },
    { name:'goal', value: '' },
    { name:'note', value: '' },
];


client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    if(command === 'raid') {
        client.commands.get('raid').execute(message, args, raidParams);        
    } 
})

client.login(token);