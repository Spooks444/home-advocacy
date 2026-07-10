const routeTemplates = {
  home: '<div class="card"><h2>Welcome</h2><p>This is a private space for communication, reflection, and support. Your household profile controls access.</p><div style="display:flex; gap:12px; margin-top:16px;"><a class="btn" href="#messages">Open Messages</a><a class="btn secondary" href="#exercises">Start an Exercise</a></div></div>',
  messages: '<div class="card"><h2>Messages</h2><p>Secure message thread placeholder. Messages must never include raw identifiers or sensitive credentials.</p><div id="message-thread" style="margin-top:12px;"></div><form id="message-form" style="margin-top:16px; display:flex; gap:8px;"><input id="message-input" class="input" placeholder="Type a message..." autocomplete="off" /><button class="btn" type="submit">Send</button></form></div>',
  exercises: '<div class="card"><h2>Guided Exercises</h2><p>Structured communication and reflection exercises.</p><div id="exercise-list" style="margin-top:12px;"></div><div id="exercise-detail" style="margin-top:16px;"></div></div>',
  resources: '<div class="card"><h2>Resources</h2><p>Curated articles, scripts, and local-service information. No client data should be submitted through static resource pages.</p><div id="resource-list" style="margin-top:12px;"></div><div id="resource-detail" style="margin-top:16px;"></div></div>',
  settings: '<div class="card"><h2>Settings</h2><p>Privacy, consent, and household profile controls.</p><label>Participant display name<input class="input" /></label><label style="margin-top:8px; display:flex; gap:8px; align-items:center;"><input type="checkbox" /> Allow encrypted server sync</label><p class="tag">Sync is optional. Default mode is local-only.</p></div>'
};

async function loadExercises() {
  const list = document.getElementById('exercise-list');
  const detail = document.getElementById('exercise-detail');
  if (!list || !detail) return;
  list.innerHTML = '<p class="tag">Loading...</p>';
  detail.innerHTML = '';
  try {
    const res = await fetch('/api/relationship/exercises');
    const items = await res.json();
    list.innerHTML = items.map(item => `<div style="margin-top:8px;"><a class="btn secondary" href="#exercises/${item.id}">${item.title || item.id}</a></div>`).join('');
  } catch {
    list.innerHTML = '<p class="tag">Unable to load exercises.</p>';
  }
}

async function loadResources() {
  const list = document.getElementById('resource-list');
  const detail = document.getElementById('resource-detail');
  if (!list || !detail) return;
  list.innerHTML = '<p class="tag">Loading...</p>';
  detail.innerHTML = '';
  try {
    const res = await fetch('/api/relationship/resources');
    const items = await res.json();
    list.innerHTML = items.map(item => `<div style="margin-top:8px;"><a class="btn secondary" href="#resources/${item.id}">${item.title || item.id}</a></div>`).join('');
  } catch {
    list.innerHTML = '<p class="tag">Unable to load resources.</p>';
  }
}

async function loadExerciseDetail(slug) {
  const detail = document.getElementById('exercise-detail');
  if (!detail) return;
  detail.innerHTML = '<p class="tag">Loading...</p>';
  try {
    const res = await fetch('/api/relationship/exercises/' + encodeURIComponent(slug));
    if (!res.ok) throw new Error('not found');
    const data = await res.json();
    detail.innerHTML = '<div class="card"><pre style="white-space:pre-wrap;">' + escapeHtml(data.content) + '</pre></div>';
  } catch {
    detail.innerHTML = '<p class="tag">Exercise not found.</p>';
  }
}

async function loadResourceDetail(slug) {
  const detail = document.getElementById('resource-detail');
  if (!detail) return;
  detail.innerHTML = '<p class="tag">Loading...</p>';
  try {
    const res = await fetch('/api/relationship/resources/' + encodeURIComponent(slug));
    if (!res.ok) throw new Error('not found');
    const data = await res.json();
    detail.innerHTML = '<div class="card"><pre style="white-space:pre-wrap;">' + escapeHtml(data.content) + '</pre></div>';
  } catch {
    detail.innerHTML = '<p class="tag">Resource not found.</p>';
  }
}

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
}

function navigate(page, slug) {
  document.querySelectorAll('[data-route]').forEach(el => { el.style.display = 'none'; el.innerHTML = ''; });
  const target = document.querySelector('[data-route="' + page + '"]');
  if (!target) return;
  target.style.display = 'block';
  target.innerHTML = routeTemplates[page] || '<div class="card"><h2>' + page + '</h2><p>Coming soon.</p></div>';
  document.querySelectorAll('.sidebar nav a').forEach(a => a.classList.toggle('active', a.dataset.page === page));
  try { localStorage.setItem('relationship-app:last-page', page); } catch {}
  if (page === 'exercises') {
    if (slug) loadExerciseDetail(slug); else loadExercises();
  } else if (page === 'resources') {
    if (slug) loadResourceDetail(slug); else loadResources();
  } else if (page === 
