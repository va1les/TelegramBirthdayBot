const { InlineKeyboard } = require("grammy");

async function sendYearSelection(bot, ctx, page = 5) {
    const startYear = 1901 + page * 20;
    const endYear = startYear + 19;

    const keyboard = new InlineKeyboard();

    keyboard.text("⬅", `year_page_${page - 1}`).text("➡", `year_page_${page + 1}`).row();
    for (let i = startYear; i <= endYear; i++) {
        const year_btn = keyboard.text(i.toString(), `select_year_${i}`);
        if (i % 5 == 0) year_btn.row();
    };

    return await ctx.editMessageText("Выберите год своего рождения", { reply_markup: keyboard }).catch(async () => {
        return await ctx.reply("Выберите год своего рождения", { reply_markup: keyboard }).catch();
    });
};

module.exports = sendYearSelection;