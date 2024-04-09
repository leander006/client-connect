FROM node:20.12.0-alpine3.19

WORKDIR /usr/src/app

COPY  . .

RUN npm install -g pnpm

RUN pnpm install

RUN pnpm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]