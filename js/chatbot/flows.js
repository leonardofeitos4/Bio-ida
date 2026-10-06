/* ═══════════════════════════════════
   FLOWS — Perolala · Recepcionista Digital
   Instituto Danielle Azevedo

   Estrutura de cada flow:
   {
     msg: string (HTML permitido),
     chips: [
       { l: 'Label', f: 'flow_id' }              → navega para outro flow
       { l: 'Label', wa: 'mensagem' }            → abre WhatsApp (atendimento);
                                                   a mensagem recebe CONFIG.WA_PREFIX na frente
       { l: 'Label', wa: 'mensagem', num: 'NUM' }→ abre WhatsApp num número específico
       { l: 'Label', href: 'url' }               → abre um link (ex: página de salas)
     ]
   }

   Para adicionar novos fluxos:
   1. Crie uma nova entrada no objeto flows
   2. Referencie com { f: 'novo_flow' } em qualquer chip
═══════════════════════════════════ */

const flows = {

  /* ── MENU PRINCIPAL ── */
  inicio: {
    msg: `Pra te acolher melhor, me conta — o que te traz aqui hoje? 💛`,
    chips: [
      { l: '💚 Cuidar do emocional', f: 'emocional' },
      { l: '💛 Casal & relacionamento', f: 'casal' },
      { l: '🌱 Autoconhecimento', f: 'desenvolvimento' },
      { l: '🧠 Avaliação & especialidades', f: 'avaliacao' },
      { l: '🏢 Alugar uma sala', f: 'salas' },
      { l: '📅 Quero agendar', f: 'agendar' },
    ]
  },

  /* ── SAÚDE EMOCIONAL ── */
  emocional: {
    msg: `Buscar ajuda já é um grande passo de cuidado com você. 💚<br><br>Pra te orientar melhor, como você tem se sentido ultimamente?`,
    chips: [
      { l: '😰 Ansiedade', f: 'ansiedade' },
      { l: '😔 Tristeza / desânimo', f: 'tristeza' },
      { l: '🔥 Estresse / esgotamento', f: 'estresse' },
      { l: '🌱 Quero começar terapia', f: 'comecar' },
    ]
  },
  ansiedade: {
    msg: `A ansiedade é uma das queixas mais comuns hoje — e tem muito a se fazer por você. 😌<br><br>Na terapia você aprende a entender seus gatilhos e a desenvolver recursos pra lidar com eles no dia a dia, no seu tempo.<br><br>Como você prefere ser atendido(a)?`,
    chips: [
      { l: '💻 Online (qualquer lugar)', f: 'online' },
      { l: '🏙️ Presencial em João Pessoa', f: 'presencial' },
    ]
  },
  tristeza: {
    msg: `Sentir esse peso por um tempo prolongado merece atenção e cuidado. 💛<br><br>A psicoterapia é um espaço seguro pra você ser ouvido(a) sem julgamentos e, junto com a equipe, encontrar caminhos pra ressignificar esse momento.<br><br>Como prefere ser atendido(a)?`,
    chips: [
      { l: '💻 Online', f: 'online' },
      { l: '🏙️ Presencial em JP', f: 'presencial' },
    ]
  },
  estresse: {
    msg: `Esgotamento e estresse constantes costumam pedir uma pausa pra se reorganizar por dentro. 🔥<br><br>No acompanhamento você trabalha equilíbrio emocional, limites e qualidade de vida de forma prática.<br><br>Como prefere ser atendido(a)?`,
    chips: [
      { l: '💻 Online', f: 'online' },
      { l: '🏙️ Presencial em JP', f: 'presencial' },
    ]
  },
  comecar: {
    msg: `Que bom que você decidiu começar! 🌱<br><br>Você não precisa estar "no fundo do poço" pra fazer terapia — ela também é autoconhecimento e prevenção. A primeira conversa é tranquila, só pra te entender.<br><br>Como prefere ser atendido(a)?`,
    chips: [
      { l: '💻 Online', f: 'online' },
      { l: '🏙️ Presencial em JP', f: 'presencial' },
    ]
  },

  /* ── CASAL & RELACIONAMENTOS ── */
  casal: {
    msg: `Relacionamentos são parte essencial da nossa vida — e merecem cuidado. 💛<br><br>O Instituto é especializado em ressignificar vidas e relacionamentos. Você busca apoio pra qual situação?`,
    chips: [
      { l: '💑 Terapia de casal', f: 'casal_terapia' },
      { l: '💔 Lidar com um término', f: 'casal_termino' },
      { l: '🗣️ Comunicação / conflitos', f: 'casal_conflito' },
    ]
  },
  casal_terapia: {
    msg: `A terapia de casal abre um espaço de diálogo guiado, onde os dois são ouvidos e podem reconstruir a relação em bases mais saudáveis. 💑<br><br>Quer dar o próximo passo?`,
    chips: [
      { l: '💬 Quero conversar', wa: 'tenho interesse em Terapia de Casal.' },
      { l: '💻 Como funciona online?', f: 'online' },
      { l: '🏙️ Presencial em JP', f: 'presencial' },
    ]
  },
  casal_termino: {
    msg: `Passar por um término dói, e você não precisa atravessar isso sozinho(a). 💛<br><br>A terapia ajuda a elaborar a perda, cuidar da autoestima e seguir em frente com mais clareza.<br><br>Como prefere ser atendido(a)?`,
    chips: [
      { l: '💻 Online', f: 'online' },
      { l: '🏙️ Presencial em JP', f: 'presencial' },
    ]
  },
  casal_conflito: {
    msg: `Conflitos e ruídos de comunicação são muito comuns — e têm solução. 🗣️<br><br>Na terapia vocês desenvolvem formas mais saudáveis de se expressar e se entender.<br><br>Quer dar o próximo passo?`,
    chips: [
      { l: '💬 Quero conversar', wa: 'quero ajuda com comunicação/conflitos no relacionamento.' },
      { l: '💻 Online', f: 'online' },
      { l: '🏙️ Presencial em JP', f: 'presencial' },
    ]
  },

  /* ── AUTOCONHECIMENTO & DESENVOLVIMENTO ── */
  desenvolvimento: {
    msg: `Autoconhecimento é um dos maiores investimentos que você pode fazer em si. 🌱<br><br>O que você gostaria de desenvolver?`,
    chips: [
      { l: '💪 Autoestima & confiança', f: 'dev_autoestima' },
      { l: '🎯 Propósito & decisões', f: 'dev_proposito' },
      { l: '🧘 Equilíbrio emocional', f: 'dev_equilibrio' },
    ]
  },
  dev_autoestima: {
    msg: `Fortalecer a autoestima muda a forma como você se vê e se relaciona com o mundo. 💪<br><br>No acompanhamento você trabalha autoimagem, autoconfiança e autocuidado de forma profunda.<br><br>Como prefere ser atendido(a)?`,
    chips: [
      { l: '💻 Online', f: 'online' },
      { l: '🏙️ Presencial em JP', f: 'presencial' },
    ]
  },
  dev_proposito: {
    msg: `Encontrar clareza sobre seus caminhos e decisões traz mais leveza pro dia a dia. 🎯<br><br>A terapia te ajuda a se conhecer melhor pra fazer escolhas mais alinhadas com quem você é.<br><br>Como prefere ser atendido(a)?`,
    chips: [
      { l: '💻 Online', f: 'online' },
      { l: '🏙️ Presencial em JP', f: 'presencial' },
    ]
  },
  dev_equilibrio: {
    msg: `Equilíbrio emocional é poder sentir sem ser dominado pelas emoções. 🧘<br><br>No processo você desenvolve regulação emocional e ferramentas práticas pra sua rotina.<br><br>Como prefere ser atendido(a)?`,
    chips: [
      { l: '💻 Online', f: 'online' },
      { l: '🏙️ Presencial em JP', f: 'presencial' },
    ]
  },

  /* ── AVALIAÇÃO & ESPECIALIDADES ── */
  avaliacao: {
    msg: `O Instituto reúne diversas especialidades pra cuidar de você de forma completa. 🧠<br><br>Qual você procura?`,
    chips: [
      { l: '🧩 Neuropsicologia', f: 'esp_neuro' },
      { l: '💊 Psiquiatria', f: 'esp_psiquiatria' },
      { l: '❤️ Sexualidade humana', f: 'esp_sexualidade' },
      { l: '🔎 Outra área', f: 'esp_outra' },
    ]
  },
  esp_neuro: {
    msg: `A avaliação neuropsicológica investiga memória, atenção, aprendizagem e funções cognitivas — útil em casos de TDAH, dificuldades de aprendizagem e outras questões. 🧩<br><br>Quer mais informações?`,
    chips: [
      { l: '💬 Quero saber mais', wa: 'quero informações sobre Avaliação Neuropsicológica.' },
      { l: '↩ Outras opções', f: 'inicio' },
    ]
  },
  esp_psiquiatria: {
    msg: `O acompanhamento psiquiátrico cuida da saúde mental também na dimensão clínica, em parceria com a psicoterapia quando necessário. 💊<br><br>Quer mais informações?`,
    chips: [
      { l: '💬 Quero saber mais', wa: 'quero informações sobre atendimento Psiquiátrico.' },
      { l: '↩ Outras opções', f: 'inicio' },
    ]
  },
  esp_sexualidade: {
    msg: `A terapia voltada à sexualidade humana acolhe questões de intimidade, identidade e relacionamentos com respeito e sigilo. ❤️<br><br>Quer dar o próximo passo?`,
    chips: [
      { l: '💬 Quero conversar', wa: 'quero informações sobre atendimento em Sexualidade Humana.' },
      { l: '↩ Outras opções', f: 'inicio' },
    ]
  },
  esp_outra: {
    msg: `O Instituto atende diversas demandas. O melhor caminho é nos contar um pouco da sua situação que a equipe te orienta sobre o atendimento ideal. 🔎`,
    chips: [
      { l: '💬 Descrever minha situação', wa: 'quero entender qual atendimento é ideal pra mim.' },
      { l: '↩ Menu principal', f: 'inicio' },
    ]
  },

  /* ── ALUGUEL DE SALAS ── */
  salas: {
    msg: `Temos salas para sublocação no <strong>Bairro dos Estados</strong>, em João Pessoa! 🏢<br><br>São ambientes acolhedores e preparados, ideais para <strong>Psicólogos e demais especialidades</strong>.<br><br>💰 <strong>Hora avulsa:</strong> R$ 30 — sem contrato de permanência<br>💰 <strong>Por turno:</strong> R$ 250 — contrato mínimo de 6 meses<br><br>O que você prefere?`,
    chips: [
      { l: '📄 Ver salas e fotos', href: 'salas/index.html' },
      { l: '💬 Quero reservar', wa: 'tenho interesse em alugar uma sala.', num: '__SALAS__' },
      { l: '↩ Menu principal', f: 'inicio' },
    ]
  },

  /* ── MODALIDADE ── */
  online: {
    msg: `💻 O atendimento online é completo e acolhedor — você é atendido(a) de onde estiver, com a mesma qualidade do presencial.<br><br>✅ Sessões por videochamada<br>✅ Sigilo e segurança<br>✅ Horários flexíveis<br><br>Quer agendar sua sessão online?`,
    chips: [
      { l: '✅ Sim, quero agendar!', wa: 'quero agendar um atendimento ONLINE.' },
      { l: '↩ Menu principal', f: 'inicio' },
    ]
  },
  presencial: {
    msg: `🏙️ O atendimento presencial acontece no Instituto, em <strong>João Pessoa – PB</strong> (Rua Pará, 136 – Sala 103 – Estados).<br><br>Um ambiente acolhedor, preparado pra te receber com conforto e sigilo.<br><br>Quer agendar sua sessão presencial?`,
    chips: [
      { l: '✅ Sim, quero agendar!', wa: 'quero agendar um atendimento PRESENCIAL em João Pessoa.' },
      { l: '↩ Menu principal', f: 'inicio' },
    ]
  },

  /* ── AGENDAMENTO ── */
  agendar: {
    msg: `Que ótimo! 😊 O Instituto atende <strong>online</strong> (de qualquer lugar) e <strong>presencial</strong> em João Pessoa. Como você prefere?`,
    chips: [
      { l: '💻 Online', wa: 'quero agendar um atendimento ONLINE.' },
      { l: '🏙️ Presencial em João Pessoa', wa: 'quero agendar um atendimento PRESENCIAL em João Pessoa.' },
      { l: '🏢 Alugar uma sala', f: 'salas' },
    ]
  },

};
