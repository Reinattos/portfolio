const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota inicial
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota teste da API
app.get('/api/teste', (req, res) => {
  res.json({ mensagem: 'API funcionando!' });
});

// Rota para receber contato (será implementada depois)
app.post('/api/contato', (req, res) => {
  const { nome, email, mensagem } = req.body;
  
  // Por enquanto apenas retorna sucesso
  res.json({ 
    sucesso: true, 
    mensagem: 'Mensagem recebida com sucesso!' 
  });
});

// Inicia servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
