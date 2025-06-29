FROM node:20-alpine

WORKDIR /app

COPY package-lock.json package.json ./

RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]