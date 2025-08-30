# Aplicação webchat - Programação para web II 2025.1

## Sumário

- [Equipe](#equipe)
- [Descrição da Atividade](#descrição-da-atividade)
- [Funcionalidades do Frontend](#funcionalidades-do-frontend)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Executando o projeto](#executando-o-projeto)


## Equipe

- [Gabriella](https://github.com/gabs44)
- [Maria Clara](https://github.com/marysclair)
- [Maurício](https://github.com/maueici0)

## Descrição da Atividade

Este repositório contém o frontend da aplicação WebChat, desenvolvida como parte da disciplina de Programação para Web II, com o objetivo de demonstrar na prática os principais conceitos estudados. O backend dessa aplicação pode ser acessado [aqui](https://github.com/g4ma/Backend-Chat-PWII)

## Funcionalidades do Frontend

O frontend do WebChat permite que o usuário:

- Crie e gerencie conversas com diferentes contatos.
- Envie e receba mensagens em tempo real, graças ao WebSocket.
- Receba notificações mesmo quando a aplicação não está aberta, com redirecionamento direto para a conversa específica.
- Visualize mensagens anteriores mesmo sem conexão com a internet, graças ao cache gerenciado pelos Service Workers.
- Navegue entre diferentes chats de forma dinâmica

## Tecnologias Utilizadas

O projeto foi desenvolvido utilizando ReactJS como framework principal para construção da interface. A linguagem escolhida foi o TypeScript, que oferece tipagem estática e maior segurança no desenvolvimento em comparação ao JavaScript puro. Para a estilização dos componentes foi adotado o Styled Components, possibilitando uma abordagem modular e organizada do CSS dentro do próprio código.

A comunicação em tempo real foi implementada por meio do protocolo WebSocket, permitindo o envio e recebimento instantâneo de mensagens. Além disso, foram aplicadas Push Notifications utilizando a Notification API em conjunto com Service Workers, responsáveis por exibir alertas mesmo quando a aplicação não está em foco.

## Executando o projeto

Para executar este projeto, execute os seguintes passos:

1. Instale as dependências do Node.js com
 `npm i`

2. Execute `npm run dev` para iniciar o servidor

3. Abra o navegador em `http://localhost:5173`
