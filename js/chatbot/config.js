/* ═══════════════════════════════════
   CHATBOT CONFIG — Evo (Instituto Danielle Azevedo)
   Altere aqui número do WhatsApp, delays
   e caminhos dos mascotes.
═══════════════════════════════════ */
const CONFIG = {
  WA: '5583987451878',          // WhatsApp do Instituto (atendimento)
  WA_SALAS: '5583987451878',    // WhatsApp para reserva de salas
  typingDelayMin: 2200,
  typingDelayRandom: 500,
  mascotThinking: 'assets/mascotes/mascotepensando.svg',
  mascotPointing: 'assets/mascotes/mascoteapontando.svg',
  mascotHappy: 'assets/mascotes/mascotefeliz.svg',
};

function waLink(msg, num) {
  const n = num || CONFIG.WA;
  return `https://wa.me/${n}?text=${encodeURIComponent(msg)}`;
}
