/* ═══════════════════════════════════
   EVO ENGINE — Motor do Chatbot
   Depende de: config.js, flows.js
═══════════════════════════════════ */

let evoStarted = false;

/* Resolve número de WhatsApp do chip (suporta atalho de salas) */
function chipNum(c) {
  if (c.num === '__SALAS__') return CONFIG.WA_SALAS;
  return c.num || CONFIG.WA;
}

/* Renderiza chips inline abaixo da mensagem */
function showChips(chips, area) {
  if (!chips) return;
  const wrap = document.createElement('div');
  wrap.className = 'inline-chips';

  let html = chips.map(c => {
    if (c.wa)   return `<a class="qrb qrb-wa" href="${waLink(c.wa, chipNum(c))}" target="_blank" rel="noopener">${c.l}</a>`;
    if (c.href) return `<a class="qrb" href="${c.href}">${c.l}</a>`;
    return `<button class="qrb" onclick="runFlow('${c.f}','${c.l.replace(/'/g, "\\'")}')">${c.l}</button>`;
  }).join('');

  if (!chips.some(c => c.f === 'inicio')) {
    html += `<button class="qrb qrb-back" onclick="runFlow('inicio','↩ Menu principal')">↩ Início</button>`;
  }

  wrap.innerHTML = html;
  area.appendChild(wrap);
  area.scrollTop = area.scrollHeight;
}

/* Desativa chips anteriores quando o usuário escolhe uma opção */
function disableChips() {
  document.querySelectorAll('.inline-chips').forEach(el => {
    el.style.opacity = '.35';
    el.style.pointerEvents = 'none';
  });
}

/* Navega para um flow, exibindo a mensagem do usuário e a resposta da Evo */
function runFlow(id, label) {
  const f = flows[id];
  if (!f) return;
  disableChips();
  if (label) userMsg(label);
  botMsg(f.msg, f.chips);
}

/* Mensagem de boas-vindas ao abrir o chat */
function startChat() {
  setTimeout(() => botMsg(
    'Olá! Me chamo <strong>Evo</strong>, a recepcionista digital do <strong>Instituto Danielle Azevedo</strong>. 💛<br><br>Estou aqui pra te acolher e te ajudar a dar o primeiro passo. Por onde começamos?',
    flows.inicio.chips
  ), 450);
}

/* Renderiza mensagem da Evo com indicador de digitação */
function botMsg(html, chips) {
  const a = document.getElementById('chat-area');
  if (!a) return;

  const td = document.createElement('div');
  td.className = 'typing-dot';
  td.innerHTML = `<img src="${CONFIG.mascotThinking}" alt=""><span></span><span></span><span></span>`;
  a.appendChild(td);
  a.scrollTop = a.scrollHeight;

  const delay = CONFIG.typingDelayMin + Math.random() * CONFIG.typingDelayRandom;

  setTimeout(() => {
    td.remove();

    const lbl = document.createElement('div');
    lbl.className = 'mlbl';
    lbl.innerHTML = `<img class="mlbl-ava" src="${CONFIG.mascotPointing}" alt="">Evo · Instituto Danielle Azevedo`;
    a.appendChild(lbl);

    const msg = document.createElement('div');
    msg.className = 'msg bot';
    msg.innerHTML = html;
    a.appendChild(msg);

    if (chips !== undefined) showChips(chips, a);
    a.scrollTop = a.scrollHeight;
  }, delay);
}

/* Renderiza mensagem do usuário */
function userMsg(t) {
  const a = document.getElementById('chat-area');
  if (!a) return;
  const lbl = document.createElement('div');
  lbl.className = 'mlbl u';
  lbl.textContent = 'Você';
  const msg = document.createElement('div');
  msg.className = 'msg user';
  msg.textContent = t;
  a.appendChild(lbl);
  a.appendChild(msg);
  a.scrollTop = a.scrollHeight;
}

/* ── Controle do widget (abrir / fechar) ── */
function openEvo() {
  document.getElementById('evo-panel').classList.add('open');
  document.getElementById('evo-launcher').classList.add('hidden');
  if (!evoStarted) { startChat(); evoStarted = true; }
}

function closeEvo() {
  document.getElementById('evo-panel').classList.remove('open');
  document.getElementById('evo-launcher').classList.remove('hidden');
}
