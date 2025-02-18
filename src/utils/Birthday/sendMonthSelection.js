const { InlineKeyboard } = require("grammy");

async function sendMonthSelection(bot, ctx, year) {
    const keyboard = new InlineKeyboard();

    year = Number(year);
    keyboard.text("⬅️", `select_year_${year - 1}`).text(`${year}`, `current_year`).text("➡️", `select_year_${year + 1}`).row();

    const months = bot.functions.getById(`date.months`);

    for (let i = 0; i < 12; i++) {
        keyboard.text(months[i], `select_month_${year}_${i}`);
        if ((i + 1) % 4 === 0) keyboard.row();
    };

    await ctx.editMessageText(`Выберите месяц`, { reply_markup: keyboard }).catch();
};

module.exports = sendMonthSelection;