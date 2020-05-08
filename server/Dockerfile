FROM node:alpine

WORKDIR /app

COPY . ./

RUN npm install --unsafe-perm --no-cache

CMD ["npm", "start"]