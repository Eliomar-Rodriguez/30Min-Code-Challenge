const dataStore = []
let currentTaskId = 1

const getTasks = (req, res) => {
  try {
    res.json({ data: [...dataStore] })
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error en el servidor' })
  }
}

const postTasks = (req, res) => {
  try {
    const { title, completed } = req.body
    if (!title || typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'Title is required and completed must be a true or false value' })
    }
    const newTask = {
      id: currentTaskId,
      title,
      completed
    }
    dataStore.push(newTask)
    currentTaskId++
    res.json({ data: [...dataStore] })
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error en el servidor' })
  }
}

const putTasks = (req, res) => {
  try {
    const taskIdToUpdate = parseInt(req?.params?.id)
    const { title, completed } = req.body
    const taskItem = dataStore.find(task => task.id === taskIdToUpdate)
    if (!taskItem) {
      return res.status(404).json({ error: `Task not found with id ${taskIdToUpdate}` })
    }
    const taskItemIndex = dataStore.findIndex(task => task.id === taskIdToUpdate)

    if (title) {
      taskItem.title = title
    }
    if (typeof completed === 'boolean') {
      taskItem.completed = completed
    }

    dataStore[taskItemIndex] = taskItem

    res.json({ message: 'Task updated', data: [...dataStore] })
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error en el servidor' })
  }
}

const deleteTask = (req, res) => {
  try {
    const taskIdToUpdate = parseInt(req?.params?.id)
    const taskItemIndex = dataStore.findIndex(task => task.id === taskIdToUpdate)
    if (taskItemIndex === -1) {
      return res.status(404).json({ error: `Task not found with id ${taskIdToUpdate}` })
    }
    const deletedTask = dataStore.splice(taskItemIndex, 1)
    console.log('Deleted task: ' + deletedTask)
    res.json({ message: 'Task deleted successfuly', data: [...dataStore] })
  } catch (error) {
    res.status(500).json({ error: 'Ocurrió un error en el servidor' })
  }
}

module.exports = {
  getTasks,
  postTasks,
  putTasks,
  deleteTask
}
