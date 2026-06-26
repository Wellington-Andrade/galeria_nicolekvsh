# Galeria Nicole Kvsh — Sanity Studio

Painel para cadastrar e editar as obras. Usa o **mesmo** projeto/dataset que o
site (`tvqjz8gn` / `production`). O site só lê; o cadastro de obras é feito aqui.

## Rodar localmente

```bash
cd studio
npm install
npm run dev
```

Abre em **http://localhost:3333**. No primeiro acesso, faça login com a conta
Sanity dona do projeto (abre no navegador).

> Se o login falhar por CORS, adicione `http://localhost:3333` em
> manage.sanity.io → projeto `tvqjz8gn` → API → CORS Origins, com
> **Allow credentials MARCADO** (o Studio usa requisições autenticadas).

## Campos da obra

- **Nome** (obrigatório)
- **Imagem** (obrigatório)
- **Ano** — ex.: 2024
- **Técnica** — ex.: Óleo sobre tela
- **Dimensões** — dimensões reais da obra, ex.: 120 × 80 cm
- **Publicada** — só publicadas aparecem no site
- **Destaque** — define a obra em destaque na home
- **Ordem** — menor número aparece primeiro

## Publicar o Studio (opcional)

Para hospedar em `https://<nome>.sanity.studio`:

```bash
npm run deploy
```

Requisitos: Node >= 22.12.
