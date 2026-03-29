# Siteprojetorealiazado

Projeto de portfólio construído com React, Vite e servido via Docker com Traefik.

## 📋 Requisitos

- Docker e Docker Compose instalados
- Rede Docker `fixelo_fixelo-network` existente
- Traefik configurado na rede

## 🚀 Configuração e Deploy

### Build e iniciar o container

```bash
docker compose up -d --build
```

### Parar o container

```bash
docker compose down
```

### Ver logs

```bash
docker compose logs -f
```

## 🌍 Domínio

O projeto está configurado para responder em:
- **demo559.innexar.app** (via Traefik com SSL/TLS)

## 📦 Ambiente de Desenvolvimento

Para desenvolvimiento local:

```bash
npm install
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 🔨 Build para Produção

```bash
npm run build
```

Os arquivos estarão em `dist/`

## 🏗️ Arquitetura

- **Dockerfile**: Build multi-stage com Node alpine
- **docker-compose.yml**: Configuração com labels Traefik
- **Network**: fixelo_fixelo-network (external)
- **Port**: 3000 (http-server)

## 📝 Labels Traefik

O container inclui as seguintes labels:
- `innexar.scope=br`: Escopo do projeto
- `innexar.app=siteprojetorealiazado`: Identificação do app
- Roteamento para `demo559.innexar.app` com TLS habilitado
- Load balancer na porta 3000
