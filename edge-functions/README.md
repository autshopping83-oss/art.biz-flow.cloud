# Edge Functions - art.biz-flow.cloud

Este diretório contém a camada serverless responsável por orquestrar as chamadas de IA do Google e proteger as credenciais.

## Funções recomendadas

1. `/api/generate-prompt`
   - Recebe o texto do utilizador e `type` (theme|wallpaper).
   - Chama Gemini 1.5 Flash para gerar:
     - Prompt positivo/negativo para Imagen 3.
     - JSON de metadados para temas.
   - Retorna o prompt otimizado ou metadados JSON.

2. `/api/generate-wallpaper`
   - Recebe prompt Gemini e opções de geração.
   - Chama Imagen 3 para gerar a imagem.
   - Retorna URL temporário ou dados da imagem para upload.

3. `/api/publish`
   - Recebe `image_url`, `metadata`, `type` e `user_id`.
   - Valida sessão e grava em `creations`.

## Integração com Google AI
- Usar variáveis de ambiente para:
  - `GOOGLE_PROJECT_ID`
  - `GOOGLE_LOCATION`
  - `GOOGLE_API_KEY` ou `GOOGLE_AUTH_TOKEN`
- Aplicar Safety Settings do Gemini/Imagen antes da geração.
- Implementar backoff e retry para quotas e rate limit.

## Exemplo de fluxo
1. App envia texto para `/api/generate-prompt`.
2. Edge Function usa Gemini para otimizar o prompt.
3. App chama `/api/generate-wallpaper` com prompt.
4. Imagen gera imagem e o app oferece crop/variações.
5. App chama `/api/publish` para salvar no Supabase.
