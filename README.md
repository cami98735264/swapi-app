# Documentación del Proyecto React Native

## Tabla de Contenidos
1. [Introducción](#introducción)
2. [Requisitos Previos](#requisitos-previos)
3. [Configuración del Entorno](#configuración-del-entorno)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Desarrollo](#desarrollo)
6. [Despliegue](#despliegue)
7. [Solución de Problemas](#solución-de-problemas)

## Introducción
Este es un proyecto de [React Native](https://reactnative.dev) creado utilizando [`@react-native-community/cli`](https://github.com/react-native-community/cli). React Native es un framework que permite desarrollar aplicaciones móviles nativas utilizando JavaScript y React.

## Requisitos Previos
Antes de comenzar, asegúrate de tener instalado:
- Node.js (versión 14 o superior)
- npm o yarn
- Android Studio (para desarrollo Android)
- Xcode (para desarrollo iOS, solo macOS)
- JDK (Java Development Kit)
- CocoaPods (para iOS)

## Configuración del Entorno
1. Clona el repositorio
2. Instala las dependencias:
   ```bash
   npm install
   # o
   yarn install
   ```

3. Para iOS, instala las dependencias de CocoaPods:
   ```bash
   cd ios
   pod install
   cd ..
   ```

## Estructura del Proyecto
```
src/
├── App.tsx          # Componente principal de la aplicación
├── components/      # Componentes reutilizables
├── screens/         # Pantallas de la aplicación
├── navigation/      # Configuración de navegación
├── services/        # Servicios y llamadas API
├── utils/           # Utilidades y helpers
└── assets/          # Recursos estáticos (imágenes, fuentes, etc.)
```

## Desarrollo

### Iniciar el Servidor Metro
```bash
npm start
# o
yarn start
```

### Ejecutar la Aplicación

#### Android
```bash
npm run android
# o
yarn android
```

#### iOS
```bash
npm run ios
# o
yarn ios
```

### Recarga en Cliente
- **Android**: Presiona <kbd>R</kbd> dos veces o selecciona "Recargar" en el Menú de Desarrollo (<kbd>Ctrl</kbd> + <kbd>M</kbd>)
- **iOS**: Presiona <kbd>R</kbd> en el Simulador de iOS

## Despliegue

### Android
1. Genera el APK:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

2. El APK se encontrará en: `android/app/build/outputs/apk/release/`

### iOS
1. Abre el proyecto en Xcode:
   ```bash
   cd ios
   open YourApp.xcworkspace
   ```

2. Configura el certificado de distribución
3. Archiva y distribuye la aplicación

## Solución de Problemas

### Problemas Comunes
1. **Error de Metro**: 
   - Detén Metro: <kbd>Ctrl</kbd> + <kbd>C</kbd>
   - Limpia la caché: `npm start -- --reset-cache`

2. **Problemas con CocoaPods**:
   ```bash
   cd ios
   pod deintegrate
   pod install
   ```

3. **Problemas de Gradle**:
   ```bash
   cd android
   ./gradlew clean
   ```

### Recursos Adicionales
- [Documentación Oficial de React Native](https://reactnative.dev/docs/getting-started)
- [Guía de Solución de Problemas](https://reactnative.dev/docs/troubleshooting)
- [Comunidad de React Native](https://reactnative.dev/help)

## Contribución
1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia
Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles. 