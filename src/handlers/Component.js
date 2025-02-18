const { readdir } = require("fs/promises");
const path = require("path");

module.exports = async (bot) => {
    const componentsBasePath = path.join(__dirname, "../components");

    for (const module of await readdir(componentsBasePath)) {
        const modulePath = path.join(componentsBasePath, module);
        const componentFiles = await readdir(modulePath);

        for (const componentFile of componentFiles) {
            if (!componentFile.endsWith('.js')) continue;
            try {
                const componentPath = path.join(modulePath, componentFile);
                const component = require(componentPath);

                if (!component.options) component.options = {};
                component.options.ownerOnly = component.options.ownerOnly ?? false;
                component.options.cooldown = component.options.cooldown ?? 10;

                bot.components.set(component.data.name, component);
            } catch (error) {
                console.error(`[ComponentHandler][${module}] Ошибка загрузки компонента ${componentFile}: ${error.message}`);
            };
        };
    }
};