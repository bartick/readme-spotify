const { 
    Sequelize 
} = require('sequelize');
const fs = require('fs');
const { 
    TIDB_HOST,
    TIDB_PORT, 
    TIDB_USER, 
    TIDB_PASSWORD, 
    TIDB_DB_NAME, 
    TIDB_ENABLE_SSL,
    TIDB_CA_PATH
} = require('../utils/config');

const { getLogger } = require('../utils/logger');
const logger = getLogger('database/index');

const initSequelize = () => {
    const sequelize = new Sequelize({
        dialect: 'mysql',
        host: TIDB_HOST || 'localhost',
        port: TIDB_PORT || 4000,
        username: TIDB_USER || 'root',
        password: TIDB_PASSWORD || 'root',
        database: TIDB_DB_NAME || 'test',
        dialectOptions: {
            ssl: TIDB_ENABLE_SSL === 'true' 
                ? {
                    require: true,
                    rejectUnauthorized: false,
                    ca: TIDB_CA_PATH ? fs.readFileSync(TIDB_CA_PATH) : null
                }
                : null
        },
        logging: false
    });
    
    return sequelize;
};

const getSequelize = async () => {
    const sequelize = initSequelize();
    try {
        await sequelize.authenticate();
        logger.info('Connection has been established successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:');
        logger.error(error);
        throw error;
    }
    return sequelize;
}

const closeConnection = async (sequelize) => {
    try {
        await sequelize.close();
        logger.info('Connection has been closed successfully.');
    } catch (error) {
        logger.error('Unable to close the database:');
        logger.error(error);
        throw error;
    }
}

module.exports = {
    getSequelize,
    initSequelize,
    closeConnection
};