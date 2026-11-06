import { cores, fontes } from '../tema'
import { useEffect, useState } from 'react'
import { FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native'
import { useHeaderHeight } from '@react-navigation/elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconePixel, { BichinhoPixel, PapelPixel } from '../components/IconePixel'
import Mensagem from '../components/Mensagem'
import mensagemService from '../services/MensagemService'


export default function ChatScreen({ route }) {
    const { width, height, fontScale } = useWindowDimensions()
    const alturaCabecalho = useHeaderHeight()
    const telaEstreita = width < 360
    const telaBaixa = height < 500
    const envioCompacto = width / fontScale < 360
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
                style={[estilos.conteudo, telaEstreita && estilos.conteudoEstreito, telaBaixa && estilos.conteudoBaixo]}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={alturaCabecalho}
            >
                <View style={[estilos.janela, (telaEstreita || telaBaixa) && estilos.janelaCompacta]}>
                    <View style={estilos.faixaNome}>
                        <BichinhoPixel coelho={contatoCoelho} tamanho={26} />
                        <IconePixel nome="heart" cor={cores.destaque} tamanho={16} />
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
        paddingBottom: 12,
        flex: 1,
        backgroundColor: cores.escritorio,
    },
    conteudo: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 20,
    },
    conteudoEstreito: {
        paddingHorizontal: 12,
        paddingVertical: 12,
    },
    conteudoBaixo: {
        paddingVertical: 8,
    },
    janela: {
        width: '100%',
        maxWidth: 720,
        flex: 1,
        padding: 14,
        backgroundColor: cores.janela,
        borderWidth: 3,
        borderColor: cores.tinta,
        borderRightWidth: 5,
        borderBottomWidth: 5,
    },
    janelaCompacta: {
        padding: 10,
    },
    faixaNome: {
        padding: 12,
        marginBottom: 12,
        backgroundColor: cores.creme,
        borderWidth: 2,
        borderColor: cores.tinta,
        color: cores.tinta,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    nome: {
        flex: 1,
        color: cores.tinta,
        fontSize: 18,
        fontFamily: fontes.negrito,
    },
    lista: {
        flex: 1,
        backgroundColor: cores.vidro,
        borderWidth: 2,
        borderColor: cores.tinta,
    },
    rolagem: {
        flex: 1,
    },
    vazio: {
        alignItems: 'center',
        gap: 8,
        padding: 16,
        backgroundColor: cores.creme,
        borderWidth: 2,
        borderColor: cores.amora,
    },
    textoVazio: {
        color: cores.tinta,
        fontFamily: fontes.regular,
        fontSize: 16,
        textAlign: 'center',
    },
    mensagens: {
        padding: 14,
    },
    envio: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        gap: 10,
    },
    envioCompacto: {
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    campo: {
        fontFamily: fontes.regular,
        flex: 1,
        minHeight: 44,
        padding: 8,
        backgroundColor: cores.creme,
        borderWidth: 2,
        borderColor: cores.tinta,
        color: cores.tinta,
    },
    campoCompacto: {
        flex: 0,
    },
    botao: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        minHeight: 44,
        justifyContent: 'center',
        paddingHorizontal: 10,
        backgroundColor: cores.rosaForte,
        borderWidth: 2,
        borderColor: cores.tinta,
        borderBottomWidth: 4,
    },
    botaoTexto: {
        color: cores.tinta,
        fontFamily: fontes.seminegrito,
    },
})
