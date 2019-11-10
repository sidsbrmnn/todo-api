require('express-async-errors');

module.exports = function() {
    process.on('uncaughtException', ex => {
        console.log(`${ex.name}: ${ex.message}`);

        process.exit(1);
    });

    process.on('unhandledRejection', ex => {
        throw new Error(ex);
    });
};
