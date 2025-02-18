const { InlineKeyboard } = require("grammy");

async function sendDaySelection(bot, ctx, year, month, day = null) {
    const keyboard = new InlineKeyboard();

    const months = bot.functions.getById(`date.months`);

    year = Number(year);
    month = Number(month);

    const prevMonth = month == 0 ? 11 : month - 1;
    const nextMonth = month == 11 ? 0 : month + 1;
    const prevYear = month == 0 ? year - 1 : year;
    const nextYear = month == 11 ? year + 1 : year;

    keyboard.text("⬅️", `select_month_${prevYear}_${prevMonth}`).text(`${year}, ${day ? `${day} ${months[month].toLowerCase()}` : `${months[month]}`}`, `select_year_${year}`).text("➡️", `select_month_${nextYear}_${nextMonth}`).row();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
        let d = day == i ? bot.functions.getById(`emojis.success`) : i.toString();
        keyboard.text(d, `select_day_${year}_${month}_${i}`);
        if (i % 8 == 0) keyboard.row();
    };

    await ctx.editMessageText(`Выберите день`, { reply_markup: keyboard }).catch();
};

module.exports = sendDaySelection;