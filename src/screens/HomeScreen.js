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
