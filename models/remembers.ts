import { Schema, model } from 'mongoose';

const RemembrSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    date: {
        type: Date,
        default: Date.now
    }, done: {
        type: Boolean,
        default: false
    }
})

export const Remembr = model('Remembr', RemembrSchema)