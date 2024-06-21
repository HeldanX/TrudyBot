@echo off
:: Remember to change the path
cd /d C:\projects\TrudyBot
start cmd /k "node deploy-commands.js && node index.js"