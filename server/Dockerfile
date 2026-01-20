FROM node:16-bullseye-slim
ENV NODE_ENV production

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY server/package.json server/package-lock.json ./
RUN npm install --omit=dev
COPY server/ .

EXPOSE 5000
CMD ["npm", "start"]
