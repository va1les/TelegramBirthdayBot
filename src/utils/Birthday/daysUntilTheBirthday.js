async function daysUntilTheBirthday(bot, ctx, flag = true) {
    const { from } = ctx;

    const user = await bot.functions.findOne("user", { uid: from.id });

    if (!user?.birthday?.year && !user?.birthday?.month && !user?.birthday?.day && flag) {
        await bot.functions.sendYearSelection(bot, ctx, 5);
        return null;
    } else if (!user?.birthday?.year && !user?.birthday?.month && !user?.birthday?.day && !flag) {
        return `Установите дату рождения — /start`;
    };

    const { year, month, day } = user.birthday;

    const now = new Date();
    const currentYear = now.getFullYear();

    let birthdayThisYear = new Date(currentYear, month, day);
    if (birthdayThisYear < now) birthdayThisYear.setFullYear(currentYear + 1);

    const timeDiff = birthdayThisYear - now;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    let content;
    if (daysLeft == 0 || daysLeft == 365) {
        content = `Ваш день рождения сегодня 🎉🎉🎉`;
    } else if (daysLeft == 1) {
        content = `Готовьтесь, ваш день рождения завтра!`;
    } else {
        content = `До вашего дня рождения осталось ${daysLeft} ${bot.functions.getDaysText(daysLeft)}! 🎉`;
    };

    return content;
};

module.exports = daysUntilTheBirthday;