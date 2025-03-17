# Drink Shipping Flow 🚚🍹

Bem-vindo ao **Drink Shipping Flow**, um projeto que simula o fluxo de envio de bebidas, desde a coleta até a entrega ao cliente final. Este repositório contém a lógica e os componentes necessários para gerenciar e rastrear o processo de envio de bebidas de forma eficiente.

### 📋 Sobre o Projeto
O Drink Shipping Flow é um sistema que gerencia o ciclo de vida de envio de bebidas, incluindo:
1. Gerenciamento das empresas (stores);
2. Gerenciamento dos produtos (products);
3. Gerenciamento dos cliente (customers);
4. Gerenciamento das ordens de pedidos;

#### Este projeto foi desenvolvido para demonstrar boas práticas de desenvolvimento, como modularização, testes e documentação.


### 🛠️ Tecnologias Utilizadas

- **Framework**: [Nestjs](https://docs.nestjs.com/)
- **Mensageria**: [Kafka](https://kafka.apache.org/)
- **Database**: [Postgress](https://www.postgresql.org/)
- **Tests**: [Nestjs test](https://docs.nestjs.com/fundamentals/testing)
- **Controle de Versão**: [Git](https://git-scm.com/)


## 🚀 Como Executar o Projeto

### Pré-requisitos
- Node v22.14.0
- npm v10.9.2
- Docker

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/gsaleal/drink-shipping-flow.git
   cd drink-shipping-flow
   ```
2. Instale as dependencias:
   ```bash
    npm install
   ```
3. Crie o .env na raiz do projeto:
     ```env
        DB_HOST=postgresql
        DB_PORT=5432
        DB_USER=postgres
        DB_PASS=postgres
        DB_NAME=postgres
        
        EXTERNAL_BASE_URL=http://mockserver:1080/HEINEKEN
        EXTERNAL_SEND_ORDER_PATH=send-order
     ```  
4. Rode o projeto:
   ```bash
    npm run start:docker
   ```

O projeto contem o docker-compose.yaml que ira inicializar o banco de dados (postgres), kafka, mockserver e a aplicação.

#### Fluxo do sistema:

![image](https://github.com/user-attachments/assets/da18a43b-deeb-45af-97df-a7d22e718818)


   
#### 1. Cria store:
`POST /api/stores`
```json
{
    "document": "12345612345",
    "socialName": "Leal",
    "name": "Emporium",
    "email": "email@email.com",
    "phone": ["31114477845"],
    "representative": ["test"],
    "address": ["Belo Horizonte - mg"]
}
```

#### 2. Cria produtos:
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


#### 3. Cria customer
`POST /api/customers`
```json
{
    "document": "12345612345",
    "name": "Pessoa Fisica",
    "socialName": ""
}
```

#### 4. Cria customer order para store:
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

#### 5. Crie outra customer order para passar de mil:
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

#### 6. É esperado que a order 1 seja fechada e enviada para o parceiro com o seguinte payload:
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
