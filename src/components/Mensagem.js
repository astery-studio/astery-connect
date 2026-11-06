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
        marginBottom: 12,
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
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#512740",
        borderRightWidth: 4,
        borderBottomWidth: 4,
    },
    balaoRecebido: {
        backgroundColor: "#f6bfd4",
    },
    balaoEnviado: {
        backgroundColor: "#fff5f8",
    },
    texto: {
        fontFamily: "PixelifySans_400Regular",
        fontSize: 16,
        color: "#512740",
    },
});
