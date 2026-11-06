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

const Stack = createStackNavigator()

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
                        headerStyle: { backgroundColor: '#f6bfd4', borderBottomColor: '#512740', borderBottomWidth: 3 },
                        headerTintColor: '#512740',
                        headerTitleStyle: { fontFamily: 'PixelifySans_700Bold', letterSpacing: 1 },
                        cardStyle: { backgroundColor: '#f9e5f1' },
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
                        options={{ title: 'chat.exe' }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}
