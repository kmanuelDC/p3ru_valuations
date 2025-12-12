FROM node:20-alpine

WORKDIR /usr/src/app

# install dependencies
COPY package.json package-lock.json ./
RUN npm ci --silent

# copy source
COPY . .

EXPOSE 4200

# Run dev server on 0.0.0.0 so it is reachable from host
CMD ["sh", "-c", "npm run start -- --host 0.0.0.0 --port 4200"]
