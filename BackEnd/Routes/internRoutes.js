const express = require('express');
const router = express.Router();
const internController = require('../Controllers/interController');
const { authMiddleware, allwedTo, allowedTo } = require('../Middlewares/authMiddleware');

router.get('/', internController.getAllInterns);
router.get('/:id', internController.getInternById);
router.post('/', authMiddleware, allowedTo('superAdmin', 'cvAdmin'), internController.createIntern);
router.delete('/:id', authMiddleware, internController.deleteIntern);
router.patch('/:id', authMiddleware, allowedTo('superAdmin', 'cvAdmin'), internController.updateIntern);

module.exports = router;