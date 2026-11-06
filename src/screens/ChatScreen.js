import { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import Mensagem from '../components/Mensagem';
import mensagemService from '../services/MensagemService';

// Recebe o contato pela rota e mostra a conversa com o campo de envio.
export default function ChatScreen({ route }) {
  const { contatoId, nome } = route.params;
  const [mensagens, setMensagens] = useState([]);
  const [texto, setTexto] = useState('');

  // Busca as mensagens do contato quando a conversa é aberta ou trocada.
  useEffect(() => {
    setMensagens(mensagemService.getMensagens(contatoId));
  }, [contatoId]);

  // Envia o texto digitado, atualiza a lista e limpa o campo.
  function enviarMensagem() {
    const textoDigitado = texto.trim();
    if (textoDigitado === '') {
      return;
    }

    mensagemService.enviarMensagem(contatoId, textoDigitado);
    setMensagens(mensagemService.getMensagens(contatoId));
    setTexto('');
  }

  // Recebe um item da lista e passa seu texto e tipo para o componente.
  function renderizarMensagem({ item }) {
    return <Mensagem mensagem={item.texto} recebida={item.recebida} />;
  }

  return (
    <View style={estilos.tela}>
      <Text style={estilos.nome}>{nome}</Text>

      <FlatList
        data={mensagens}
        renderItem={renderizarMensagem}
      />

      <View style={estilos.envio}>
        <TextInput
          style={estilos.campo}
          placeholder="Digite uma mensagem"
          value={texto}
          onChangeText={setTexto}
        />
        <Button title="Enviar" onPress={enviarMensagem} />
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  tela: {
    flex: 1,
    padding: 16,
  },
  nome: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  envio: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  campo: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    padding: 8,
    marginRight: 8,
  },
});
