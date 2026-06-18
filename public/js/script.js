// Manipula o envio do formulário de contato
document.getElementById('form-contato').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.currentTarget;
  const botao = form.querySelector('button[type="submit"]');
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();
  const respostaDiv = document.getElementById('mensagem-resposta');

  respostaDiv.style.color = '#555555';
  respostaDiv.textContent = 'Enviando mensagem...';
  botao.disabled = true;
  botao.textContent = 'Enviando...';

  try {
    const response = await fetch('/api/contato', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, email, mensagem })
    });

    const data = await response.json();

    if (response.ok && data.sucesso) {
      respostaDiv.style.color = '#137a43';
      respostaDiv.textContent = data.mensagem || 'Mensagem enviada com sucesso!';
      form.reset();
    } else {
      respostaDiv.style.color = '#b3261e';
      respostaDiv.textContent = data.mensagem || 'Erro ao enviar mensagem.';
    }
  } catch (error) {
    console.error('Erro:', error);
    respostaDiv.style.color = '#b3261e';
    respostaDiv.textContent = 'Erro na conexão com o servidor.';
  } finally {
    botao.disabled = false;
    botao.textContent = 'Enviar Mensagem';
  }

  setTimeout(() => {
    respostaDiv.textContent = '';
  }, 5000);
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
