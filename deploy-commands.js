const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const commands = [
    {
        name: 'save',
        description: 'save the game world',
        type: 1,
    },
    {
        name: 'players',
        description: 'show how many players are online',
        type: 1,
    },
    {
        name: 'restart',
        description: 'Starts the countdown for server restart',
        type: 1,
    },
    {
        name: "startrain",
        description: "Starts rain on the server",
        type: 1
    },
    {
        name: "stoprain",
        description: "Stops rain on the server",
        type: 1
    },
    {
        name: "stopweather",
        description: "Stops weather conditions on the server",
        type: 1
    },
    {
        name: "thunder",
        description: "Summon a thunderstorm around a player",
        type: 1,
        options: [
            {
                name: 'name',
                description: 'player name',
                type: 3,
                required: true,
            },
        ],
    },
    {
        name: 'message',
        description: 'Send a message with specified text',
        type: 1,
        options: [
            {
                name: 'text',
                description: 'Text of the message to send',
                type: 3,
                required: true,
            },
        ],
    },
    {
        name: "tpa",
        description: "Teleport to a player. Once teleported, wait for the map to appear.",
        type: 1,
        options: [
            {
                name: "first",
                description: "Player to teleport from",
                type: 3,
                required: true
            },
            {
                name: "second",
                description: "Player to teleport to",
                type: 3,
                required: true
            }
        ]
    },
    {
        name: "tpacoordinates",
        description: "Teleport to coordinates",
        type: 1,
        options: [
            {
                name: "coordinates",
                description: "put your correct coordinates",
                type: 3,
                required: true
            },
        ]
    }

];

const clientId = process.env.CLIENT_ID;
const token = process.env.DISCORD_TOKEN;

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationCommands(clientId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands globally.');
    } catch (error) {
        console.error(error);
    }
})();
