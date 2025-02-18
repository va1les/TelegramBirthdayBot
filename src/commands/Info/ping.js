const { InlineKeyboard } = require("grammy");

module.exports = {
    data: {
        name: `ping`,
        description: `👤 Ping`,
    },
    options: {
        cooldown: 5,
    },
    async execute(bot, ctx) {
        const { message, from, chat, date } = ctx;

        const user = await bot.functions.findOne("user", { uid: from.id });

        const keyboard = new InlineKeyboard().text(bot.functions.getById(`emojis.error`), "delete_message");
        const birthday = (!user?.birthday?.year && !user?.birthday?.month && !user?.birthday?.day) ? `---` : `${user?.birthday?.day?.toString().padStart(2, "0")}.${(user?.birthday?.month + 1).toString().padStart(2, "0")}.${user?.birthday?.year}`
        const username = from?.username ? `@${from.username}` : 'Unknown User';
        const chatId = chat?.id;

        const content = `User: ${username}\nUserId: <code>${from?.id}</code>\nChatId: <code>${chatId}</code>\nMessageId: <code>${message?.message_id}</code>\n\nBirthday: ${birthday}`;
        return await ctx.reply(content, { reply_markup: keyboard, parse_mode: `HTML` }).catch();
    },
};