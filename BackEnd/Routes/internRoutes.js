const express = require('express');
const router = express.Router();
const internController = require('../Controllers/interController');
const { authMiddleware, allwedTo } = require('../Middlewares/authMiddleware');

router.get('/', internController.getAllInterns);
router.get('/:id', internController.getInternById);
router.post('/', authMiddleware, internController.createIntern);
router.delete('/:id', authMiddleware, internController.deleteIntern);
router.patch('/:id', authMiddleware, internController.updateIntern);

module.exports = router;