const { Bot } = require('grammy');
const Mongo = require("./handlers/Mongo");
const Event = require("./handlers/Event");
const Command = require("./handlers/Command");
const Component = require("./handlers/Component");
const Functions = require("./handlers/Functions");
const Checks = require("./checks");
const { token } = require("../config.json");

require("colors");

const bot = new Bot(token);

bot.commands = new Map();
bot.components = new Map();
bot.cooldowns = new Map();

bot.catch((err) => {
    const ctx = err.ctx;
    if (err.message.includes(`message is not modified`)) return;
    console.error(`Ошибка у пользователя @${ctx.from?.username}:`, err.message);
});

// anticrash
process.on("unhandledRejection", async (err) => {
    console.log(err);
});

process.on("uncaughtException", async (err) => {
    console.log(err);
});

process.on("rejectionHandled", async (err) => {
    console.log(err);
});

process.on("warning", async (err) => {
    console.log(err);
});

(async () => {
    await Functions(bot);
    await Event(bot);
    await Command(bot);
    await Component(bot);
    await Mongo(bot);
    await Checks(bot);
})();

bot.start();

module.exports = bot;