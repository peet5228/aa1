FROM node:20
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci || npm install
COPY . .
EXPOSE 3001
CMD ["npx","nodemon","-L","index.js"]

# FROM node:20
# WORKDIR /app
# COPY package.json package-lock.json* ./
# RUN npm ci || npm install
# COPY . .
# EXPOSE 3001
# CMD ["npm","run","dev","--","--","host","0.0.0.0"]