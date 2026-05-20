# ── Stage 1: Builder ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source
COPY tsconfig.json ./
COPY src ./src

# ── Stage 2: Runner ───────────────────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Install production dependencies and tsx
COPY package*.json ./
RUN npm ci --omit=dev && npm install tsx

# Copy source from builder
COPY --from=builder /app/tsconfig.json ./
COPY --from=builder /app/src ./src

# Switch to non-root user
USER appuser

EXPOSE 5000

CMD ["npx", "tsx", "src/server.ts"]
