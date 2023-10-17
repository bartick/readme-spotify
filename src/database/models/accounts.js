const {
    DataTypes,
    Model
} = require('sequelize');

class Accounts extends Model {}

const initModel = (sequelize) => {
    Accounts.init({
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
            comment: 'This is the github username of users'
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize: sequelize,
        modelName: 'Accounts',
    })

    return Accounts;
}

module.exports = initModel;