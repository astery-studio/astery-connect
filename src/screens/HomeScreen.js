function abrirConversa(navigation, contato) {
  navigation.navigate("ChatScreen", {
    contatoId: contato.id,
    contatoNome: contato.nome,
  });
}
