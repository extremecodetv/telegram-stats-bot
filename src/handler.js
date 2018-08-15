const { bot } = require('./config');
const log = require('./util/logger')(module);
const {
    Profile,
    Chat,
    Activity
} = require('./models');

const transform = (data) => {
    data.telegram_id = data.id;
    delete data.id;
    return data;
};

const transformChat = (data, info, count) => {
    data.telegram_id = data.id;
    data.count = count;
    data.username = info.username;
    data.description = info.description;
    if (info.photo) {
        data.photo_id = info.photo.big_file_id;
    }

    delete data.id;
    return data;
};

const getChat = async (telegramChat) => {
    let chat = await Chat.findOne({
        where: {
            telegram_id: telegramChat.id
        }
    });

    if (!chat) {
        const info = await bot.getChat(telegramChat.id);
        const count = await bot.getChatMembersCount(telegramChat.id);
        const transformed = transformChat(telegramChat, info, count);

        chat = await Chat.create(transformed);
    }

    return chat;
};

const getProfile = async (msg, chat) => {
    let profile = await Profile.getCurrentChatProflie(msg.from.id, chat.id);

    if (!profile) {
        profile = await Profile.create(transform(msg.from));
    }

    if (!profile.ChatUsers || profile.ChatUsers.length === 0) {
        profile.ChatUsers = [];
        const chatUser = await chat.createChatUser({
            profile_id: profile.id
        });
        profile.ChatUsers.push(chatUser);
    }

    const chatUser = profile.ChatUsers[0];
    if (!chatUser.Activity) {
        chatUser.Activity = await Activity.create({
            profile_id: chatUser.profile_id,
            chat_user_id: chatUser.id
        });
    }

    return profile;
};

const countAndSave = async (message, activity) => {
    if (message.text && message.entities) {
        const entityType = message.entities.shift().type;
        if (entityType === 'url') {
            activity.links += 1;
        } else if (entityType === 'bot_command') {
            activity.commands += 1;
        }
    } else if (message.text) {
        activity.messages += 1;
    }

    if (message.photo) {
        activity.images += 1;
    }

    if (message.sticker) {
        activity.stickers += 1;
    }

    if (message.voice) {
        activity.voices += 1;
    }

    if (message.audio) {
        activity.audios += 1;
    }

    if (message.document) {
        activity.files += 1;
    }

    return activity.save();
};

exports.handle = async (msg) => {
    try {
        const chat = await getChat(msg.chat);
        const profile = await getProfile(msg, chat);
        const activity = profile.ChatUsers.shift().Activity;
        await countAndSave(msg, activity);
    } catch (err) {
        log.error(err);
    }

    return true;
};