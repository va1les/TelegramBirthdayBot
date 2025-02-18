const { Keyboard } = require("grammy");

module.exports = {
    data: {
        name: `start`,
        description: `🔁 Restart`,
    },
    options: {
        cooldown: 5,
    },
    async execute(bot, ctx) {
        const { message, from, chat } = ctx;

        const user = await bot.functions.findOne("user", { uid: from.id });
        const replyKeyboard = new Keyboard()
            .text("Изменить дату").text(`${user?.birthday?.notifications ? `Отключить` : `Включить`} уведомления`).row()
            .text("Сколько дней до дня рождения?").row()
            .text("Сколько дней со дня рождения?")
            .resized();

        const daysUntilTheBirthday = await bot.functions.daysUntilTheBirthday(bot, ctx);
        if (!daysUntilTheBirthday) return;

        return await ctx.reply(daysUntilTheBirthday, {
            reply_markup: {
                keyboard: replyKeyboard.build(),
            },
        }).catch();
    },
};