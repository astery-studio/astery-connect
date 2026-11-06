import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

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
  function renderizarContato({ item }) {
    return (
      <View style={styles.contato}>
        <Text style={styles.nome}>{item.nome}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Contatos</Text>

      <FlatList
        data={contatos}
        keyExtractor={obterChave}
        renderItem={renderizarContato}
      />
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
  contato: {
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
  },
  nome: {
    marginBottom: 10,
    fontSize: 18,
  },
});
