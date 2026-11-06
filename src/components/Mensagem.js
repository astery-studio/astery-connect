import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Mensagem({ mensagem, recebida }) {
    return (
        <View
        style={[
            styles.container,
            recebida ? styles.recebida : styles.enviada,
        ]}
        >
        <View
            style={[
            styles.balao,
            recebida ? styles.balaoRecebido : styles.balaoEnviado,
            ]}
        >
            <Text style={styles.texto}>{mensagem}</Text>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 8,
    },
    recebida: {
        alignItems: "flex-start",
    },
    enviada: {
        alignItems: "flex-end",
    },
    balao: {
        maxWidth: "80%",
        padding: 12,
        borderRadius: 10,
    },
    balaoRecebido: {
        backgroundColor: "#eeeeee",
    },
    balaoEnviado: {
        backgroundColor: "#d9fdd3",
    },
    texto: {
        fontSize: 16,
        color: "#222222",
    },
});
