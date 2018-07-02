module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('Profile', {
        telegram_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [1, 150]
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: ''
        },
        username: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        }
    }, {
        underscored: true,
        timestamps: true,
        tableName: 'profiles'
    });

    Profile.getCurrentChatProflie = async (telegramUserId, chatId) => {
        const { ChatUser, Activity } = require('./');
        return Profile.findOne({
            where: {
                telegram_id: telegramUserId
            },
            include: [{
                model: ChatUser,
                required: false,
                where: {
                    chat_id: chatId
                },
                include: [{
                    model: Activity,
                    required: false,
                    where: {
                        date: Date.now()
                    }
                }]
            }]
        });
    };

    Profile.associate = (models) => {
        Profile.hasMany(models.ChatUser);
        Profile.hasMany(models.Activity);
    };

    return Profile;
};
