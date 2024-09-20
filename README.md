# BibliotecaVirtual

A aplicação Biblioteca Virtual foi implementada no ambiente Kubernetes, Minikube, e consiste em Backend - desenvolvido em Python, Frontend - desenvolvido em React e um banco de dados, no qual utilizamos o SQLide. 

Frontend: Desenvolvido utilizando React, responsável pela interface com o campo para preenchimento de informações de determinado livro.

Backend: Desenvolvido em Python, responsável pela lógica da aplicação. 

Banco de Dados (SQLite): Armazena os dados referente aos livros. 

## Script de Automação

```kubectl apply -f sqlite-pvc.yaml
kubectl apply -f db-deployment.yaml
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f frontend-service.yaml

kubectl get pods

kubectl rollout restart deployment frontend-deployment
kubectl rollout restart deployment backend-deployment


#Problemas no frontend
docker build -t mthsbessa/frontend:latest .
docker push mthsbessa/frontend:latest```


minikube service frontend`

