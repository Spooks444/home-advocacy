const express = require('express');
const router = express.Router();
router.get('/', (req, res) => res.json([{ id: 'ex_1', title: 'Reflection prompt', kind: 'text' }]));
module.exports = router;
