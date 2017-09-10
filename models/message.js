'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    text: String,
    authorId: Schema.ObjectId,
    chatRoomId: Schema.ObjectId
}, {
    timestamps: true
});

Object.assign(messageSchema.statics, {

    findByAuthorId(authorId) {
        return this.findOne({
            authorId
        })
    },

    findById(_id) {
        return this.findOne({
            _id
        })
    },

    findByChatRoomId(chatRoomId) {
        return this.findOne({
            chatRoomId
        })
    },

    deleteById(_id) {
        return this.remove({_id});
    }

});

Object.assign(messageSchema.methods, {});

module.exports = mongoose.model('Message', messageSchema);
