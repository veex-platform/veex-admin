FROM node:20-alpine AS builder

ARG VITE_REGISTRY_URL="https://registry.veexplatform.com/api/v1"
ENV VITE_REGISTRY_URL=$VITE_REGISTRY_URL

WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
