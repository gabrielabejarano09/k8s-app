# Task Manager - Full Stack Kubernetes Application

Aplicación Full Stack tipo Lista de Tareas desplegada en Kubernetes.

La aplicación permite:

- Crear tareas
- Listar tareas
- Marcarlas como completadas
- Eliminarlas

---

## Arquitectura General

Flujo:

Usuario → Ingress → Frontend → Backend API → PostgreSQL

Componentes:

- Frontend: aplicación web
- Backend: API REST (Node.js / Express)
- Base de datos: PostgreSQL
- Ingress: punto de entrada externo
- HPA: escalamiento automático del backend

---

## Estructura del Proyecto

```

k8s-app/
│
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
│
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── Dockerfile
│   └── package.json
│
├── k8s/
│   ├── frontend-deployment.yaml
│   ├── backend-deployment.yaml
│   ├── postgres-deployment.yaml
│   ├── frontend-service.yaml
│   ├── backend-service.yaml
│   ├── postgres-service.yaml
│   ├── ingress.yaml
│   ├── backend-hpa.yaml
│   ├── pvc.yaml
│   ├── configmap.yaml
│   └── secret.yaml

```

---

## Backend API

### Base Path

```

/tasks

```

## Endpoints

### Crear tarea

```

POST /tasks

````

Body:
```json
{
  "title": "Nueva tarea"
}
````

Respuesta:

```json
{
  "id": 1,
  "title": "Nueva tarea",
  "completed": false
}
```

---

### Listar tareas

```
GET /tasks
```

Respuesta:

```json
[
  {
    "id": 1,
    "title": "Nueva tarea",
    "completed": false
  }
]
```

---

### Marcar tarea como completada

```
PUT /tasks/:id
```

Respuesta:

```json
{
  "id": 1,
  "completed": true
}
```

---

### Eliminar tarea

```
DELETE /tasks/:id
```

Respuesta:

```json
{
  "message": "Task deleted"
}
```

---

## Lógica Interna del Backend

El backend:

* Utiliza node.js
* Se conecta a PostgreSQL mediante variables de entorno.
* Implementa validaciones básicas.
* Maneja errores con códigos HTTP apropiados.

### Simulación de carga

En el endpoint `POST /tasks` se incluye un doble bucle anidado para generar consumo controlado de CPU:

```javascript
for (let i = 1; i <= 1000; i++) {
  for (let j = 1; j <= 1000; j++) {
    suma += i + j;
  }
}
```

Esto permite realizar pruebas de carga realistas.

---

## Base de Datos

Tabla principal: `tasks`

Campos:

* id (serial, primary key)
* title (text)
* completed (boolean)

---

## Frontend

El frontend:

* Consume la API.
* Actualiza dinámicamente la lista.
* Permite marcar tareas y eliminarlas desde la interfaz.
* Maneja estado local para renderizar cambios en tiempo real.

---

## Variables de Entorno

El backend requiere:

```
DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
DB_PORT
PORT
```

Estas variables se gestionan mediante ConfigMap y Secret en Kubernetes.

---

## Docker

Cada componente incluye su propio Dockerfile.

Construcción local:

```
docker build -t backend .
docker build -t frontend .
```

---

## Kubernetes

Para desplegar la infraestructura:

```
kubectl apply -f k8s/
```

Ver estado de recursos:

```
kubectl get pods
kubectl get services
kubectl get ingress
```

---

## Escalabilidad

El backend incluye:

* requests y limits definidos
* Horizontal Pod Autoscaler basado en consumo de CPU

---

## Pruebas

Se puede probar la API con:

* Postman
* curl
* k6 para pruebas de carga

---

## Autoras

Isabela Díaz Acosta
Gabriela Bejarano

