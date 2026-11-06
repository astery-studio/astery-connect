import { cores, fontes } from '../tema'
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { BichinhoPixel } from "./IconePixel";

// Mostra o texto e o avatar na direção da mensagem.
export default function Mensagem({ mensagem, recebida, contatoCoelho }) {
    return (
        <View style={[styles.container, !recebida && styles.enviada]}>
            <BichinhoPixel coelho={recebida ? contatoCoelho : true} tamanho={32} />
            <View style={[styles.balao, recebida ? styles.balaoRecebido : styles.balaoEnviado]}>
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
        maxWidth: "80%",
        flexShrink: 1,
        padding: 12,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: cores.tinta,
        borderRightWidth: 4,
        borderBottomWidth: 4,
    },
    balaoRecebido: {
        backgroundColor: cores.rosaBalao,
    },
    balaoEnviado: {
        backgroundColor: cores.baunilha,
    },
    texto: {
        fontFamily: fontes.regular,
        fontSize: 16,
        color: cores.tinta,
    },
});
