# Arquitetura Gemini + Imagen para art.biz-flow.cloud

## Objetivo
Construir uma aplicação móvel para criação, edição e partilha de papéis de parede e temas, usando exclusivamente o ecossistema Google AI:
- Gemini 1.5 Flash para interpretação de texto e geração de metadados JSON.
- Imagen 3 para geração de imagens de alta qualidade.
- Supabase para autenticação, base de dados e armazenamento.
- Edge Functions para proteger as chaves e orquestrar as chamadas Google.

## Stack proposta
- Frontend Mobile: React Native com Expo ou Kotlin nativo.
- Backend/DB: Supabase (PostgreSQL, Auth, Storage).
- Serverless: Vercel Edge Functions ou Supabase Edge Functions.
- IA: Google Vertex AI / AI Studio com Gemini 1.5 Flash e Imagen 3.

## Fluxo principal
1. Usuário não autenticado acessa a galáxia pública de temas e wallpapers.
2. Usuário autenticado pode criar:
   - Tema: Gemini gera JSON com palette, tipografia e metadados.
   - Papel de Parede: Gemini reformula o texto em prompt e Imagen 3 gera a imagem.
3. Imagem é exibida no editor para crop e variações.
4. Publicar salva no Supabase Storage e regista o item em `creations`.

## Supabase
- `users`: já gerido pelo Supabase Auth.
- `creations`: tabela para wallpapers e temas.
- Supabase Storage para guardar imagens geradas.

## Edge Functions
- Função de geração de prompt para Gemini.
- Função de invocação de Imagen 3.
- Função de publicação que grava metadados e URL.
- Todas as chaves e quotas ficam no servidor.

## Requisitos não funcionais
- Paginação com infinite scroll.
- Lazy loading e cache local agressivo.
- CDN + WebP para imagens públicas.
- Limitação de acesso IA apenas para utilizadores autenticados.
- Segurança: Safety Settings do Gemini/Imagen.
- Rate limiting e retry backoff no lado do Edge.

## Estrutura inicial
- `/mobile` — app React Native / Expo.
- `/edge-functions` — código serverless para Gemini/Imagen.
- `/supabase` — esquema SQL e definições de tabelas.

## Critérios de aceitação
- Código modular e orientado a performance mobile.
- Execuções pesadas feitas fora da UI principal.
- Tratamento explícito de rate limiting e erros de API.
- Metadados JSON gerados corretamente para temas.
