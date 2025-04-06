FROM node:18-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci --legacy-peer-deps && npm cache clean --force

COPY . .
RUN npm run build

FROM node:18-alpine AS production

WORKDIR /app

RUN npm install -g serve@14.2.4

COPY --from=build /app/dist /app/dist


EXPOSE 3000


CMD ["serve", "-s", "dist", "-l", "3000"]
