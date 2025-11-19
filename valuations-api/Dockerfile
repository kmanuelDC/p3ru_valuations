FROM node:20-alpine

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos solo los archivos de dependencias primero (mejor cache)
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Generamos el cliente de Prisma (si ya existe schema.prisma)
RUN npx prisma generate || true

# Puerto que expone Nest
EXPOSE 3000

# Comando por defecto (modo desarrollo)
CMD ["npm", "run", "start:dev"]
