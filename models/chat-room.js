'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberShips = new Schema({
    userId: Schema.ObjectId
});

const chatRoomSchema = new Schema({
    name: String,
    members: [memberShips]
}, {
    timestamps: true
});

Object.assign(chatRoomSchema.statics, {

    findByUserId(userId) {
        return this.find({
            'members.userId': userId
        })
    },

    findById(_id) {
        return this.findOne({
            _id
        })
    },

    deleteById(_id) {
        return this.remove({_id});
    },

    leave(userId) {
        return this.members.remove({userId});
    },

    kickUserById(userId) {
        const query = {
            'members.userId': userId
        };

        return this.find(query)
            .cursor().eachAsync(async (chatRoom) => {
                await chatRoom.leave(userId);

                await chatRoom.save();
            });
    }

});

Object.assign(chatRoomSchema.methods, {});

module.exports = mongoose.model('ChatRoom', chatRoomSchema);
