const bot = require("../../bot");

async function findOne(type, filter, create = true) {
    const user_data = await bot.db[type].findOne(filter);

    if (user_data) {
        return user_data;
    } else {
        return create ? await bot.db[type].create(filter) : null;
    };
};

module.exports = findOne;