const colors = require("colors");
colors.enable();

console.log(`Ошибки? Вопросы? Связь: @s0bakennn_connect (Telegram)`.blue.bold);
console.log(`[${new Date().toLocaleTimeString('ru', { timeZone: 'Europe/Moscow', timeStyle: 'short' })}] The system is running!`.yellow.bold);

require(`./src/bot.js`);