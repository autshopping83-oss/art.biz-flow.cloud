# art.biz-flow.cloud

Projeto para criação, edição e partilha de papéis de parede e temas, usando o ecossistema de inteligência artificial do Google.

## Arquitetura proposta
- Frontend Mobile: React Native com Expo ou Kotlin nativo.
- Backend & Base de Dados: Supabase (Auth, PostgreSQL, Storage).
- Serverless/Edge: Vercel Edge Functions ou Supabase Edge Functions.
- IA: Gemini 1.5 Flash + Imagen 3.

## O que foi adicionado
- `architecture.md` com o desenho e principais fluxos.
- `supabase/schema.sql` com as tabelas iniciais.
- `edge-functions/README.md` com a camada serverless e integração Gemini/Imagen.

## Próximos passos
1. Criar o app móvel com navegação de galerias e auth.
2. Implementar as Edge Functions para Gemini e Imagen.
3. Configurar Supabase Auth + Storage + database.
4. Construir a galeria pública com infinite scroll e cache.
5. Adicionar o editor de crop e variações de imagem.
