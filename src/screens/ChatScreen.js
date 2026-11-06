import { useEffect, useState } from 'react'
import { FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconePixel, { BichinhoPixel, PapelPixel } from '../components/IconePixel'
import Mensagem from '../components/Mensagem'
import mensagemService from '../services/MensagemService'


export default function ChatScreen({ route }) {
    const { width, fontScale } = useWindowDimensions()
    const alturaCabecalho = useHeaderHeight()
    const envioCompacto = width / fontScale < 320
    const { contatoId, nome } = route.params
    const contatoCoelho = Number(contatoId) % 2 === 0
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
        return <Mensagem mensagem={item.texto} recebida={item.recebida} contatoCoelho={contatoCoelho} />
    }

    return (
        <SafeAreaView style={estilos.tela} edges={['left', 'right', 'bottom']}>
            <PapelPixel />
            <KeyboardAvoidingView
                style={estilos.conteudo}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={alturaCabecalho}
            >
                <View style={estilos.janela}>
                    <View style={estilos.faixaNome}>
                        <BichinhoPixel coelho={contatoCoelho} tamanho={26} />
                        <IconePixel nome="heart" cor="#c75789" tamanho={16} />
                        <Text style={estilos.nome}>{nome}</Text>
                    </View>

                    <View style={estilos.lista}>
                        <FlatList
                            style={estilos.rolagem}
                            contentContainerStyle={estilos.mensagens}
                            data={mensagens}
                            keyboardShouldPersistTaps="handled"
                            renderItem={renderizarMensagem}
                            ListEmptyComponent={
                                <View style={estilos.vazio}>
                                    <BichinhoPixel coelho={contatoCoelho} tamanho={64} />
                                    <Text style={estilos.textoVazio}>Ainda não há mensagens</Text>
                                </View>
                            }
                        />
                    </View>

                    <View style={[estilos.envio, envioCompacto && estilos.envioCompacto]}>
                        <TextInput
                            style={[estilos.campo, envioCompacto && estilos.campoCompacto]}
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
                            <IconePixel nome="heart" cor="#83315f" tamanho={16} />
                            <Text style={estilos.botaoTexto}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const estilos = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: '#f9e5f1',
    },
    conteudo: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 8,
    },
    janela: {
        width: '100%',
        maxWidth: 720,
        flex: 1,
        padding: 8,
        backgroundColor: 'rgba(246, 191, 212, 0.72)',
        borderWidth: 3,
        borderColor: '#512740',
        borderRightWidth: 5,
        borderBottomWidth: 5,
    },
    faixaNome: {
        padding: 10,
        marginBottom: 8,
        backgroundColor: '#fff5f8',
        borderWidth: 2,
        borderColor: '#512740',
        color: '#512740',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    nome: {
        flex: 1,
        color: '#512740',
        fontSize: 18,
        fontFamily: 'PixelifySans_700Bold',
    },
    lista: {
        flex: 1,
        backgroundColor: 'rgba(231, 220, 247, 0.25)',
        borderWidth: 2,
        borderColor: '#512740',
    },
    rolagem: {
        flex: 1,
    },
    vazio: {
        alignItems: 'center',
        gap: 8,
        padding: 16,
        backgroundColor: '#fff5f8',
        borderWidth: 2,
        borderColor: '#985577',
    },
    textoVazio: {
        color: '#512740',
        fontFamily: 'PixelifySans_400Regular',
        fontSize: 16,
        textAlign: 'center',
    },
    mensagens: {
        padding: 12,
    },
    envio: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    envioCompacto: {
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 8,
    },
    campo: {
        fontFamily: 'PixelifySans_400Regular',
        flex: 1,
        minHeight: 44,
        padding: 8,
        marginRight: 8,
        backgroundColor: '#fff5f8',
        borderWidth: 2,
        borderColor: '#512740',
        color: '#512740',
    },
    campoCompacto: {
        flex: 0,
        marginRight: 0,
    },
    botao: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        minHeight: 44,
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#f49ccd',
        borderWidth: 2,
        borderColor: '#512740',
        borderBottomWidth: 4,
    },
    botaoTexto: {
        color: '#512740',
        fontFamily: 'PixelifySans_600SemiBold',
    },
})
