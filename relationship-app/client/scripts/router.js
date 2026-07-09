const routeTemplates = {
  home: '<div class="card"><h2>Welcome</h2><p>This is a private space for communication, reflection, and support. Your household profile controls access.</p><div style="display:flex; gap:12px; margin-top:16px;"><a class="btn" href="#messages">Open Messages</a><a class="btn secondary" href="#exercises">Start an Exercise</a></div></div>',
  messages: '<div class="card"><h2>Messages</h2><p>Secure message thread placeholder. Messages must never include raw identifiers or sensitive credentials.</p><div id="message-thread" style="margin-top:12px;"></div><form id="message-form" style="margin-top:16px; display:flex; gap:8px;"><input id="message-input" class="input" placeholder="Type a message..." autocomplete="off" /><button class="btn" type="submit">Send</button></form></div><script>document.getElementById("message-form").addEventListener("submit", e => { e.preventDefault(); const input = document.getElementById("message-input"); const thread = document.getElementById("message-thread"); const item = document.createElement("div"); item.className = "card"; item.style.marginTop = "8px"; item.textContent = input.value.trim() || "(empty)"; thread.appendChild(item); input.value = ""; });</script>',
  exercises: '<div class="card"><h2>Guided Exercises</h2><p>Structured communication and reflection exercises. Content is preview-only until integrated with the server API.</p><ul><li><a href="#exercises/reflection">Reflection prompt</a></li><li><a href="#exercises/listening">Active listening drill</a></li><li><a href="#exercises/timeline">Shared timeline review</a></li></ul></div>',
  resources: '<div class="card"><h2>Resources</h2><p>Curated articles, scripts, and local-service information. No client data should be submitted through static resource pages.</p><ul><li>Communication guidelines</li><li>Local support directory</li><li>Safety and escalation plan</li></ul></div>',
  settings: '<div class="card"><h2>Settings</h2><p>Privacy, consent, and household profile controls.</p><label>Participant display name<input class="input" /></label><label style="margin-top:8px; display:flex; gap:8px; align-items:center;"><input type="checkbox" /> Allow encrypted server sync</label><p class="tag">Sync is optional. Default mode is local-only.</p></div>'
};
function navigate(page) {
  document.querySelectorAll('[data-route]').forEach(el => { el.style.display = 'none'; el.innerHTML = ''; });
  const target = document.querySelector(`[data-route="${page}"]`);
  if (!target) return;
  target.innerHTML = routeTemplates[page] || '<div class="card"><h2>' + page + '</h2><p>Coming soon.</p></div>';
  target.style.display = 'block';
  document.querySelectorAll('.sidebar nav a').forEach(a => a.classList.toggle('active', a.dataset.page === page));
  try { localStorage.setItem('relationship-app:last-page', page); } catch {}
}
function init() {
  const saved = (() => { try { return localStorage.getItem('relationship-app:last-page'); } catch { return null; } })();
  navigate(saved || 'home');
  document.querySelectorAll('.sidebar nav a').forEach(a => a.addEventListener('click', e => { e.preventDefault(); navigate(a.dataset.page); }));
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
