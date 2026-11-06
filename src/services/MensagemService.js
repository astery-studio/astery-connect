import MensagemRepository from '../repositories/MensagemRepository'

class MensagemService {
    // Recebe o repositório usado para consultar e salvar as mensagens.
    constructor(repositorio) {
        this.repositorio = repositorio
        this.proximoId = 1
    }

    // Recebe o ID do contato e retorna as mensagens daquela conversa.
    getMensagens(contatoId) {
        return this.repositorio.getMensagens(contatoId)
    }

    // Recebe o contato e o texto, ignora mensagens vazias e salva o envio.
    enviarMensagem(contatoId, texto) {
        const textoDigitado = texto.trim()
        if (textoDigitado === '') {
            return
        }

        const mensagem = {
            id: 'enviada-' + this.proximoId,
            contatoId,
            texto: textoDigitado,
            recebida: false,
        }

        this.repositorio.adicionarMensagem(mensagem)
        this.proximoId += 1
    }
}

export default new MensagemService(new MensagemRepository())
