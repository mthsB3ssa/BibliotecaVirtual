# Assumindo que o Dockerfile está dentro de /frontend
FROM node:14-alpine
RUN npm install -g serve
WORKDIR /app
COPY . /app
EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]
