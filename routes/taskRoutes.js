import express from 'express';
import {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  uploadAttachment,
  exportTasksToCSV
} from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getAllTasks);
router.post('/', createTask);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.post('/:id/attachment', uploadAttachment);
router.get('/export/csv', exportTasksToCSV);

export default router;