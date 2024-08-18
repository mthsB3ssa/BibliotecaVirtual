FROM alpine
RUN apk add --no-cache sqlite
WORKDIR /data
COPY setup.sql /data/
# O CMD abaixo deveria iniciar um processo que mantém o container rodando
CMD ["sh", "-c", "sqlite3 database.db < setup.sql && tail -f /dev/null"]
