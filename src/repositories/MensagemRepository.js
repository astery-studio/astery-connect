class MensagemRepository {
  // Cria o array que armazena as mensagens enquanto o aplicativo estiver aberto.
  constructor() {
    this.mensagens = [];
  }
}

export default new MensagemRepository();
