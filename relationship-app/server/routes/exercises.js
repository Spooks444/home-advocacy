const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const EXERCISES_DIR = path.join(__dirname, '../../content/exercises');

function listExercises() {
  if (!fs.existsSync(EXERCISES_DIR)) return [];
  return fs.readdirSync(EXERCISES_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const content = fs.readFileSync(path.join(EXERCISES_DIR, file), 'utf8');
      const titleMatch = content.match(/^#\s+(.+)$/m);
      return { id: slug, title: titleMatch ? titleMatch[1] : slug, kind: 'guided_exercise' };
    });
}

router.get('/', (req, res) => req.safeRespond(res, 200, listExercises()));
router.get('/:slug', (req, res, next) => {
  try {
    const filePath = path.join(EXERCISES_DIR, req.params.slug + '.md');
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'NOT_FOUND' });
    const content = fs.readFileSync(filePath, 'utf8');
    req.safeRespond(res, 200, { id: req.params.slug, content });
  } catch (err) { next(err); }
});

module.exports = router;
