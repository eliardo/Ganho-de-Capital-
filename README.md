# Aplicação e estrutura
Desenvolvido com NodeJs + Typescript + Jest
Também possuí disponível o arquivo Dockerfile, para facilitar a utilização da aplicação.

A aplicação está dividida seguindo a ideia macro de MODELs, CONTROLLERs e SERVICEs.



# Build and Run
Use imagens e containers do Docker para construir e executar o sistema

 - Com docker instalado na máquina em execução acesse o sistema via terminal até a pasta que contem o arquivo Dockerfile
 
 - Execute o comando abaixo para criar uma imagem com nome app-nubank
 ```
    docker build -t app-nubank .
 ```

 - Com a imagem criada, podemos criar um container com ela, com o seguinte comando:
 ```
    docker run --rm -it --name app-nubank -p 3000:3000 app-nubank
 ```

 Após isso o sistema estará rodando e pronto para receber as entradas, processa-las e retornar os valores de taxa a serem pagas


## Outra opção de execução é sem utilizar o docker
Via terminal acesse o local onde está contido o arquivo package.json

Execute a seguinte sequencia de comandos:
```
npm install
```

```
npm start
```

# Testes
Via terminal acesse o local onde está contido o arquivo package.json

## Testes com % de cobertura execute:
```
npm run test:coverage
```

## Testes unitários execute:
```
npm run test:unit
```

## Testes integrados execute:
```
npm run test:integrated
```