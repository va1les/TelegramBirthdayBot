const { Keyboard } = require("grammy");

module.exports = {
    name: 'message:text',
    async execute(bot, ctx) {
        const { message, from, chat } = ctx;
        const text = message.text;

        if (text == `Изменить дату`) {
            return await bot.functions.sendYearSelection(bot, ctx, 5);
        };

        if (text == `Сколько дней до дня рождения?`) {
            const daysUntilTheBirthday = await bot.functions.daysUntilTheBirthday(bot, ctx);
            return await ctx.reply(daysUntilTheBirthday).catch();
        };

        if (text == `Сколько дней со дня рождения?`) {
            const daysSinceTheBirthday = await bot.functions.daysSinceTheBirthday(bot, ctx, ctx);
            return await ctx.reply(daysSinceTheBirthday).catch();
        };

        if (text == `Включить уведомления`) {
            await bot.functions.updateOne("user", { uid: from.id }, { $set: { "birthday.notifications": true } });

            const replyKeyboard = new Keyboard()
                .text("Изменить дату").text("Отключить уведомления").row()
                .text("Сколько дней до дня рождения?").row()
                .text("Сколько дней со дня рождения?")

            return await ctx.reply(`Уведомления включены`, {
                reply_markup: {
                    keyboard: replyKeyboard.build(),
                },
            }).catch();
        };

        if (text == `Отключить уведомления`) {
            await bot.functions.updateOne("user", { uid: from.id }, { $set: { "birthday.notifications": false } });

            const replyKeyboard = new Keyboard()
                .text("Изменить дату").text("Включить уведомления").row()
                .text("Сколько дней до дня рождения?").row()
                .text("Сколько дней со дня рождения?")

            return await ctx.reply(`Уведомления отключены`, {
                reply_markup: {
                    keyboard: replyKeyboard.build(),
                },
            }).catch();
        };
    },
};