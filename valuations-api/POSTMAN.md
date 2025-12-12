Pruebas y ejemplos (Postman / curl)

A continuación encontrarás ejemplos de peticiones que puedes pegar en Postman (Body -> raw -> JSON) o ejecutar con `curl` desde PowerShell.

- URL base (desarrollo): `http://localhost:3000`

- Arrancar servidor en modo desarrollo:

```powershell
npm run start:dev
```

---

1) Crear un `BudgetItem` individual (endpoint existente `POST /budget-item`)

Ejemplo de body (JSON):

```json
{
  "projectId": 1,
  "code": "02.01.01",
  "description": "DESBROCE Y LIMPIEZA EN BOSQUE",
  "unit": "m2",
  "contractQty": 10,
  "unitPrice": 2,
  "parentCode": "02.01",
  "level": 3,
  "isHeader": false,
  "sortOrder": 1
}
```

curl (PowerShell):

```powershell
curl -X POST http://localhost:3000/budget-item \
  -H "Content-Type: application/json" \
  -d '{"projectId":1,"code":"02.01.01","description":"DESBROCE Y LIMPIEZA EN BOSQUE","unit":"m2","contractQty":10,"unitPrice":2,"parentCode":"02.01","level":3,"isHeader":false,"sortOrder":1}'
```

---

2) Crear muchos `BudgetItem` jerárquicos en lote (recomendado)

Endpoint recomendado: `POST /projects/:projectId/budget-item/batch`

Ejemplo de body (JSON array):

```json
[
  {
    "code": "02",
    "description": "Movimiento de tierras",
    "unit": "lot",
    "contractQty": 1,
    "unitPrice": 1000,
    "level": 1,
    "isHeader": true,
    "sortOrder": 1
  },
  {
    "code": "02.01",
    "description": "Desbroce y limpieza de terreno",
    "unit": "m2",
    "contractQty": 50,
    "unitPrice": 5,
    "parentCode": "02",
    "level": 2,
    "isHeader": false,
    "sortOrder": 1
  },
  {
    "code": "02.01.01",
    "description": "Desbroce y limpieza en bosque",
    "unit": "m2",
    "contractQty": 10,
    "unitPrice": 2,
    "parentCode": "02.01",
    "level": 3,
    "isHeader": false,
    "sortOrder": 1
  }
]
```

curl (PowerShell) para crear el batch en `projectId = 1`:

```powershell
curl -X POST http://localhost:3000/projects/1/budget-item/batch \
  -H "Content-Type: application/json" \
  -d '[{"code":"02","description":"Movimiento de tierras","unit":"lot","contractQty":1,"unitPrice":1000,"level":1,"isHeader":true,"sortOrder":1},{"code":"02.01","description":"Desbroce y limpieza de terreno","unit":"m2","contractQty":50,"unitPrice":5,"parentCode":"02","level":2,"isHeader":false,"sortOrder":1},{"code":"02.01.01","description":"Desbroce y limpieza en bosque","unit":"m2","contractQty":10,"unitPrice":2,"parentCode":"02.01","level":3,"isHeader":false,"sortOrder":1}]'
```

Nota: existe también el endpoint legacy `POST /budget-item/batch` que acepta un array de DTOs pero exige `projectId` dentro de cada objeto. Se recomienda usar la ruta por proyecto mostrada arriba.

---

3) Consejos para Postman

- En Postman crea una nueva request `POST` con la URL y en la pestaña `Body` selecciona `raw` + `JSON` y pega uno de los cuerpos de ejemplo.
- Añade cabecera `Content-Type: application/json` si Postman no la añade automáticamente.
- Para probar errores, intenta incluir un `parentCode` que no exista y verifica que la API devuelve `400 Bad Request`.

---

4) Migraciones y generación de cliente Prisma

Si cambias `schema.prisma` recuerda crear una migración y generar el cliente:

```powershell
npx prisma migrate dev --name <migration_name>
npx prisma generate
```

---

Si quieres, puedo generar un export de colección Postman (.json) con estas peticiones para que lo importes directamente. ¿Quieres que lo añada al repo?

---

## Endpoints de `projects`

1) Crear un `Project` (POST /projects)

Ejemplo de body (JSON):

```json
{
  "code": "P-001",
  "name": "Proyecto Ejemplo",
  "description": "Descripción del proyecto",
  "clientName": "Cliente S.A.",
  "location": "Lima",
  "contractAmount": 1000000
}
```

curl (PowerShell):

```powershell
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -d '{"code":"P-001","name":"Proyecto Ejemplo","description":"Descripción del proyecto","clientName":"Cliente S.A.","location":"Lima","contractAmount":1000000}'
```

2) Obtener proyecto por id (GET /projects/:id)

curl (PowerShell):

```powershell
curl http://localhost:3000/projects/1
```

---

## Endpoints de `user`

1) Crear un usuario (POST /user)

Ejemplo de body (JSON):

```json
{
  "email": "usuario@example.com",
  "password": "secret123",
  "fullName": "Nombre Usuario"
}
```

Nota: en tu esquema Prisma el campo almacenado es `passwordHash`. El endpoint `POST /user` debe aceptar `password` y el servicio debe hashearla antes de guardar; verifica implementación de `user.service`.

curl (PowerShell):

```powershell
curl -X POST http://localhost:3000/user \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@example.com","password":"secret123","fullName":"Nombre Usuario"}'
```

2) Obtener usuario por id (GET /user/:id)

curl (PowerShell):

```powershell
curl http://localhost:3000/user/1
```
