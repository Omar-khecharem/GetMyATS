const { Router } = require('express');
const { analyze } = require('../controllers/atsController');

const router = Router();

router.post('/analyze', analyze);

module.exports = router;
