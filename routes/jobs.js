const express = require('express');
const router = express.Router();

const jobsHandler = require('./handler/jobs')

const verifyToken = require('../middleware/authMiddleware');

router.get('/', verifyToken, jobsHandler.companies);
router.post('/', verifyToken, jobsHandler.create);
router.get('/:id', verifyToken, jobsHandler.company);
router.put('/:id', verifyToken, jobsHandler.update);
router.delete('/:id', verifyToken, jobsHandler.delete);

module.exports = router;
