module.exports = {
    data: {
        name: "delete_message",
    },
    async execute(bot, ctx) {
        await ctx.deleteMessage().catch();
    },
};