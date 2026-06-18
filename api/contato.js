const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function validateContato(body = {}) {
  const nome = String(body.nome || '').trim();
  const email = String(body.email || '').trim();
  const mensagem = String(body.mensagem || '').trim();

  if (!nome || !email || !mensagem) {
    return {
      valid: false,
      status: 400,
      payload: {
        sucesso: false,
        mensagem: 'Preencha nome, email e mensagem.'
      }
    };
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return {
      valid: false,
      status: 400,
      payload: {
        sucesso: false,
        mensagem: 'Informe um email válido.'
      }
    };
  }

  return { valid: true, contato: { nome, email, mensagem } };
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      sucesso: false,
      mensagem: 'Método não permitido.'
    });
  }

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Banco de dados não configurado.'
    });
  }

  const validation = validateContato(req.body);

  if (!validation.valid) {
    return res.status(validation.status).json(validation.payload);
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false
    }
  });

  const { data, error } = await supabase
    .from('contatos')
    .insert(validation.contato)
    .select('id')
    .single();

  if (error) {
    console.error('Erro ao salvar contato:', error.message);
    return res.status(500).json({
      sucesso: false,
      mensagem: 'Não foi possível salvar a mensagem agora.'
    });
  }

  return res.status(201).json({
    sucesso: true,
    id: data.id,
    mensagem: 'Mensagem enviada e salva com sucesso!'
  });
};
