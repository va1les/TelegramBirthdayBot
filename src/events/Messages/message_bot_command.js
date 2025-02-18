const { developers } = require("../../../config.json");

module.exports = {
	name: 'message::bot_command',
	async execute(bot, ctx) {
		const { message, from, chat } = ctx;
		const { commands, cooldowns } = bot;

		const commandName = message.text.split(' ')[0].slice(1);
		const command = commands.get(commandName);

		if (!command) return;
		if (!cooldowns.has(commandName)) cooldowns.set(commandName, new Map());
		if (command.options && command.options.ownerOnly && !developers.includes(from.id)) return ctx.reply("Эта команда доступна только для владельца.").catch();

		const now = Date.now();
		const timestamps = cooldowns.get(commandName);
		const cooldownAmount = (command.options?.cooldown ?? 5) * 1000;

		if (timestamps.has(from.id)) {
			const expirationTime = timestamps.get(from.id) + cooldownAmount;
			const now = Date.now();

			if (now < expirationTime) {
				const expiredTimestamp = Math.round(expirationTime / 1000);
				const timeLeft = expiredTimestamp - Math.round(now / 1000);

				return await ctx.reply(`${bot.functions.getById(`emojis.error`)} Попробуйте снова через ${timeLeft} секунд.`).then(async (reply) => {
					setTimeout(() => {
						ctx.api.deleteMessage(reply.chat.id, reply.message_id).catch();
					}, timeLeft * 1000);
				}).catch();
			};
		};

		timestamps.set(from.id, now);
		setTimeout(() => timestamps.delete(from.id), cooldownAmount);

		try {
			await command.execute(bot, ctx);
		} catch (error) {
			console.error(error);
			return ctx.reply("Произошла ошибка при выполнении команды.");
		};
	}
};