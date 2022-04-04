import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        require: true
    },
    name: String,
    password: {
        type: String,
        require: true
    },
    avatarUrl: String,
    resetToken: String,
    resetTokenExp: Date,
    tasks: {
        items: [
            {
                remembrId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Remembr',
                    require: true
                }
            }
        ]
    }
})

UserSchema.methods.addTask = function (remembr) {
    const items = [...this.tasks.items]

    try {
        items.push({
            remembrId: remembr._id
        })
    } catch (err) {
        console.log(err)
    }

    this.tasks = { items }

    return this.save();
}

UserSchema.methods.removeTask = function (id) {
    console.log('remove?')
    let items = [...this.tasks.items]

    items = items.filter(c => c.remembrId.toString() !== id.toString())

    this.tasks = { items }

    return this.save();
}

export const User = model('Users', UserSchema)