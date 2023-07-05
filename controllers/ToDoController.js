const ToDoModel = require("../models/ToDoModel");

module.exports.getToDo = async (req, res) => {
    try {
        const todo = await ToDoModel.find().select('text');
        res.send(todo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};
module.exports.saveToDo = (req, res) => {
    const { text } = req.body;

    ToDoModel
        .create({ text })
        .then((data) => {
            console.log("Added Successfully...")
            console.log(data)
            res.send(data)
        })
        .catch((err) => console.log(err));
}

module.exports.deleteToDo = (req, res) => {
    const { _id } = req.body;

    console.log('id ---> ', _id);

    ToDoModel
        .findByIdAndDelete(_id)
        .then(() => res.set(201).send("Deleted Successfully..."))
        .catch((err) => console.log(err));
}

module.exports.updateToDo = (req, res) => {
    const { _id, text } = req.body;

    ToDoModel.findByIdAndUpdate(_id, { text }, { new: true })
        .then(updatedTodo => {
            if (!updatedTodo) {
                return res.status(404).send('ToDo not found');
            }
            res.status(201).send(updatedTodo);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Internal Server Error');
        });
};