


# TrudyBot
TrudyBot is a Discord bot designed to execute Project Zomboid admin commands directly by chat.
It streamlines server management by allowing admins to perform tasks without accessing the server console.

## Features
- Save Game World: Save the current game world state.
- Player Management: Check the number of online players.
- Server Restart: Initiate a countdown for server restart.
- Weather Control: Start and stop rain/weather on the server.
- Messaging: Send custom messages to the server.
- Teleportation: Teleport players within the game.

## Commands
Here is a list of available commands:

- /save: Save the game world.
- /players: Show the number of online players.
- /restart: Start the server restart countdown.
- /startrain: Start rain on the server.
- /stoprain: Stop rain on the server.
- /stopweather: Stop weather on the server until next restart.
- /message <testo>: Send a custom message to the server.
- /tpa <primo> <secondo>: Teleport a player to another player.

## Installation

### Prerequisites
- Node.js v14 or higher
- Administrator permissions on the Discord server

## Setup

### Install the dependencies:

`npm install`
`npm install discord.js rcon-client`
`npm install dotenv`

### Configure your environment variables in a .env file:

`DISCORD_TOKEN=your_discord_token
PZ_SERVER_ADDRESS=your_server_address
PZ_SERVER_PORT=your_server_port`

### Deploy the commands and start the bot:

- `node deploy-commands.js`

- `node index.js`

_if you don't have node.js you need to install it_

### Start the Bot locally

To start the bot automatically, you can use the provided start_trudybot.bat file. 
Ensure the path to your project is correct in the script:

`@echo off
cd /d [yout repo bot path]
start cmd /k "node deploy-commands.js && node index.js"`

## Usage
Once the bot is running, you can use the slash commands on your Discord server to manage your Project Zomboid server. 
Make sure the bot has the necessary permissions to read and send messages in the channels you intend to use it in.

