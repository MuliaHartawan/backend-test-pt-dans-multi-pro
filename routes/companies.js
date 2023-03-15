const express = require('express');
const router = express.Router();

const companiesHandler = require('./handler/companies')

const verifyToken = require('../middleware/authMiddleware');

router.get('/', verifyToken, companiesHandler.companies);
router.post('/', verifyToken, companiesHandler.create);
router.get('/:id', verifyToken, companiesHandler.company);
router.put('/:id', verifyToken, companiesHandler.update);
router.delete('/:id', verifyToken, companiesHandler.delete);

module.exports = router;
