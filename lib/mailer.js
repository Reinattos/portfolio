const nodemailer = require('nodemailer');

function getEmailConfig() {
  const port = Number(process.env.SMTP_PORT || 587);

  return {
    host: process.env.SMTP_HOST,
    port,
    secure: String(process.env.SMTP_SECURE || '').toLowerCase() === 'true' || port === 465,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    to: process.env.CONTACT_TO_EMAIL,
    from: process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER
  };
}

function isEmailConfigured(config = getEmailConfig()) {
  return Boolean(config.host && config.user && config.pass && config.to && config.from);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildContactEmail({ nome, email, mensagem }) {
  const safeNome = escapeHtml(nome);
  const safeEmail = escapeHtml(email);
  const safeMensagem = escapeHtml(mensagem).replace(/\n/g, '<br>');

  return {
    subject: `Nova mensagem do portfolio - ${nome}`,
    text: [
      'Nova mensagem recebida pelo formulario do portfolio.',
      '',
      `Nome: ${nome}`,
      `Email: ${email}`,
      '',
      'Mensagem:',
      mensagem
    ].join('\n'),
    html: `
      <h2>Nova mensagem do portfolio</h2>
      <p><strong>Nome:</strong> ${safeNome}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${safeMensagem}</p>
    `
  };
}

async function sendContactEmail(contato) {
  const config = getEmailConfig();

  if (!isEmailConfigured(config)) {
    return { sent: false, skipped: true };
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass
    }
  });

  const emailContent = buildContactEmail(contato);

  await transporter.sendMail({
    from: `"Portfolio Renato" <${config.from}>`,
    to: config.to,
    replyTo: contato.email,
    subject: emailContent.subject,
    text: emailContent.text,
    html: emailContent.html
  });

  return { sent: true, skipped: false };
}

module.exports = {
  isEmailConfigured,
  sendContactEmail
};
