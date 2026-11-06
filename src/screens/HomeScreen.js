import { cores, fontes, relevo } from '../tema'
import React from "react";
import { FlatList, TouchableOpacity, StyleSheet, Text, useWindowDimensions, View } from "react-native";

import { SafeAreaView } from 'react-native-safe-area-context';

import IconePixel, { BichinhoPixel, PapelPixel } from '../components/IconePixel';

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
  const telaEstreita = width < 360;

  function renderizarContato({ item }) {
    function selecionarContato() {
      abrirConversa(navigation, item);
    }

    return (
      <TouchableOpacity
        style={styles.contato}
        activeOpacity={0.72}
        onPress={selecionarContato}
        accessibilityRole="button"
        accessibilityLabel={`Abrir conversa com ${item.nome}`}
      >
        <View style={styles.icone}><BichinhoPixel coelho={Number(item.id) % 2 === 0} /></View>
        <Text style={styles.nome}>{item.nome}</Text>
        <IconePixel nome="chevron-right" cor={cores.ameixa} />
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={[styles.container, telaEstreita && styles.containerCompacto]} edges={["left", "right", "bottom"]}>
      <PapelPixel rosa />
      <View style={[styles.janela, telaEstreita && styles.janelaCompacta]}>
        <View style={styles.faixaTitulo}>
          <IconePixel nome="sparkles" cor={cores.ameixa} />
          <Text accessibilityRole="header" style={styles.titulo}>Contatos</Text>
        </View>

        <FlatList
          contentContainerStyle={styles.lista}
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
    paddingHorizontal: 24,
    backgroundColor: cores.escritorio,
  },
  containerCompacto: {
    paddingHorizontal: 12,
  },
  janela: {
    width: "100%",
    maxWidth: 640,
    marginVertical: 20,
    flex: 1,
    padding: 16,
    backgroundColor: cores.rosa,
    ...relevo,
  },
  janelaCompacta: {
    padding: 12,
    marginVertical: 12,
  },
  faixaTitulo: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    backgroundColor: cores.creme,
    borderLeftWidth: 4,
    borderLeftColor: cores.ameixa,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  titulo: {
    flex: 1,
    color: cores.tinta,
    fontSize: 24,
    fontFamily: fontes.negrito,
  },
  lista: {
    paddingRight: 4,
    paddingBottom: 4,
  },
  contato: {
    ...relevo,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    padding: 16,
    backgroundColor: cores.creme,
  },
  icone: {
    padding: 6,
    marginRight: 10,
    backgroundColor: cores.rosa,
    color: "#7c305a",
    borderWidth: 2,
    borderColor: cores.tinta,
  },
  nome: {
    flex: 1,
    color: cores.tinta,
    fontSize: 16,
    fontFamily: fontes.seminegrito,
  },
});
