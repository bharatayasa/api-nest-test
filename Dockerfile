# Build stage
FROM node:18 AS builder

WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm && pnpm install

# Copy source code
COPY . .

# Generate Prisma Client (jika Anda menggunakan Prisma)
RUN npx prisma generate

# Build the app
RUN pnpm build

# Run stage
FROM node:18

WORKDIR /usr/src/app

# Copy only necessary files from builder
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Expose the port and run
EXPOSE 8080

# Perintah untuk menjalankan aplikasi
CMD ["node", "dist/src/main.js"]

