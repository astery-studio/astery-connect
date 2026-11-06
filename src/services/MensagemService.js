import MensagemRepository from '../repositories/MensagemRepository'

class MensagemService {
    constructor(repositorio) {
        this.repositorio = repositorio
        this.proximoId = 1
    }

    getMensagens(contatoId) {
        return this.repositorio.getMensagens(contatoId)
    }

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
