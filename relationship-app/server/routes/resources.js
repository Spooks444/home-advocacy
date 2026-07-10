const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const RESOURCES_DIR = path.join(__dirname, '../../content/resources');

function listResources() {
  if (!fs.existsSync(RESOURCES_DIR)) return [];
  return fs.readdirSync(RESOURCES_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.md$/, '');
      const content = fs.readFileSync(path.join(RESOURCES_DIR, file), 'utf8');
      const titleMatch = content.match(/^#\s+(.+)$/m);
      return { id: slug, title: titleMatch ? titleMatch[1] : slug, kind: 'resource' };
    });
}

router.get('/', (req, res) => req.safeRespond(res, 200, listResources()));
router.get('/:slug', (req, res, next) => {
  try {
    const filePath = path.join(RESOURCES_DIR, req.params.slug + '.md');
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'NOT_FOUND' });
    const content = fs.readFileSync(filePath, 'utf8');
    req.safeRespond(res, 200, { id: req.params.slug, content });
  } catch (err) { next(err); }
});

module.exports = router;
