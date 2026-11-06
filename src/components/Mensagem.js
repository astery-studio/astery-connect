import { cores, fontes, relevo } from '../tema'
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { BichinhoPixel } from "./IconePixel";

// Mostra o texto e o avatar na direção da mensagem.
export default function Mensagem({ mensagem, recebida, contatoCoelho }) {
    return (
        <View style={[styles.container, !recebida && styles.enviada]}>
            <BichinhoPixel coelho={recebida ? contatoCoelho : true} tamanho={32} />
            <View style={[styles.balao, recebida ? styles.balaoRecebido : styles.balaoEnviado]}>
                <View
                    pointerEvents="none"
                    style={[styles.ponta, recebida ? styles.pontaEsquerda : styles.pontaDireita]}
                />
                <Text style={styles.texto}>{mensagem}</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "flex-end",
        gap: 8,
    },
    enviada: {
        flexDirection: "row-reverse",
    },
    balao: {
        ...relevo,
        maxWidth: "80%",
        flexShrink: 1,
        padding: 12,
        borderRadius: 6,
    },
    balaoRecebido: {
        backgroundColor: cores.rosaBalao,
    },
    balaoEnviado: {
        backgroundColor: cores.baunilha,
    },
    ponta: {
        position: "absolute",
        width: 8,
        height: 8,
        bottom: 8,
        borderBottomWidth: 3,
        borderColor: cores.tinta,
    },
    pontaEsquerda: {
        left: -8,
        borderLeftWidth: 3,
        backgroundColor: cores.rosaBalao,
    },
    pontaDireita: {
        right: -8,
        borderRightWidth: 3,
        backgroundColor: cores.baunilha,
    },
    texto: {
        fontFamily: fontes.regular,
        fontSize: 16,
        color: cores.tinta,
    },
});
