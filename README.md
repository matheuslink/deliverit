# Queridos!
Aqui tem um passo a passo para o build do projeto.

## Pré Requisitos
A aplicação foi feita usando Javascript com o framework React, por se tratar de um CRUD com atualização automática e componentes bem definidos. Sendo assim, como pré requisito, precisamos do *node* instalado na máquina para podermos usar o gerenciador de pacote dele (*npm*).

[Download Node.js](https://nodejs.org/en/) 

## Instalação 
Depois do download, caminhe até a pasta raiz do projeto via cmd e execute estes dois comandos: 

`npm install` 
Para instalar as dependencias do projeto.

`npm run global`
Para garantir que instalaremos algumas dependências de forma global.

## Execução
O primeiro passo, é levantar nossa REST API.

Para mockar a API, foi utilizado uma lib bem bacana que simula uma API bem robusta com diversas funcionalidades. 

[Json Server](https://github.com/typicode/json-server)

Tendo um arquivo json com a nossa data, basta executar na raiz do projeto o seguinte comando: 

`json-server --watch db.json`
Com isso, nossa API já está pronta (na porta *3000*) para receber requisições HTTP. 

Vamos adiante... 

Agora para levantar o projeto basta executar o seguinte comando: 
`npm run start` 

Que ele executará direto no seu localhost na porta *3333*

Você pode, ainda, gerar o build da aplicação executando o comando `npm run build` na raiz do projeto. Mas lembre-se que buildando a aplicação você poderá perder a referência com o server mockado que levantamos anteriormente na porta *3000*

Obrigado! 

:) 
