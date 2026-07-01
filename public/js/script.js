const CONTACT_EMAIL = 'reinatos1996@gmail.com';

function encodeMailto(value) {
  return encodeURIComponent(value).replace(/%20/g, '+');
}

function buildMailtoLink({ nome, email, mensagem }) {
  const subject = `Contato pelo portfólio - ${nome}`;
  const body = [
    `Nome: ${nome}`,
    `Email: ${email}`,
    '',
    'Mensagem:',
    mensagem
  ].join('\n');

  return `mailto:${CONTACT_EMAIL}?subject=${encodeMailto(subject)}&body=${encodeMailto(body)}`;
}

// Manipula o envio do formulário de contato
const contatoForm = document.getElementById('form-contato');
const respostaDiv = document.getElementById('mensagem-resposta');

contatoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();
  const botao = contatoForm.querySelector('button[type="submit"]');

  if (!nome || !email || !mensagem) {
    respostaDiv.style.color = '#b3261e';
    respostaDiv.textContent = 'Preencha nome, email e mensagem.';
    return;
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    respostaDiv.style.color = '#b3261e';
    respostaDiv.textContent = 'Informe um email válido.';
    return;
  }

  respostaDiv.style.color = '#555555';
  respostaDiv.textContent = 'Abrindo seu cliente de email...';
  botao.disabled = true;
  botao.textContent = 'Abrindo email...';

  const mailtoLink = buildMailtoLink({ nome, email, mensagem });
  window.location.href = mailtoLink;

  setTimeout(() => {
    respostaDiv.style.color = '#137a43';
    respostaDiv.textContent = 'Se o cliente de email não abriu, verifique seu navegador ou copie o conteúdo manualmente.';
    botao.disabled = false;
    botao.textContent = 'Enviar Mensagem';
  }, 3000);
});

// Smooth scroll nos links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
