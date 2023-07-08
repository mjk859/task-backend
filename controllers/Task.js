import Task from '../models/Task.js';
import User from '../models/User.js';


// task creation
export const createTask = async (req, res) => {
    const { title, description, dueDate, status, assignedUser, userId } = req.body;

    try {
       const existingUser = await User.findOne({ _id: userId });
       if(!existingUser) {
        return res.status(404).json({ message: "not a valid user"});
       }

       const newTask = await Task.create({
        title,
        description,
        dueDate,
        status,
        assignedUser,
        userId
       })

       res.status(200).json({ newTask });
    } catch (error) {
        console.log(error)
    }
}

// get all task 
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json({tasks});
    } catch (error) {
        console.log(error)
    }
}

// get a single task
export const getTask = async (req, res) => {
    try {
        const task = await Task.find({_id: req.params.id});
        res.status(200).json({task});
    } catch (error) {
        console.log(error)
    }
}

// edit task
export const updateTask = async (req, res) => {
    try {
        const upadteTask = await Posts.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updateTask);
      } catch (error) {
        res.status(500).json(error);
      }
}

// delete task
export const deleteTask = async (req, res) => {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.status(200).json("Task has been deleted...");
    } catch (error) {
      res.status(500).json(error);
    }
  };