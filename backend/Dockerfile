# Dockerfile no diretório backend
FROM python:3.8-slim
WORKDIR /app
COPY requirements.txt /app/
RUN pip install -r requirements.txt
COPY . /app/
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "5000"]

