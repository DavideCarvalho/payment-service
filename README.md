# PSP
> Payment Service Provider

# Sobre
Esse projeto simula um provedor de pagamentos, dando a opção de:

- Criar transações
- Ver transações criadas
- Ver payables gerados a partir das transações

# Como usar
- clone o projeto
- use ``npm i`` para baixar as dependências
- use ``npm run start`` para iniciar ou ``npm run start:dev`` para ter hot reload

#Endpoints
Esse projeto possui 3 rotas:
- /transaction
    - GET /transaction
        - Retorna as transações de forma paginada
    - POST /transaction
        - Endpoint responsável por criar as transações, e os payables a partir da transação criada
- /payable
    - GET /payable
        - retorna os payables de forma paginada
        
Cada endpoint tem sua explicação de headers, body e query strings necessários no Swagger, que se encontra em ``/api``

#Segurança
> Podem usar o seguinte token caso queiram, ele da acesso a todas as roles: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE1MTYyMzkwMjIsInJvbGVzIjpbIkdFVF9UUkFOU0FDVElPTlMiLCJHRVRfUEFZQUJMRVMiLCJDUkVBVEVfTkVXX1RSQU5TQUNUSU9OIl19.bvbqRAnrR19PiZ7wjM9s4s-tq1DQCceZTALBkspDMcA

Cada endpoint tem uma role associada, então para que as requisições
funcionem, você precisa de um JWT com um array chamado ``roles``,
e dentro dele ter as strings com as roles necessárias para cada endpoint,
e.g:
```javascript
{
  "id": "1234567890",
  "name": "admin",
  "roles": [
    "GET_TRANSACTIONS",
    "GET_PAYABLES",
    "CREATE_NEW_TRANSACTION"
  ]
}
```
Entre no site ``jwt.io`` e coloque esse json no ``payload``.
JWT também precisam de uma assinatura, no campo "verify signature"
escreva ``secret``. Seguindos esses passos, você deverá ter um JWT formado
no campo grande que existe nesse site.

Ao fazer uma requisição, coloque um campo ``Authorization`` no header,
com o valor ``Bearer <token>``, sendo que no lugar de ``<token>``,
você colocará seu JWT gerado.

#Configuração
Para desenvolvimento, temos uma configuração default para banco
de dados, porém, pode ser mudado com as seguintes variáveis de
ambiente:

- DATABASE_HOST: url do banco de dados, default é ``tuffi.db.elephantsql.com``
- DATABASE_PORT:porta do banco de dados, default é ``5432``
- DATABASE_USERNAME: usuário do banco de dados, default é ``ebrpqwfi``
- DATABASE_PASSWORD: senha do usuário do banco de dados, default é ``tET4t1PLighq9gQ3eJD4PBvMnlWBgfFX``
- DATABASE_SCHEMA: schema a ser utilizado, default é ``ebrpqwfi``
- DATABASE_PRODUCTION: url da base de dados, default é ``tuffi.db.elephantsql.com``

O ``TypeORM`` possui uma opção chamada `synchronize`, que faz com que
ele faça o mapeamento das entidades para a tabela sempre que a aplicação
subir. Como isso pode ter efeitos indesejados - como apagar dados -,
Ele só é utilizado caso o ambiente não seja produção, ou seja, caso a
variável de ambiente ``PRODUCTION`` não seja colocada ou seja ``false``

#Melhorias
Existem algumas melhorias possíveis, como:
- Testes de integração - De preferência, sem mocks de banco, utilizando um banco de dados para desenvolvimento
- Criar endpoint de segurança para geração de token
- Lógica de refresh token
- Criação e vinculação de usuários nas transações
- Por serem dados sensíveis, os campos deveriam ser criptografados





