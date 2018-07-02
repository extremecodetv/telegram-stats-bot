const uuid = require('uuid/v4');

module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define('Chat', {
        alias: {
            type: DataTypes.UUID
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        telegram_id: {
            type: DataTypes.BIGINT,
            unique: true,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING
        },
        photo_id: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        count: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        type: {
            type: DataTypes.STRING,
            defaultValue: 'group',
            allowNull: false
        }
    }, {
        underscored: true,
        timestamps: false,
        tableName: 'chats'
    });

    Chat.associate = (models) => {
        Chat.hasMany(models.ChatUser);
    };

    Chat.hook('beforeCreate', (chat, options) => {
        chat.alias = uuid();
    });

    return Chat;
};
