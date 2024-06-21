const { Client, GatewayIntentBits } = require('discord.js');
const { Rcon } = require('rcon-client');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rcon = new Rcon({
    host: process.env.PZ_SERVER_ADDRESS,
    port: process.env.PZ_SERVER_PORT,
    password: process.env.PZ_RCON_PASSWORD
});

async function connectRcon() {
    try {
        await rcon.connect();
        console.log('Connected to RCON server');
    } catch (err) {
        console.error('RCON server connection error:', err);
    }
}

client.once('ready', () => {
    console.log('Bot online!');
    connectRcon();
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName, options } = interaction;

    try {
        switch (commandName) {
            case 'save':
                await sendRconCommand('save');
                await interaction.reply('World Saved!');
                break;
            case 'players':
                const playersResponse = await sendRconCommand('players');
                await interaction.reply(`Online players: ${playersResponse}`);
                break;
            case 'message':
                const message = options.getString('text');
                await sendRconCommand(`servermsg "${message}"`);
                await interaction.reply('Message sent successfully.');
                break;
            case 'restart':
                await restartCountDown(interaction);
                break;
            case 'startrain':
                await sendRconCommand('startrain');
                await interaction.reply('Rain started.');
                break;
            case 'stoprain':
                await sendRconCommand('stoprain');
                await interaction.reply('Rain stopped.');
                break;
            case 'stopweather':
                await sendRconCommand('stopweather');
                await interaction.reply('Weather conditions stopped.');
                break;
            case 'thunder':
                const name = options.getString('name');
                await sendRconCommand(`thunder "${name}"`);
                await interaction.reply('Lightning kill successful. Nice!');
                break;
            case 'tpacoordinates':
                const coordinates = options.getString('coordinates');
                await sendRconCommand(`teleportto "${coordinates}"`);
                await interaction.reply(`Teleported to ${coordinates}`);
                break;
            case 'tpa':
                const user = options.getString('first');
                const toUser = options.getString('second');
                await sendRconCommand(`teleport "${user}" "${toUser}"`);
                await interaction.reply(`Teleported from ${user} to ${toUser}.`);
                break;
            default:
                break;
        }
    } catch (err) {
        console.error('Error executing command:', err);
        await interaction.reply('Command failed.');
    }
});

async function restartCountDown(interaction) {
    const countdownMessages = [
        "5min", "4min", "3min", "2min", "1min", "NOW! LOG OUT!"
    ];

    try {
        await interaction.reply('Restart initiated successfully');
        for (let i = 0; i < countdownMessages.length; i++) {
            await sendRconMessage(`The server will restart in ${countdownMessages[i]}`);
            await sleep(i === countdownMessages.length - 1 ? 2000 : 60000);
        }

        await sendRconCommand("save");
        //await sendRconCommand("restart");

        await interaction.reply('Server restarted.');
    } catch (err) {
        console.error('Error during countdown and restart:', err);
        await interaction.reply('Error during countdown and restart.');
    }
}

async function sendRconCommand(command) {
    try {
        const response = await rcon.send(command);
        console.log(`Command "${command}" executed with response: ${response}`);
        return response;
    } catch (err) {
        console.error(`Error executing command "${command}":`, err);
        throw err;
    }
}

async function sendRconMessage(message) {
    try {
        const response = await sendRconCommand(`servermsg "${message}"`);
        console.log(`Message "${message}" sent to server.`);
        return response;
    } catch (err) {
        console.error('Error sending RCON message:', err);
        throw err;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

client.login(process.env.DISCORD_TOKEN);
