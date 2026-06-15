// Manipula o envio do formulário de contato
document.getElementById('form-contato').addEventListener('submit', async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const mensagem = document.getElementById('mensagem').value;
  const respostaDiv = document.getElementById('mensagem-resposta');

  try {
    const response = await fetch('/api/contato', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nome, email, mensagem })
    });

    const data = await response.json();

    if (data.sucesso) {
      respostaDiv.style.color = 'green';
      respostaDiv.textContent = '✅ Mensagem enviada com sucesso!';
      document.getElementById('form-contato').reset();
    } else {
      respostaDiv.style.color = 'red';
      respostaDiv.textContent = '❌ Erro ao enviar mensagem.';
    }
  } catch (error) {
    console.error('Erro:', error);
    respostaDiv.style.color = 'red';
    respostaDiv.textContent = '❌ Erro na conexão com o servidor.';
  }

  // Limpa mensagem após 3 segundos
  setTimeout(() => {
    respostaDiv.textContent = '';
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
