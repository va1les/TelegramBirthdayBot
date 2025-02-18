const { readdir } = require("fs/promises");
const path = require("path");

module.exports = async (bot) => {
	const commandsBasePath = path.join(__dirname, "../commands");

	for (const module of await readdir(commandsBasePath)) {
		const modulePath = path.join(commandsBasePath, module);
		const commandFiles = await readdir(modulePath);

		for (const commandFile of commandFiles) {
			if (!commandFile.endsWith('.js')) continue;
			try {
				const commandPath = path.join(modulePath, commandFile);

				const command = require(commandPath);

				if (!command.options) command.options = {};
				command.options.ownerOnly = command.options.ownerOnly ?? false;
				command.options.cooldown = command.options.cooldown ?? 10;

				bot.commands.set(command.data.name, command);
			} catch (error) {
				console.error(`[CommandHandler][${module}] Error loading a command from ${commandFile}: ${error.message}`);
			};
		};

		const commandsArray = [];
		Array.from(bot.commands).map(([name, command]) => {
			commandsArray.push({ command: command.data.name, description: command?.data?.description || 'Описание отсутствует' });
		});

		commandsArray.sort((a, b) => {
			if (a.command === 'start') return -1;
			if (b.command === 'start') return 1;
			return 0;
		});

		bot.api.setMyCommands(commandsArray);
	};
};