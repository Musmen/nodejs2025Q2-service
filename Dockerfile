FROM node:24.11.1-alpine3.22
WORKDIR /app

COPY package*.json .
COPY tsconfig*.json .
COPY prisma ./prisma/

RUN npm install -g @nestjs/cli
RUN npm ci --only=production && \
    npm cache clean --force && \
    rm -rf /tmp/* /var/tmp/*

RUN npm install -g nodemon

# COPY . .

CMD sh -c "npx prisma migrate dev --name init && npx prisma generate && npm run start:nodemon"