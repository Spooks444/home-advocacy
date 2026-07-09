const express = require('express');
const router = express.Router();
router.get('/', (req, res) => res.json([{ id: 'res_1', title: 'Communication guidelines', kind: 'article' }]));
module.exports = router;
