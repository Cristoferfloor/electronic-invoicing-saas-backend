# Etapa 1: Construcción
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependencias
RUN npm ci

# Copiar código fuente
COPY . .

# Generar cliente de Prisma
RUN npx prisma generate

# Compilar TypeScript a JavaScript
RUN npm run build

# Etapa 2: Producción (Imagen ligera)
FROM node:20-alpine

WORKDIR /app

# Copiar desde la etapa de construcción
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Variables de entorno por defecto
ENV PORT=3000
ENV NODE_ENV=production

# Exponer el puerto
EXPOSE 3000

# Comando de inicio (con migraciones al arrancar para asegurar DB lista)
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]
