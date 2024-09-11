# Build stage
FROM node:14 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:stable-alpine
WORKDIR /app
COPY --from=build-stage /app/build /usr/share/nginx/html

# Remover o arquivo de configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar o arquivo nginx.conf personalizado
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
