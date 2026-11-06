import React from "react";
import { StyleSheet, Text, View } from "react-native";

const contatos = [
  { id: "1", nome: "Ana Souza" },
  { id: "2", nome: "Bruno Lima" },
  { id: "3", nome: "Carolina Alves" },
  { id: "4", nome: "Daniel Santos" },
];

function abrirConversa(navigation, contato) {
  navigation.navigate("ChatScreen", {
    contatoId: contato.id,
    contatoNome: contato.nome,
  });
}

function obterChave(item) {
  return item.id;
}

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Contatos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  titulo: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: "bold",
  },
});
