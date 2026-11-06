import { useEffect, useState } from 'react'
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import Mensagem from '../components/Mensagem'
import mensagemService from '../services/MensagemService'


export default function ChatScreen({ route }) {
    const { contatoId, nome } = route.params
    const [mensagens, setMensagens] = useState([])
    const [texto, setTexto] = useState('')

    useEffect(() => {
        setMensagens(mensagemService.getMensagens(contatoId));
    }, [contatoId]);

    function enviarMensagem() {
        const textoDigitado = texto.trim()
        if (textoDigitado === '') {
            return
        }

        mensagemService.enviarMensagem(contatoId, textoDigitado)
        setMensagens(mensagemService.getMensagens(contatoId))
        setTexto('')
    }

    function renderizarMensagem({ item }) {
        return <Mensagem 
                    mensagem={item.texto} 
                    recebida={item.recebida} 
                />
    }

    return (
        <View style={estilos.tela}>
            <Text style={estilos.nome}>
                {nome}
            </Text>

            <FlatList
                data={mensagens}
                renderItem={renderizarMensagem}
            />

            <View style={estilos.envio}>
                <TextInput
                    style={estilos.campo}
                    placeholder="Digite uma mensagem"
                    value={texto}
                    onChangeText={setTexto}
                />
                <Button title="Enviar" onPress={enviarMensagem} />
            </View>
        </View>
    )
}

const estilos = StyleSheet.create({
    tela: {
        flex: 1,
        padding: 16,
    },

    nome: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },

    envio: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },
    
    campo: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#999',
        padding: 8,
        marginRight: 8,
    },
})
