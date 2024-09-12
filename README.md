# BibliotecaVirtual
Prática DevOps

kubectl apply -f sqlite-pvc.yaml
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
docker push mthsbessa/frontend:latest


minikube service frontend
