/* ═══════════════════════════════════
   PEROLALA ENGINE — Motor do Chatbot
   Depende de: config.js, flows.js
═══════════════════════════════════ */

let evoStarted = false;

/* Código curto do visitante, pra agrupar os alertas da mesma pessoa */
const visitante = Math.random().toString(36).slice(2, 6).toUpperCase();

/* Registra a interação no Google Analytics e envia alerta para o WhatsApp (via api/notify.js) */
function notify(acao) {
  if (typeof gtag === 'function') gtag('event', 'chat_perolala', { acao });
  if (!CONFIG.NOTIFY_URL) return;
  const body = JSON.stringify({ visitante, acao, pagina: location.pathname });
  try {
    if (navigator.sendBeacon) navigator.sendBeacon(CONFIG.NOTIFY_URL, body);
    else fetch(CONFIG.NOTIFY_URL, { method: 'POST', body, keepalive: true });
  } catch (e) { /* alerta nunca pode quebrar o chat */ }
}

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
  wrap.querySelectorAll('a.qrb').forEach(el => el.addEventListener('click', () =>
    notify(`${el.classList.contains('qrb-wa') ? '💬 Foi pro WhatsApp' : '🔗 Abriu link'}: ${el.textContent}`)
  ));
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

/* Navega para um flow, exibindo a mensagem do usuário e a resposta da Perolala */
function runFlow(id, label) {
  const f = flows[id];
  if (!f) return;
  disableChips();
  if (label) { userMsg(label); notify(`Escolheu: ${label}`); }
  botMsg(f.msg, f.chips);
}

/* Mensagem de boas-vindas ao abrir o chat */
function startChat() {
  setTimeout(() => botMsg(
    'Olá! Me chamo <strong>Perolala</strong>, a recepcionista digital do <strong>Instituto Danielle Azevedo</strong>. 💛<br><br>Estou aqui pra te acolher e te ajudar a dar o primeiro passo. Por onde começamos?',
    flows.inicio.chips
  ), 450);
}

/* Renderiza mensagem da Perolala com indicador de digitação */
function botMsg(html, chips) {
  const a = document.getElementById('chat-area');
  if (!a) return;

  const td = document.createElement('div');
  td.className = 'typing-dot';
  td.innerHTML = `<span></span><span></span><span></span>`;
  a.appendChild(td);
  a.scrollTop = a.scrollHeight;

  const delay = CONFIG.typingDelayMin + Math.random() * CONFIG.typingDelayRandom;

  setTimeout(() => {
    td.remove();

    const lbl = document.createElement('div');
    lbl.className = 'mlbl';
    lbl.innerHTML = `<span class="mlbl-ava pero-p">IDA</span>Perolala · Instituto Danielle Azevedo`;
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
  if (!evoStarted) { startChat(); evoStarted = true; notify('👋 Abriu o chat'); }
}

function closeEvo() {
  document.getElementById('evo-panel').classList.remove('open');
  document.getElementById('evo-launcher').classList.remove('hidden');
}

document.querySelector('.evo-handoff-btn')?.addEventListener('click', () =>
  notify('💬 Foi pro WhatsApp: botão "falar com a equipe"')
);
