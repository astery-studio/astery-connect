import { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity, StyleSheet, Text, TextInput, View } from 'react-native'
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

    // Mostra o texto e o alinhamento de cada mensagem.
    function renderizarMensagem({ item }) {
        return <Mensagem mensagem={item.texto} recebida={item.recebida} />
    }

    return (
        <View style={estilos.tela}>
            <View style={estilos.janela}>
                <Text style={estilos.nome}>
                    {'✦  '}{nome}
                </Text>

                <FlatList
                    style={estilos.lista}
                    contentContainerStyle={estilos.mensagens}
                    data={mensagens}
                    renderItem={renderizarMensagem}
                />

                <View style={estilos.envio}>
                    <TextInput
                        style={estilos.campo}
                        placeholder="Digite uma mensagem"
                        placeholderTextColor="#775568"
                        accessibilityLabel="Mensagem"
                        value={texto}
                        onChangeText={setTexto}
                    />
                    <TouchableOpacity
                        style={estilos.botao}
                        accessibilityRole="button"
                        onPress={enviarMensagem}
                    >
                        <Text style={estilos.botaoTexto}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const estilos = StyleSheet.create({
    tela: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9e5f1',
    },
    janela: {
        flex: 1,
        padding: 8,
        backgroundColor: '#f6bfd4',
        borderWidth: 3,
        borderColor: '#512740',
        borderRightWidth: 5,
        borderBottomWidth: 5,
    },
    nome: {
        padding: 10,
        marginBottom: 8,
        backgroundColor: '#fff5f8',
        borderWidth: 2,
        borderColor: '#512740',
        color: '#512740',
        fontSize: 18,
        fontWeight: 'bold',
    },
    lista: {
        flex: 1,
        backgroundColor: '#e7dcf7',
        borderWidth: 2,
        borderColor: '#512740',
    },
    mensagens: {
        padding: 12,
    },
    envio: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    campo: {
        flex: 1,
        minHeight: 44,
        padding: 8,
        marginRight: 8,
        backgroundColor: '#fff5f8',
        borderWidth: 2,
        borderColor: '#512740',
        color: '#512740',
    },
    botao: {
        minHeight: 44,
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#eea4c3',
        borderWidth: 2,
        borderColor: '#512740',
        borderBottomWidth: 4,
    },
    botaoTexto: {
        color: '#512740',
        fontWeight: 'bold',
    },
})
