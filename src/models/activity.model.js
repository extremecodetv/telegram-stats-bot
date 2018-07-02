module.exports = (sequelize, DataTypes) => {
    const Activity = sequelize.define('Activity', {
        profile_id: {
            type: DataTypes.INTEGER
        },
        chat_user_id: {
            type: DataTypes.INTEGER
        },
        messages: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        audios: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        voices: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        files: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        links: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        images: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        stickers: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        commands: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        underscored: true,
        timestamps: false,
        tableName: 'activities'
    });

    Activity.associate = (models) => {
        Activity.belongsTo(models.Profile);
        Activity.belongsTo(models.ChatUser);
    };

    return Activity;
};
