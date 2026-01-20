FROM node:16-alpine
ENV NODE_ENV production

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY server/package.json server/package-lock.json ./
RUN npm ci --omit=dev
COPY server/ .

EXPOSE 5000
CMD ["npm", "start"]
