function getById(name) {
    const data = {
        emojis: {
            success: "✅",
            warn: "⚠",
            error: "❌",
            stats: "📊",
        },
        colors: {
            default: 2829617
        },
        date: {
            msk: new Date().toLocaleTimeString('ru', { timeZone: 'Europe/Moscow', timeStyle: 'short' }),// 20:00 (пример)
            months: [
                "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
            ],
        },
    };

    const parts = name.split('.');
    let w = data;
    for (let part of parts) {
        if (w[part] != undefined) {
            w = w[part];
        } else {
            return data.error;
        };
    };

    return w;
};

module.exports = getById;