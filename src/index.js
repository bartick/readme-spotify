const app = require('./main');
const {
    PORT
} = require('./utils/config');
const database = require('./utils/repository');

const server = database().then(connection => {
    app.set('database', connection)
    return app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})

process.on('SIGINT', async () => {
    const database = app.get('database');
    await database.close();
    (await server).close();
})