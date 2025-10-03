FROM node:slim AS builder
WORKDIR /app
COPY package*.json .

RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:slim
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3011

ENV NODE_ENV=production
ENV PORT=3011
ENV ORIGIN=http://localhost:3011

CMD [ "npm", "run", "production" ]