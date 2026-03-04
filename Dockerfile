# Stage 1: Build static site
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

# Fetch all specs before COPY so prebuild curl is not needed at build time
RUN mkdir -p docs && \
    wget -O docs/oms-specification.md \
    https://raw.githubusercontent.com/openmemoryspec/oms/refs/heads/main/SPECIFICATION.md && \
    wget -O docs/cal-specification.md \
    https://raw.githubusercontent.com/openmemoryspec/oms/refs/heads/main/CONTEXT-ASSEMBLY-LANGUAGE-CAL-SPECIFICATION.md && \
    wget -O docs/sml-specification.md \
    https://raw.githubusercontent.com/openmemoryspec/oms/refs/heads/main/SEMANTIC-MARKUP-LANGUAGE-SML-SPECIFICATION.md

COPY . .

ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_SITE_URL=https://memorygrain.org

ENV NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

# Run next build directly to skip prebuild script (specs already fetched above)
RUN npx next build && node scripts/generate-rss.js

# Stage 2: Serve with nginx
FROM nginx:alpine

COPY --from=builder /app/out /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
