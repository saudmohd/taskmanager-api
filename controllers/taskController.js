import Task from '../models/task.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// Get directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage }).single('attachment');

export const getAllTasks = async (req, res, next) => {
  try {
    const { status, from, to } = req.query;
    const filter = { user: req.userId };
    
    if (status) filter.status = status;
    if (from && to) {
      filter.dueDate = {
        $gte: new Date(from),
        $lte: new Date(to)
      };
    }
    
    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const task = new Task({
      title,
      description,
      status,
      dueDate,
      user: req.userId
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { title, description, status, dueDate },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const uploadAttachment = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: 'File upload failed' });
    }
    
    try {
      const task = await Task.findOneAndUpdate(
        { _id: req.params.id, user: req.userId },
        { attachment: req.file.path },
        { new: true }
      );
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      next(error);
    }
  });
};

export const exportTasksToCSV = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.userId });
    
    let csv = 'Title,Description,Status,Due Date\n';
    tasks.forEach(task => {
      csv += `"${task.title}","${task.description || ''}",${task.status},${task.dueDate || ''}\n`;
    });
    
    res.header('Content-Type', 'text/csv');
    res.attachment('tasks.csv');
    res.send(csv);
  } catch (error) {
    next(error);
  }
};