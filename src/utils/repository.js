const {
    Op
} = require('sequelize');

const {
    getSequelize,
    closeConnection
} = require('../database/index');
const AccountsModel = require('../database/models/accounts');

const main = async () => {
    const sequelize = await getSequelize();
    const Accounts = AccountsModel(sequelize);
    await Accounts.sync({});

    const close = async () => {
        await closeConnection(sequelize);
    };

    const create = async (username, refreshToken) => {
        const account = await Accounts.create({
            username,
            refreshToken
        });
        return account;
    }

    const fetch = async (username) => {
        const account = await Accounts.findOne({
            where: {
                username
            }
        });
        return account;
    }

    const fetchAll = async () => {
        const accounts = await Accounts.findAll();
        return accounts;
    }

    const update = async (username, refreshToken) => {
        const account = await Accounts.update({
            refreshToken
        }, {
            where: {
                username
            }
        });
        return account;
    }

    const _delete = async (username) => {
        const account = await Accounts.destroy({
            where: {
                username
            }
        });
        return account;
    }

    const deleteAll = async () => {
        const accounts = await Accounts.destroy({
            where: {
                username: {
                    [Op.ne]: null
                }
            }
        });
        return accounts;
    }

    return {
        create,
        fetch,
        fetchAll,
        update,
        delete: _delete,
        deleteAll,
        close
    };


};

module.exports = main;