# Portfolio Renato Herisson

Portfolio profissional com frontend responsivo e formulário de contato que abre o cliente de email do usuário via `mailto:`.

## Como Rodar

### 1. Instalar Dependências
```bash
npm install
```

### 2. Iniciar o Servidor
```bash
npm start
```

Acesse: `http://localhost:3000`

## Contato

O formulário de contato usa `mailto:` para abrir automaticamente o cliente de email do seu navegador.

- Email de destino: `reinatos1996@gmail.com`
- Não é necessário usar banco de dados
- Não é necessário configurar SMTP

## Status Atual

### Completo
- Estrutura HTML completa: navbar, hero, sobre, projetos, contato e footer
- Formulário de contato que abre o email via `mailto:`
- Smooth scroll nos links de navegação
- Servidor Express simples para servir os arquivos estáticos
- Projeto sem dependência de banco de dados ou envio de email pelo backend

### Dependências Instaladas
- express@4.18.2
- nodemon@2.0.20

## Estrutura

```text
portfolio/
|-- server.js              # Express server local
|-- package.json           # Dependências e scripts
|-- vercel.json            # Regras de roteamento para deploy
|-- public/
|   |-- index.html         # Página principal
|   |-- css/
|   |   `-- style.css      # Estilos e animações
|   `-- js/
|       `-- script.js      # Lógica do formulário e smooth scroll
`-- .env.example           # Exemplo de variáveis de ambiente (não obrigatório)
```

## Observação

Este projeto agora usa apenas o frontend para enviar mensagens por email. O backend não precisa armazenar contatos em banco de dados.
