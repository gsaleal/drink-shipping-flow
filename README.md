
### 1. Cria store:
`POST /api/stores`
```json
{
    "document": "12345612345",
    "socialName": "Leal",
    "name": "Emporium",
    "email": "email@email.com",
    "phone": ["31114477845"],
    "representative": ["test"],
    "address": ["BR"]
}
```

### 2. Cria produtos:
`POST /api/products`
```json
{
    "name": "Cerveja Chopp BRAHMA 350ml",
    "sku": "7891149010509",
    "price": 4000
}
```
```json
{
    "name": "Cerveja CORONA 350ml",
    "sku": "7891991295055",
    "price": 7500
}
```


### 3. Cria customer
`POST /api/customers`
```json
{
    "document": "12345612345",
    "name": "Pessoa Fisica",
    "socialName": ""
}
```

### 4. Cria customer order para store:
HEADER: `x-store-id: 1`
<br>
`POST /api/customers/1/orders`
```json
{
    "products": [{
        "id": 2,
        "quantity": 20
    }, {
        "id": 1,
        "quantity": 30
    }]
}
```

### 4. Crie outra customer order para passar de mil:
HEADER: `x-store-id: 1`
<br>
`POST /api/customers/1/orders`
```json
{
    "products": [{
        "id": 2,
        "quantity": 900
    }, {
        "id": 1,
        "quantity": 100
    }]
}
```

### 5. É esperado que a order 1 seja fechada e enviada para o parceiro com o seguinte payload:
```json
{
  "orderId" : 6,
  "storeId" : 1,
  "totalItems" : 1050,
  "totalPrice" : 7420000,
  "products" : [ {
    "sku" : "7891991295055",
    "quantity" : 920
  }, {
    "sku" : "7891149010509",
    "quantity" : 130
  } ]
}
```
