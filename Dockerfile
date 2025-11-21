FROM node:24.11.1-alpine3.22
WORKDIR /app
COPY package*.json .
COPY tsconfig*.json .
COPY . .
RUN npm install -g @nestjs/cli
RUN npm install --production
CMD ["npm", "start"]