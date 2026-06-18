# Portfolio Renato Herisson

Portfolio profissional com frontend responsivo, estilo visual autoral e formulario de contato conectado a um banco SQLite local.

## Como Rodar

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Iniciar o Servidor
```bash
npm start
```

Acesso: `http://localhost:3000`

## Status Atual

### Completo
- Estrutura HTML completa: navbar, hero, sobre, projetos, contato e footer
- Tema visual escuro com cores de destaque
- Animacoes fluidas e smooth scroll
- Formulario de contato funcional no frontend
- API de contato salvando mensagens no SQLite
- Design responsivo para mobile, tablet e desktop
- Servidor Express configurado na porta 3000

### Dependencias Instaladas
- express@4.18.2
- sqlite3@5.1.6
- cors@2.8.5
- nodemailer@6.9.1
- nodemon@2.0.20

### Proximas Etapas
- [ ] Email: configurar Nodemailer para notificacoes
- [ ] Conteudo: adicionar projetos reais
- [ ] Deploy: colocar em producao

## Estrutura

```text
portfolio/
├── server.js              # Express server
├── package.json           # Dependencias
├── public/
│   ├── index.html         # Pagina principal
│   ├── css/
│   │   └── style.css      # Estilos e animacoes
│   └── js/
│       └── script.js      # Logica frontend
└── db/                    # Banco SQLite local, ignorado no Git
```

## Observacao para GitHub

Os arquivos `node_modules/`, banco local em `db/*.sqlite`, zips de backup e `.env` ficam fora do repositorio pelo `.gitignore`.

---
Ultima atualizacao: 18/06/2026
