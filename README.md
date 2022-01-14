# MyDPO

## Running MyDPO locally
### Requisites
- Docker
- Node 16.13.0 (or up)

### Steps
Run `docker-compose up -d`.
Navigate to /mydpo and run `yarn install && cp .env.example .env && yarn prisma:deploy && yarn dev`.
Navigate to /api and run `yarn install && yarn dev`. MyDPO web app will be served on `localhost:3000` and MyDPO api on `localhost:9999`. Remember to change both `.env` files to fully customize the ports and connection strings
