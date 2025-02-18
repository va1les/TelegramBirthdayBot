async function daysSinceTheBirthday(bot, ctx) {
    const { message, from, chat } = ctx;

    const user = await bot.functions.findOne("user", { uid: from.id });

    if (!user?.birthday?.year && !user?.birthday?.month && !user?.birthday?.day) {
        await bot.functions.sendYearSelection(bot, ctx, 5);
        return null;
    };

    const { year, month, day } = user.birthday;
    const now = new Date();
    const birthDate = new Date(year, month, day);

    let content;

    if (birthDate > now) {
        const daysUntilBirth = Math.ceil((birthDate - now) / (1000 * 60 * 60 * 24));
        content = `Вы родитесь через ${daysUntilBirth} ${bot.functions.getDaysText(daysUntilBirth)}! 🎉`;
    };

    const currentYear = now.getFullYear();
    let lastBirthday = new Date(currentYear, month, day);
    if (lastBirthday > now) lastBirthday.setFullYear(currentYear - 1);

    const daysPassed = Math.floor((now - lastBirthday) / (1000 * 60 * 60 * 24));

    content = `С последнего дня рождения прошло ${daysPassed} ${bot.functions.getDaysText(daysPassed)}! 🎉`;
    return content;
};

module.exports = daysSinceTheBirthday;