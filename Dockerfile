FROM node:22-slim AS builder
WORKDIR /app
COPY package*.json ./

RUN npm ci
COPY . .
RUN npm run build

FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/build build/
EXPOSE 3011

ENV NODE_ENV=production
ENV PORT=3011
ENV ORIGIN=http://localhost:3011

CMD [ "npm", "run", "production" ]