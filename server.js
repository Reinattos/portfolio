const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const loadEnv = require('./lib/loadEnv');
const { sendContactEmail } = require('./lib/mailer');

loadEnv();

const app = express();
const PORT = process.env.PORT || 3000;
const dbDir = path.join(__dirname, 'db');
const dbPath = path.join(dbDir, 'contatos.sqlite');

fs.mkdirSync(dbDir, { recursive: true });

const db = new sqlite3.Database(dbPath, (error) => {
  if (error) {
    console.error('Erro ao abrir banco de dados:', error.message);
    return;
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS contatos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      mensagem TEXT NOT NULL,
      criado_em TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/teste', (req, res) => {
  res.json({ mensagem: 'API funcionando!' });
});

app.post('/api/contato', (req, res) => {
  const nome = String(req.body.nome || '').trim();
  const email = String(req.body.email || '').trim();
  const mensagem = String(req.body.mensagem || '').trim();

  if (!nome || !email || !mensagem) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Preencha nome, email e mensagem.'
    });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({
      sucesso: false,
      mensagem: 'Informe um email válido.'
    });
  }

  const sql = 'INSERT INTO contatos (nome, email, mensagem) VALUES (?, ?, ?)';

  db.run(sql, [nome, email, mensagem], async function (error) {
    if (error) {
      console.error('Erro ao salvar contato:', error.message);
      return res.status(500).json({
        sucesso: false,
        mensagem: 'Não foi possível salvar a mensagem agora.'
      });
    }

    try {
      const emailResult = await sendContactEmail({ nome, email, mensagem });

      if (emailResult.skipped) {
        console.warn('Email de contato não enviado: SMTP não configurado.');
      }
    } catch (emailError) {
      console.error('Erro ao enviar email de contato:', emailError.message);
      return res.status(500).json({
        sucesso: false,
        mensagem: 'Mensagem salva, mas não foi possível enviar o email agora.'
      });
    }

    res.status(201).json({
      sucesso: true,
      id: this.lastID,
      mensagem: 'Mensagem enviada e salva com sucesso!'
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
