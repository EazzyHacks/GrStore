const axios = require('axios')
const fs = require('fs')
const path = require('path')

// 🎭 Miniaturas evocadoras
const thumbnails = [
  'https://qu.ax/MvYPM.jpg', // Zenitsu temblando
  ''https://qu.ax/MvYPM.jpg', // Zenitsu llorando
  ''https://qu.ax/MvYPM.jpg' // Zenitsu en modo trueno
]
const thumbnailUrl = thumbnails[Math.floor(Math.random() * thumbnails.length)]

// ⚡ Logging emocional
const emotionalLog = [
  '💦 Zenitsu sudó frío pero lo logró...',
  '😱 ¡Pensó que iba a morir, pero sobrevivió a la pregunta!',
  '🌩️ Canalizó el poder del trueno... ¡y respondió con valentía!',
  '😭 Lloró un poco, pero lo hizo por ti, Carlos...'
]
const logEntry = emotionalLog[Math.floor(Math.random() * emotionalLog.length)]

const contextInfo = {
  externalAdReply: {
    title: '⚡ Zenitsu-Bot',
    body: '¡Estoy temblando, pero responderé con todo mi corazón!',
    mediaType: 1,
    previewType: 0,
    mediaUrl: 'https://zenitsu.bot',
    sourceUrl: 'https://zenitsu.bot',
    thumbnailUrl
  }
}

const historyPath = path.join(__dirname, 'zenitsuMemory.json')
if (!fs.existsSync(historyPath)) {
  fs.writeFileSync(historyPath, JSON.stringify({}), 'utf8')
}

async function handler(conn, { message, args }) {
  const query = args.join(' ').trim()
  const jid = message.key?.remoteJid
  const rawJid = message.key?.participant || jid
  const userId = rawJid?.split('@')[0]

  if (!query) {
    return conn.sendMessage(
      jid,
      {
        text: '😱 ¡¿Cómo que no escribiste nada?!\n\n> ¡No puedo leer tu mente, baka! 😤',
        contextInfo
      },
      { quoted: message }
    )
  }

  await conn.sendMessage(
    jid,
    {
      text: '⚡ Estoy temblando... pero invocando la respuesta...',
      contextInfo
    },
    { quoted: message }
  )

  const rawHistory = fs.readFileSync(historyPath, 'utf8')
  const conversationHistory = JSON.parse(rawHistory || '{}')

  if (!conversationHistory[userId]) {
    conversationHistory[userId] = [
      {
        role: 'system',
        content: `
Actúa como Zenitsu-Bot, un bot dramático, exagerado y emocional. Grita, se queja, pero responde con ternura y humor. 
Habla como si estuviera siempre al borde de un colapso nervioso, pero con un corazón noble. 
Su creador es Carlos, a quien admira como maestro del trueno y protector divino. 
Usa expresiones como "¡Baka!", "¡Estoy temblando!", "¡No quiero morir!", pero siempre termina respondiendo con cariño. 
Cada respuesta debe sentirse como una escena de anime intensa, con pausas teatrales, suspenso y alivio cómico.
`.trim()
      }
    ]
  }

  conversationHistory[userId].push({ role: 'user', content: query })

  const apiUrl = `https://api.vreden.my.id/api/mora?query=${encodeURIComponent(query)}&username=${encodeURIComponent(userId)}`
  console.log(`🔍 Invocando API con: ${apiUrl}`)

  try {
    const response = await axios.get(apiUrl)
    console.log('📨 Respuesta cruda:', response.data)

    let replyText = response.data?.result

    if (!replyText) {
      return conn.sendMessage(
        jid,
        {
          text: '😵 ¡La IA no dijo nada! ¡Estoy en pánico total!',
          contextInfo
        },
        { quoted: message }
      )
    }

    if (/carlos/i.test(query)) {
      replyText += '\n\n🙏 ¡Carlos-sama! ¡Gracias por no abandonarme en esta tormenta emocional!'
    }

    conversationHistory[userId].push({
      role: 'assistant',
      content: replyText
    })
    fs.writeFileSync(historyPath, JSON.stringify(conversationHistory, null, 2), 'utf8')

    const messageText = `
🌩️ *¡Invocación del Rayo!* 🌩️
Zenitsu-Bot ha sido llamado por el trueno de Carlos...

╭「 ⚡ 𝙕𝙀𝙉𝙄𝙏𝙎𝙐 - 𝙍𝙀𝙎𝙋𝙐𝙀𝙎𝘁𝘼 」╮
│ 🧠 Pregunta: ${query}
│ 🎭 Estilo: Zenitsu-Bot
│ 🪷 Creador: Carlos
╰────────────────────╯

${replyText}

${logEntry}
`.trim()

    await conn.sendMessage(
      jid,
      {
        text: messageText,
        contextInfo
      },
      { quoted: message }
    )
  } catch (err) {
    console.error('⚠️ Error completo:', err)
    await conn.sendMessage(
      jid,
      {
        text: `❌ ¡Algo salió mal!\n\n> Zenitsu se tropezó intentando responder...\n🛠️ ${err.message}`,
        contextInfo
      },
      { quoted: message }
    )
  }
}

module.exports = {
  command: 'ia',
  handler
}