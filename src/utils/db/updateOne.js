const bot = require("../../bot");

async function updateOne(type, filter, data, options = {}, old = false) {
    old = await bot.functions.findOne(type, filter);

    const new_data = await bot.db[type].findOneAndUpdate(
        filter,
        data,
        { returnDocument: "after", upsert: true, setDefaultsOnInsert: true, ...options },
    );

    new_data.old = old;

    return new_data
};

module.exports = updateOne;