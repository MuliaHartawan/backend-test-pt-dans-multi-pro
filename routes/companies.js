const express = require('express');
const router = express.Router();

const companiessHandler = require('./handler/companies')

const verifyToken = require('../middleware/authMiddleware');

router.get('/', verifyToken, companiessHandler.companies);
router.post('/', verifyToken, companiessHandler.create);
router.get('/:id', verifyToken, companiessHandler.company);
router.put('/:id', verifyToken, companiessHandler.update);
router.delete('/:id', verifyToken, companiessHandler.delete);

module.exports = router;
