const { Keyboard, InlineKeyboard } = require("grammy");
const { developers } = require("../../../config.json");

module.exports = {
    name: "callback_query",
    async execute(bot, ctx) {
        const { from, callbackQuery } = ctx;
        const data = callbackQuery.data;
        const component = bot.components.get(data);

        if (component) {
            try {
                await component.execute(bot, ctx);
            } catch (error) {
                console.error(`[CallbackHandler] Ошибка выполнения ${data}:`, error);
            };
        } else {
            if (data.startsWith("year_page_")) {
                let [, , page] = data.split("_");
                page = Number(page);
                if (page < 0 || page > 10) return ctx.answerCallbackQuery().catch();
                return bot.functions.sendYearSelection(bot, ctx, page);
            };

            if (data.startsWith("select_year_")) {
                const [, , year] = data.split("_");
                return bot.functions.sendMonthSelection(bot, ctx, year);
            };

            if (data.startsWith("select_month_")) {
                const [, , year, month] = data.split("_");
                return bot.functions.sendDaySelection(bot, ctx, year, month);
            };

            if (data.startsWith("select_day_")) {
                const [, , year, month, day] = data.split("_");

                const confirmKeyboard = new InlineKeyboard().text("Подтвердить", `confirm_birthday_${year}_${month}_${day}`).text("Отменить", `cancel_birthday_${year}_${month}_${day}`);
                return ctx.editMessageText(`Выбрана дата ${day.toString().padStart(2, "0")}.${(Number(month) + 1).toString().padStart(2, "0")}.${year}`, { reply_markup: confirmKeyboard, }).catch();
            };

            if (data.startsWith("confirm_birthday_")) {
                const [, , year, month, day] = data.split("_");

                const user = await bot.functions.updateOne("user", { uid: from.id }, {
                    $set: {
                        "birthday.year": Number(year),
                        "birthday.month": Number(month),
                        "birthday.day": Number(day)
                    }
                });

                const daysUntilTheBirthday = await bot.functions.daysUntilTheBirthday(bot, ctx);
                if (daysUntilTheBirthday) {
                    const replyKeyboard = new Keyboard()
                        .text("Изменить дату").text(`${user?.birthday?.notifications ? `Отключить` : `Включить`} уведомления`).row()
                        .text("Сколько дней до дня рождения?").row()
                        .text("Сколько дней со дня рождения?")
                        .resized();

                    await ctx.reply(daysUntilTheBirthday, {
                        reply_markup: {
                            keyboard: replyKeyboard.build(),
                        },
                    }).catch();
                };

                return bot.functions.sendDaySelection(bot, ctx, year, month, day);
            };

            if (data.startsWith("cancel_birthday_")) {
                const [, , year, month, day] = data.split("_");

                return bot.functions.sendDaySelection(bot, ctx, year, month, day);
            };

            if (data == "current_year") return bot.functions.sendYearSelection(bot, ctx.from.id, 5, ctx);


            return ctx.answerCallbackQuery("Неизвестная кнопка").catch();
        };
    }
};