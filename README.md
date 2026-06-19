# Portfolio Renato Herisson

Portfolio profissional com frontend responsivo, estilo visual autoral e formulario de contato conectado a SQLite no ambiente local. Para deploy na Vercel, a API em `api/contato.js` usa Supabase.

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

## Envio de Email

O formulario salva a mensagem no banco e tambem envia uma copia para sua caixa de entrada quando o SMTP estiver configurado.

Crie um arquivo `.env` com base no `.env.example` e preencha:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app
CONTACT_TO_EMAIL=seu-email@gmail.com
CONTACT_FROM_EMAIL=seu-email@gmail.com
```

Para Gmail, use uma senha de app da sua conta Google. Nao use sua senha normal da conta.

## Status Atual

### Completo
- Estrutura HTML completa: navbar, hero, sobre, projetos, contato e footer
- Tema visual escuro com cores de destaque
- Animacoes fluidas e smooth scroll
- Formulario de contato funcional no frontend
- API de contato salvando mensagens no SQLite
- Envio de email via Nodemailer quando SMTP estiver configurado
- Design responsivo para mobile, tablet e desktop
- Servidor Express configurado na porta 3000
- Rota serverless para deploy na Vercel usando Supabase

### Dependencias Instaladas
- express@4.18.2
- sqlite3@5.1.6
- cors@2.8.5
- nodemailer@6.9.1
- nodemon@2.0.20

### Para publicar na Vercel
- Criar a tabela do Supabase usando `supabase.sql`
- Configurar as variaveis `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY`
- Fazer o deploy conectado ao repositorio GitHub

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
