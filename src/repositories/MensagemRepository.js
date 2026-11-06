class MensagemRepository {
  // Cria o array que armazena as mensagens enquanto o aplicativo estiver aberto.
  constructor() {
    this.mensagens = [];
  }

  // Recebe o id de um contato e retorna somente as mensagens desse contato.
  getMensagens(contatoId) {
    const mensagensDoContato = [];

    for (let i = 0; i < this.mensagens.length; i += 1) {
      if (this.mensagens[i].contatoId === contatoId) {
        mensagensDoContato.push(this.mensagens[i]);
      }
    }

    return mensagensDoContato;
  }
}

export default new MensagemRepository();
