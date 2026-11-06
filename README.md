<div align="center">
  <img src="docs/assets/capa-retro.gif" alt="Astery Connect em uma janela de chat retrô rosa" width="100%" />

  <br />

  <img src="https://img.shields.io/badge/React_Native-0.88-ef8db3?style=flat-square&logo=react&logoColor=6e2948" alt="React Native 0.88" />
  <img src="https://img.shields.io/badge/Expo-58-d9c6f1?style=flat-square&logo=expo&logoColor=6e2948" alt="Expo 58" />
  <img src="https://img.shields.io/badge/JavaScript-ES6+-fbd3e2?style=flat-square&logo=javascript&logoColor=6e2948" alt="JavaScript ES6+" />
</div>

## Sobre

O **Astery Connect** é um aplicativo mobile de mensagens desenvolvido para praticar navegação entre telas e organização de código em camadas com React Native e Expo.

O usuário escolhe um contato, abre uma conversa e envia mensagens. Cada conversa mantém seu próprio histórico enquanto o aplicativo permanece aberto.

> A identidade visual da aplicação ainda está em construção. A arte deste README apresenta o conceito retrô do projeto, não a interface final.

## O que já funciona

- listagem de contatos disponíveis;
- navegação da tela de contatos para a conversa selecionada;
- envio de mensagens com validação de texto vazio;
- mensagens exibidas em balões diferentes para envio e recebimento;
- histórico separado pelo identificador de cada contato;
- regras de negócio e armazenamento isolados da interface.

## Como o projeto foi organizado

<div align="center">
  <img src="docs/assets/arquitetura-retro.gif" alt="Fluxo entre interface, serviço e repositório em janelas retrô" width="760" />
</div>

```text
astery-connect/
├── App.js                         # Configuração das rotas
├── src/
│   ├── components/
│   │   └── Mensagem.js            # Balão de mensagem reutilizável
│   ├── screens/
│   │   ├── HomeScreen.js          # Lista de contatos
│   │   └── ChatScreen.js          # Conversa e envio de mensagens
│   ├── services/
│   │   └── MensagemService.js     # Regras de negócio
│   └── repositories/
│       └── MensagemRepository.js  # Armazenamento em memória
└── package.json
```

O fluxo principal é direto: a tela solicita uma operação ao serviço, o serviço aplica as regras necessárias e o repositório consulta ou altera os dados em memória.

## Tecnologias

| Tecnologia | Uso no projeto |
| --- | --- |
| React Native | Construção das telas e dos componentes mobile |
| Expo | Ambiente de desenvolvimento e execução |
| React Navigation | Navegação em pilha entre contatos e conversa |
| JavaScript | Componentes, estado e regras da aplicação |

## Como executar

### Pré-requisitos

- Node.js instalado;
- npm;
- Expo Go no celular ou um emulador Android/iOS configurado.

### Instalação

```bash
git clone https://github.com/astery-studio/astery-connect.git
cd astery-connect
npm install
```

### Iniciar o projeto

```bash
npm start
```

Depois, leia o QR Code com o Expo Go ou use uma das opções exibidas no terminal. Para iniciar diretamente no Android ou iOS:

```bash
npm run android
npm run ios
```

> O comando para iOS requer macOS com o simulador configurado.

## Fluxo da aplicação

1. A `HomeScreen` apresenta os contatos cadastrados localmente.
2. Ao abrir uma conversa, o identificador e o nome do contato seguem pela rota `Chat`.
3. A `ChatScreen` consulta no serviço apenas as mensagens daquele contato.
4. O serviço valida o conteúdo, cria a mensagem e solicita seu armazenamento ao repositório.
5. A lista é atualizada e o componente `Mensagem` define a aparência do balão.

## Limitações atuais

- as mensagens ficam somente em memória e são apagadas ao reiniciar o aplicativo;
- os contatos são dados estáticos definidos no código;
- ainda não há autenticação, API remota ou recebimento de mensagens em tempo real.

Essas limitações mantêm o foco do trabalho em navegação, componentes e separação de responsabilidades.
