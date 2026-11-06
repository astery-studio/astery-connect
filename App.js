import { cores, fontes } from './src/tema'
import { StyleSheet } from 'react-native'
import { useFonts } from 'expo-font'
import {
    PixelifySans_400Regular,
    PixelifySans_500Medium,
    PixelifySans_600SemiBold,
    PixelifySans_700Bold,
} from '@expo-google-fonts/pixelify-sans'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './src/screens/HomeScreen'
import ChatScreen from './src/screens/ChatScreen'

import IconePixel from './src/components/IconePixel'

const Stack = createStackNavigator()

// Desenha o ícone de voltar com a cor definida pelo navegador.
function renderizarIconeVoltar({ tintColor }) {
    return <IconePixel nome="arrow-left" cor={tintColor} tamanho={32} />
}

// Carrega as fontes antes de montar as telas.
export default function App() {
    const [fontesCarregadas, erroFonte] = useFonts({
        PixelifySans_400Regular,
        PixelifySans_500Medium,
        PixelifySans_600SemiBold,
        PixelifySans_700Bold,
    })

    if (!fontesCarregadas && !erroFonte) {
        return null
    }

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        headerStyle: { backgroundColor: cores.rosa, borderBottomColor: cores.tinta, borderBottomWidth: 3 },
                        headerBackImage: renderizarIconeVoltar,
                        headerTintColor: cores.tinta,
                        headerTitleStyle: { fontFamily: fontes.negrito, letterSpacing: 1 },
                        cardStyle: { backgroundColor: cores.escritorio },
                    }}
                >
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ title: 'astery.exe' }}
                    />
                    <Stack.Screen
                        name="Chat"
                        component={ChatScreen}
                        options={{
                            title: 'chat.exe',
                            headerBackButtonDisplayMode: 'minimal',
                            headerLeftContainerStyle: estilos.areaVoltar,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

const estilos = StyleSheet.create({
    areaVoltar: {
        paddingStart: 16,
    },
})
