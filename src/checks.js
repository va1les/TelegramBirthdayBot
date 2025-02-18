const cron = require('node-cron');

module.exports = async (bot) => {
    cron.schedule('* * * * *', async () => {
        try {
            const users = await bot.db.user.find();

            for (let user of users) {
                const user_data = await bot.functions.findOne("user", { uid: user.uid }, false);

                if (user_data?.birthday?.notifications && !user_data?.birthday?.notified) {
                    const daysUntilTheBirthday = await bot.functions.daysUntilTheBirthday(bot, { from: { id: user.uid } }, false);

                    await bot.api.sendMessage(user.uid, daysUntilTheBirthday).then(async _ => {
                        console.log(`[${bot.functions.getById(`date.msk`)}] Reminder sent to user `.gray + `${user.uid}`.yellow.bold);
                        await bot.functions.updateOne("user", { uid: user.uid }, { "birthday.notified": true });
                    });
                };
            };
        } catch (error) {
            console.log(error)
        };
    });

    cron.schedule('0 0 * * *', async () => {
        try {
            console.log(`[${bot.functions.getById(`date.msk`)}][notified] The reset has started`.yellow.bold);
            await bot.db.user.updateMany({}, { $set: { "birthday.notified": false } });
            console.log(`[${bot.functions.getById(`date.msk`)}][notified] The reset is finished`.green.bold);
        } catch (error) {
            console.log(`[${bot.functions.getById(`date.msk`)}][notified] Reset error:`.red.bold + `${error.message}`)
        };
    });
};