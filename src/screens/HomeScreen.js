import React from "react";
import { FlatList, TouchableOpacity, StyleSheet, Text, useWindowDimensions, View } from "react-native";

import { SafeAreaView } from 'react-native-safe-area-context';

import IconePixel from '../components/IconePixel';

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
  const { width } = useWindowDimensions();

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
        <View style={styles.icone}><IconePixel nome="heart" /></View>
        <Text style={styles.nome}>{item.nome}</Text>
        <IconePixel nome="chevron-right" />
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <View style={[styles.janela, width < 360 && styles.janelaCompacta]}>
        <View style={styles.faixaTitulo}>
          <IconePixel nome="sparkles" />
          <Text style={styles.titulo}>Contatos</Text>
        </View>

        <FlatList
          data={contatos}
          keyExtractor={obterChave}
          renderItem={renderizarContato}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 8,
    backgroundColor: "#f9e5f1",
  },
  janela: {
    width: "100%",
    maxWidth: 640,
    marginVertical: 12,
    flex: 1,
    padding: 12,
    backgroundColor: "#e7dcf7",
    borderWidth: 3,
    borderColor: "#512740",
    borderRightWidth: 5,
    borderBottomWidth: 5,
  },
  janelaCompacta: {
    padding: 8,
  },
  faixaTitulo: {
    padding: 12,
    marginBottom: 14,
    backgroundColor: "#f6bfd4",
    borderWidth: 2,
    borderColor: "#512740",
    color: "#512740",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titulo: {
    flex: 1,
    color: "#512740",
    fontSize: 21,
    fontFamily: "PixelifySans_700Bold",
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
    fontFamily: "PixelifySans_600SemiBold",
  },
});
