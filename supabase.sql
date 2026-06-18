create table if not exists public.contatos (
  id bigint generated always as identity primary key,
  nome text not null,
  email text not null,
  mensagem text not null,
  criado_em timestamptz not null default now()
);

alter table public.contatos enable row level security;
