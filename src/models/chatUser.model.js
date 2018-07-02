module.exports = (sequelize, DataTypes) => {
    const ChatUser = sequelize.define('ChatUser', {
        is_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        joined: {
            type: DataTypes.DATEONLY,
            defaultValue: DataTypes.NOW
        }
    }, {
        underscored: true,
        timestamps: false,
        tableName: 'chat_users'
    });

    ChatUser.associate = (models) => {
        ChatUser.belongsTo(models.Chat);
        ChatUser.belongsTo(models.Profile);
        ChatUser.hasOne(models.Activity);
    };

    ChatUser.hook('afterCreate', async (chatUser, options) => {
        const { Activity } = require('./');
        const activity = await Activity.create({
            profile_id: chatUser.profile_id,
            chat_user_id: chatUser.id
        });
        chatUser.Activity = activity;
        return chatUser;
    });

    return ChatUser;
};
