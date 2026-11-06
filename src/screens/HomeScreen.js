import React from "react";
import { FlatList, TouchableOpacity, StyleSheet, Text, View } from "react-native";

const contatos = [
  { id: "1", nome: "Ana Souza" },
  { id: "2", nome: "Bruno Lima" },
  { id: "3", nome: "Carolina Alves" },
  { id: "4", nome: "Daniel Santos" },
];

function abrirConversa(navigation, contato) {
  navigation.navigate("Chat", {
    contatoId: contato.id,
    nome: contato.nome,
  });
}

function obterChave(item) {
  return item.id;
}

export default function HomeScreen({ navigation }) {
  function renderizarContato({ item }) {
    function selecionarContato() {
      abrirConversa(navigation, item);
    }

    return (
      <TouchableOpacity
        style={styles.contato}
        onPress={selecionarContato}
        accessibilityRole="button"
        accessibilityLabel={`Abrir conversa com ${item.nome}`}
      >
        <Text style={styles.icone} accessibilityElementsHidden importantForAccessibility="no">♥</Text>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.seta} accessibilityElementsHidden importantForAccessibility="no">›</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.janela}>
        <Text style={styles.titulo}>✦  Contatos</Text>

        <FlatList
          data={contatos}
          keyExtractor={obterChave}
          renderItem={renderizarContato}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9e5f1",
  },
  janela: {
    flex: 1,
    padding: 12,
    backgroundColor: "#e7dcf7",
    borderWidth: 3,
    borderColor: "#512740",
    borderRightWidth: 5,
    borderBottomWidth: 5,
  },
  titulo: {
    padding: 12,
    marginBottom: 14,
    backgroundColor: "#f6bfd4",
    borderWidth: 2,
    borderColor: "#512740",
    color: "#512740",
    fontSize: 21,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  contato: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    padding: 12,
    backgroundColor: "#fff5f8",
    borderWidth: 2,
    borderColor: "#512740",
    borderBottomWidth: 4,
  },
  icone: {
    padding: 6,
    marginRight: 10,
    backgroundColor: "#f6bfd4",
    color: "#7c305a",
    borderWidth: 2,
    borderColor: "#512740",
  },
  nome: {
    flex: 1,
    color: "#512740",
    fontSize: 16,
    fontWeight: "bold",
  },
  seta: {
    marginLeft: 8,
    color: "#7c305a",
    fontSize: 24,
  },
});
