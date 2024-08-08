FROM alpine:latest
RUN apk add --no-cache sqlite
COPY setup.sql /docker-entrypoint-initdb.d/
CMD ["sqlite3", "database.db", ".read /docker-entrypoint-initdb.d/setup.sql"]


