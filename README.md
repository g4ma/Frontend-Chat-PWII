# Aplicação webchat - Programação para web II 2025.1

## Sumário

- [Equipe](#equipe)
- [Descrição da Atividade](#descrição-da-atividade)
- [Funcionalidades do Frontend](#funcionalidades-do-frontend)
- [Decisões técnicas adotadas](#decisões-técnicas-adotadas)
- [Arquitetura](#arquitetura)
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

## Decisões técnicas adotadas

- Frontend com ReactJS

Decidimos utilizar ReactJS pela sua capacidade de componentização e reuso de código, o que facilitou a manutenção e evolução da interface. Além disso, a escolha também foi influenciada pelo fato de que ReactJS foi utilizado durante a disciplina.

- TypeScript 

A escolha do TypeScript foi feita para garantir maior segurança no código por meio de tipagem estática, reduzindo erros comuns em tempo de execução e melhorando a produtividade com suporte avançado em IDEs.

- Styled Components para estilização

 Adotamos Styled Components por permitir modularização do estilo no mesmo escopo dos componentes, trazendo maior organização e consistência visual.

- WebSocket para comunicação em tempo real

Optamos por WebSocket pois ele garante baixa latência e comunicação bidirecional, fundamental para o envio e recebimento instantâneo de mensagens em um chat.

- Push Notifications com Service Workers

Foi decidido implementar push notifications com a Notification API integrada a Service Workers, permitindo alertas mesmo quando a aplicação não está em primeiro plano ou a guia está fechada — essencial para não perder mensagens.

- Redis para gerenciamento de inscrições

No backend, o Redis foi escolhido em vez de arrays em memória por oferecer alto desempenho e escalabilidade no gerenciamento das inscrições dos usuários para notificações, evitando perda de dados em cenários de múltiplas instâncias do servidor.

- Funcionalidade Offline

Decidimos aplicar estratégias de cache e armazenamento local (localStorage + Service Workers) para que o usuário pudesse continuar utilizando a aplicação mesmo sem conexão com a internet, semelhante a outros web apps modernos como Google Drive.

## Arquitetura

![Arquitetura frontend](./dist/assets/Frontend.png)

No frontend, a arquitetura é dividida em três partes principais: camada de interface (UI Layer), hooks e domínio.

A UI Layer concentra as páginas e componentes, responsáveis por renderizar a interface do usuário e estruturar a navegação da aplicação. Os hooks encapsulam lógicas reutilizáveis, como regras de estado e integração com o backend, permitindo separar a lógica da apresentação. Já as interfaces definem contratos e tipagens, garantindo maior segurança e consistência no uso dos dados com TypeScript.

A comunicação com o backend (Express e Socket.IO) ocorre tanto por HTTP para operações tradicionais, quanto por leitura e escrita em tempo real via WebSocket, garantindo responsividade no chat.

## Executando o projeto

Para executar este projeto, execute os seguintes passos:

1. Instale as dependências do Node.js com
 `npm i`

2. Execute `npm run dev` para iniciar o servidor

3. Abra o navegador em `http://localhost:5173`
