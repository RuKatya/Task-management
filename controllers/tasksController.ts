import color from 'colors';

//MODEL
import { User } from '../models/user';
import { Remembr } from '../models/remembers';

function mapTasksItems(tasks) {
    return tasks.items.map(c => ({
        ...c.remembrId._doc,
        id: c.remembrId.id,
    }))
}

function isOwner(task, req) {
    return task.userId.toString() === req.user._id.toString();
}

//GET TASKS
export const handleGetAllTasks = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        const usertask = await req.user
            .populate('tasks.items.remembrId')
            .execPopulate()

        const tasks = mapTasksItems(usertask.tasks)

        res.render('remembers', {
            title: 'Tasks',
            user,
            tasks
        })
    } catch (err) {
        console.log(color.bgRed.white(err))
    }
}

//ADD TASK
export const handleAddTask = async (req, res) => {
    console.log(req.body)
    console.log(req.user)

    const remembr = new Remembr({
        text: req.body.remembr,
        userId: req.user,
    });

    try {
        await remembr.save();
        await req.user.addTask(remembr)
        res.redirect('/remembers')
    } catch (err) {
        console.log(color.bgRed.white(err))
        res.redirect('/remembers')
    }
}
