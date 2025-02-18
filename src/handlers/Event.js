const { readdir } = require("fs/promises");
const path = require("path");

module.exports = async (bot) => {
	const eventsBasePath = path.join(__dirname, "../events");

	for (const folder of await readdir(eventsBasePath)) {
		const folderPath = `${eventsBasePath}/${folder}`;

		for (const file of await readdir(folderPath)) {
			try {
				const eventPath = path.join(folderPath, file);
				const event = require(eventPath);

				bot.on(event.name, (...args) => event.execute(bot, ...args));
			} catch (error) {
				console.error(`[EventHandler] Error loading event from ${file}: ${error.message}`);
			};
		};
	}
};