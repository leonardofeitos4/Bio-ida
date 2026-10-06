/* ═══════════════════════════════════
   CHATBOT CONFIG — Perolala (Instituto Danielle Azevedo)
   Altere aqui número do WhatsApp, textos
   e delays.
═══════════════════════════════════ */
const CONFIG = {
  WA: '5583987451878',          // WhatsApp do Instituto (atendimento)
  WA_SALAS: '5583987451878',    // WhatsApp para reserva de salas
  // Início de toda mensagem enviada ao WhatsApp pelo bot
  WA_PREFIX: 'Olá! Vim do biolink do Instituto Danielle Azevedo, conversei com a Perolala e',
  // Alerta de interação (api/notify.js na Vercel — URL absoluta porque o domínio .com.br está no GitHub Pages). Deixe '' para desligar.
  NOTIFY_URL: 'https://bio-ida-weld.vercel.app/api/notify',
  typingDelayMin: 2200,
  typingDelayRandom: 500,
};

function waLink(msg, num) {
  const n = num || CONFIG.WA;
  return `https://wa.me/${n}?text=${encodeURIComponent(`${CONFIG.WA_PREFIX} ${msg}`)}`;
}
