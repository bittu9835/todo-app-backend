const notes = require('../../Models/notes');
const moment = require('moment');
const ServerResponseClass = require('../../ServerResponse/ServerResponse')
const response = new ServerResponseClass();

module.exports = {


  readTaskNotes: async (req, res) => {
    try {
      const note = await notes.find({ created_by: req.user._id, isDeleted: false, isCompleted: false })
      response.handleSuccess(res, note, "Data fetched")
    } catch (error) {
      console.log(error)
      response.somethingWentWrong(res, error)
    }
  },

  readEditTaskNotes: async (req, res) => {
    try {
      const note = await notes.findById(req.params);
      response.handleSuccess(res, note, "Data fetched")
    } catch (error) {
      console.log(error)
      response.somethingWentWrong(res, error)
    }
  },

  readMyDayNotes: async (req, res) => {
    try {
      const note = await notes.find({
        created_by: req.user._id,
        isDeleted: false,
        isCompleted: false,
        page: 'My Day'
      })
      response.handleSuccess(res, note, "Data fetched")
    } catch (error) {
      console.log(error)
      response.somethingWentWrong(res, error)
    }
  },

  readImportentNotes: async (req, res) => {
    try {
      const note = await notes.find({
        created_by: req.user._id,
        isDeleted: false,
        isCompleted: false,
        page: 'Importent'
      })
      response.handleSuccess(res, note, "Data fetched")
    } catch (error) {
      console.log(error)
      response.somethingWentWrong(res, error)
    }
  },

  readPlannedNotes: async (req, res) => {
    try {
      const note = await notes.find({
        created_by: req.user._id,
        isDeleted: false,
        isCompleted: false,
        page: 'Planned'
      })
      response.handleSuccess(res, note, "Data fetched")
    } catch (error) {
      console.log(error)
      response.somethingWentWrong(res, error)
    }
  },

  readCompletedTask: async (req, res) => {
    try {
      const note = await notes.find({ created_by: req.user._id, isDeleted: false, isCompleted: true })
      response.handleSuccess(res, note, "Data fetched")
    } catch (error) {
      console.log(error)
      response.somethingWentWrong(res, error)
    }
  },

  readSearchTask: async (req, res) => {
    try {
      const note = await notes.find({
        "$or": [
          { "tasks": { $regex: req.params.value } },
        ],
        created_by: req.user._id,
        isDeleted: false
      })
      response.handleSuccess(res, note, "Data fetched")
    } catch (error) {
      console.log(error)
      response.somethingWentWrong(res, error)
    }
  },

  readmydaycomplete: async (req, res) => {
    try {
      const note = await notes.find({
        created_by: req.user._id,
        isDeleted: false,
        isCompleted: true,
        page: 'My Day'
      })
      response.handleSuccess(res, note, "Data fetched")
    } catch (error) {
      console.log(error)
      response.somethingWentWrong(res, error)
    }
  },


  readRecyclebin: async (req, res) => {
    try {
      const note = await notes.find({ created_by: req.user._id, isDeleted: true })
      response.handleSuccess(res, note, "Data fetched")
    } catch (error) {
      console.log(error)
      response.somethingWentWrong(res, error)
    }
  },

  createNotes: async (req, res) => {
    try {
      let { _id } = req.user
      let { tasks, page, icon } = req.body;
      if (!tasks) {
        response.badRequest(res, '', ' Task is requred')
      } else {
        let note = await notes.create({
          tasks,
          page,
          icon,
          created_by: _id,
          createdAt: moment().format('ddd, MMMM D'),
          modifiedAt: moment().format('ddd, MMMM D')
        });
        response.handleSuccess(res, note, "Task created")
      }
    } catch (error) {
      console.log(error)
      response.somethingWentWrong(res, error)
    }
  },

  updateNotes: async (req, res) => {

    try {
      const note = await notes.findByIdAndUpdate(req.params, req.body)
      response.handleSuccess(res, note, "Task updated successfully")
    } catch (error) {
      console.log(error)
      response.somethingWentWrong(res, error)
    }
  },

  completedNotes: async (req, res) => {
    try {
      const { _id } = req.params
      const note = await notes.findByIdAndUpdate(_id, { isCompleted: true })
      response.handleSuccess(res, note, "Task Completed")
    } catch (error) {
      console.log(error)
      response.somethingWentWrong(res, error)
    }
  },



  checkoutNotes: async (req, res) => {
    try {
      const { _id } = req.params
      const note = await notes.findByIdAndUpdate(_id, { isCompleted: false })
      response.handleSuccess(res, note, "Task uncompleted")
    } catch (error) {
      console.log(error)
      response.somethingWentWrong(res, error)
    }
  },

  parmanentdeleteNotes: async (req, res) => {
    try {
      const { _id } = req.params
      const note = await notes.findByIdAndDelete(_id)
      response.handleSuccess(res, note, "Task Parmanently Deleted")
    } catch (error) {
      console.log(error)
      response.somethingWentWrong(res, error)
    }
  },

  parmanentdeleteAllNotes: async (req, res) => {
    try {
      const note = await notes.deleteMany({ created_by: req.user._id, isDeleted: true })
      response.handleSuccess(res, note, "All Task Parmanently Deleted")
    } catch (error) {
      console.log(error)
      response.somethingWentWrong(res, error)
    }
  },

  restoreNotes: async (req, res) => {
    try {
      const { _id } = req.params
      const note = await notes.findByIdAndUpdate(_id, { isDeleted: false })
      response.handleSuccess(res, note, "Task Restored")
    } catch (error) {
      console.log(error)
      response.somethingWentWrong(res, error)
    }
  },

  deletenote: async (req, res) => {
    try {
      const { _id } = req.params
      const note = await notes.findByIdAndUpdate(_id, { isDeleted: true })
      response.handleSuccess(res, note, "Task Trashed")
    } catch (error) {
      console.log(error)
      response.somethingWentWrong(res, error)
    }
  },

  parmanentdeleteAllNotes_user: async (req, res) => {
    try {
      const note = await notes.deleteMany({ created_by: req.user._id })
      response.handleSuccess(res, note, "All Task Parmanently Deleted")
    } catch (error) {
      console.log(error)
      response.somethingWentWrong(res, error)
    }
  },

}