/*───────────────────────────────────────
  ⚡ Módulo:     zenitsu-rompehuevos.js
  🎭 Protagonista: Zenitsu Agatsuma
  🧠 Autor:      Carlos
  🛠 Proyecto:   Zenitsu-Bot 
  🔗 GitHub:     https://github.com/Kone457
───────────────────────────────────────*/

const thumbnailUrl = 'https://qu.ax/MvYPM.jpg';

const contextInfo = {
  externalAdReply: {
    title: "⚡ Zenitsu - Ataque ancestral",
    body: "¡Golpe testicular con precisión anime!",
    mediaType: 1,
    previewType: 0,
    mediaUrl: "https://github.com/Kone457",
    sourceUrl: "https://github.com/Kone457",
    thumbnailUrl
  }
};

const handler = async (m, { conn }) => {
  const autor = m.sender;
  const mencionado = m.mentionedJid?.[0];
  const objetivo = mencionado || autor;
  const nombre = `@${objetivo.split('@')[0]}`;

  // 🎬 Clips de impacto
  const gifs = [
    'https://sylphy.xyz/download/7KvKOn.mp4',
    'https://sylphy.xyz/download/eFyjep.mp4',
    'https://sylphy.xyz/download/TZj66W.mp4',
    'https://sylphy.xyz/download/U2x0S7.mp4'
  ];

  // 🗯️ Frases con atmósfera Zenitsu
  const frases = [
    `⚡ Zenitsu se armó de valor y le rompió los huevos a ${nombre}`,
    `😱 ${nombre} fue víctima del miedo canalizado en forma de patada`,
    `🥚💥 ${nombre} recibió el golpe ancestral de un héroe tembloroso`,
    `🌀 ${nombre} no podrá olvidar el grito previo al impacto`,
    `🎯 Zenitsu apuntó... y ${nombre} ya no podrá reproducirse jamás`,
    `👺 ${nombre} fue neutralizado por el ataque más temido del escuadrón`,
    `🔥 El linaje de ${nombre} ha sido interrumpido por un rayo de cobardía heroica`
  ];

  // Selección aleatoria
  const gifUrl = gifs[Math.floor(Math.random() * gifs.length)];
  const frase = frases[Math.floor(Math.random() * frases.length)];

  // 🧪 Logging inicial para validar ejecución
  await conn.sendMessage(m.chat, {
    react: { text: '⚡', key: m.key }
  });

  // Primer mensaje: solo texto
  await conn.sendMessage(m.chat, {
    text: `🥚💥 ${nombre}, Zenitsu está temblando... pero va con todo ⚡`,
    mentions: [objetivo],
    contextInfo
  });

  // Segundo mensaje: GIF + frase
  await conn.sendMessage(m.chat, {
    video: { url: gifUrl },
    gifPlayback: true,
    caption: frase,
    mentions: [objetivo],
    contextInfo
  });
};

handler.command = 'rompehuevos';
handler.register = true;

export default handler;