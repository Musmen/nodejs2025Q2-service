FROM node:24.11.1-alpine3.22
WORKDIR /app
COPY package*.json .
COPY tsconfig*.json .
COPY . .
# RUN npm install -g @nestjs/cli
RUN npm ci --only=production && \
    npm cache clean --force && \
    rm -rf /tmp/* /var/tmp/*
CMD ["npm", "start"]