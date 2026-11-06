import { StyleSheet, View } from 'react-native'
import Svg, { Defs, Path, Pattern, Rect } from 'react-native-svg'

// Caminhos dos SVGs oficiais da Pixelarticons 2.4.2.
const caminhos = {
    'arrow-left': 'M20 11v2H4v-2zM8 13v2H6v-2zm2 2v2H8v-2zm2 2v2h-2v-2zm-4-6V9H6v2z M10 15V7H8v8zm2 2V5h-2v12z',
    'chevron-right': 'M16 13v-2h-2v2h2Zm-2-2V9h-2v2h2Zm0 4v-2h-2v2h2Zm-2-6V7h-2v2h2Zm0 8v-2h-2v2h2ZM10 7V5H8v2h2Zm0 12v-2H8v2h2Z',
    'heart': 'M13 22h-2v-2h2v2Zm-2-2H9v-2h2v2Zm4 0h-2v-2h2v2Zm-6-2H7v-2h2v2Zm8 0h-2v-2h2v2ZM7 16H5v-2h2v2Zm12 0h-2v-2h2v2ZM5 14H3v-2h2v2Zm16 0h-2v-2h2v2ZM3 12H1V6h2v6Zm20 0h-2V6h2v6ZM13 8h-2V6h2v2ZM5 6H3V4h2v2Zm6 0H9V4h2v2Zm4 0h-2V4h2v2Zm6 0h-2V4h2v2ZM9 4H5V2h4v2Zm10 0h-4V2h4v2Z',
    'sparkles': 'M11 1h2v4h-2zm0 22h2v-4h-2zM9 5h2v4H9zm0 14h2v-4H9zm4-14h2v4h-2zm0 14h2v-4h-2zM5 9h4v2H5zm14 0h-4v2h4zM1 11h4v2H1zm22 0h-4v2h4zM5 13h4v2H5zm14 0h-4v2h4zm0-12h2v6h-2z M17 3h6v2h-6zM3 17h2v2H3zm-2 2h2v2H1zm2 2h2v2H3zm2-2h2v2H5z',
}

// Desenha o ícone escolhido. O elemento que o usa fornece o rótulo acessível.
export default function IconePixel({ nome, cor = '#7c305a', tamanho = 20 }) {
    return (
        <Svg width={tamanho} height={tamanho} viewBox="0 0 24 24" accessible={false}>
            <Path d={caminhos[nome]} fill={cor} />
        </Svg>
    )
}

/*
MIT License

Copyright (c) 2019 Gerrit Halfmann

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

// Desenha um avatar pixelado de gato ou coelho em duas cores.
export function BichinhoPixel({ coelho = false, tamanho = 36 }) {
    const pelagem = coelho ? '#fff6e9' : '#f9bfd7'
    const contorno = coelho
        ? 'M4 1h5v7h6V1h5v10h2v9h-2v2H4v-2H2v-9h2z'
        : 'M2 3h5v2h2v3h6V5h2V3h5v17h-2v2H4v-2H2z'
    const rosto = coelho
        ? 'M6 3h1v7h10V3h1v9h2v7h-2v1H6v-1H4v-7h2z'
        : 'M4 5h2v2h2v3h8V7h2V5h2v14h-2v1H6v-1H4z'

    return (
        <Svg width={tamanho} height={tamanho} viewBox="0 0 24 24" accessible={false}>
            <Path d={contorno} fill="#512740" />
            <Path d={rosto} fill={pelagem} />
            <Path d="M6 15h3v2H6zm9 0h3v2h-3z" fill="#e77ca5" />
            <Path d="M7 12h2v2H7zm8 0h2v2h-2zm-4 4h2v1h-2z" fill="#512740" />
            <Path d="M9 5h2v1h2V5h2v4h-2V8h-2v1H9z" fill="#a64473" />
            <Path d="M10 6h1v2h-1zm3 0h1v2h-1z" fill="#ffe0ec" />
        </Svg>
    )
}

// Preenche a área disponível com quadrados e brilhos decorativos.
export function PapelPixel({ rosa = false }) {
    return (
        <View style={StyleSheet.absoluteFill} pointerEvents="none" importantForAccessibility="no-hide-descendants">
            <Svg width="100%" height="100%" accessible={false}>
                <Defs>
                    <Pattern id="papel-pixel" width={64} height={64} patternUnits="userSpaceOnUse">
                        <Rect width={64} height={64} fill={rosa ? '#f7e2f1' : '#dce5fa'} />
                        <Path d="M0 0h16v16H0zm32 32h16v16H32z" fill={rosa ? '#edd4f3' : '#efd5f0'} />
                        <Path d="M16 16h16v16H16zm32 32h16v16H48z" fill="#fff5fb" opacity={0.8} />
                        <Path d="M46 10h2v4h4v2h-4v4h-2v-4h-4v-2h4z" fill="#fff3bc" />
                        <Path d="M11 42h2v3h3v2h-3v3h-2v-3H8v-2h3z" fill="#d994bc" />
                    </Pattern>
                </Defs>
                <Rect width="100%" height="100%" fill="url(#papel-pixel)" />
            </Svg>
        </View>
    )
}
