import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Button from '@components/Button';
import StarWars from '@assets/images/star-wars.svg';
import {useColors} from '@utils/hooks/useColors';
import DefaultStyles from '@utils/styles/DefaultStyles';

interface WelcomeScreenProps {
  navigation: any;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation}) => {
  const colors = useColors();
  const defaultStyles = DefaultStyles();
  const styles = StyleSheet.create({
    descriptionText: {
      ...defaultStyles.textColorDefaultLighter,
      ...defaultStyles.textMedium,
      ...defaultStyles.defaultFontFamily,
    },
    titleText: {
      ...defaultStyles.textColorDefault,
      ...defaultStyles.textLarge,
      ...defaultStyles.defaultFontFamily,
      textAlign: 'center',
    },
  });

  let onButtonPress = () => {
    navigation.navigate('MainTabs');
  };
  return (
    <SafeAreaView style={{...defaultStyles.containerView, height: '100%'}}>
      <View style={{gap: 12, flex: 1}}>
        <View
          style={{
            alignItems: 'center',
            backgroundColor: '#000',
            borderRadius: 12,
            padding: 12,
          }}>
          <StarWars width={192} height={192}/>
        </View>
        <View
          style={{
            ...defaultStyles.containerForeground,
            padding: 12,
            maxHeight: 200,
            borderRadius: 12,
          }}>
          <Text style={styles.descriptionText}>
            <Text style={{fontSize: 16, ...defaultStyles.textColorDefault}}>
              ¡bienvenido!
            </Text>
            , en esta{' '}
            <Text style={{fontSize: 16, ...defaultStyles.textColorDefault}}>
              enciclopedia galáctica
            </Text>
            , podrás Explorar personajes, planetas y películas de star wars con
            datos en tiempo real de la api de SWApi
          </Text>
        </View>
      </View>
      <View style={{gap: 12, flex: 1}}>
        <Text style={styles.titleText}>🚀 ¿qué puedes hacer?</Text>
          <ScrollView>
        <View style={{
        ...defaultStyles.containerForeground,
        display: 'flex',
        padding: 12,
        borderRadius: 12,
        gap: 12,
          }}>
        {[
          {
            key: 'Explorar contenido galáctico',
            description:
          'Consulta información sobre películas, planetas y personajes icónicos.',
          },
          {
            key: 'Búsqueda avanzada',
            description:
          'Encuentra rápidamente a tus personajes favoritos con nuestro buscador interactivo.',
          },
          {
            key: 'Detalles en profundidad',
            description:
          'Accede a información detallada de cada personaje, planeta o película.',
          },
          {
            key: 'Experiencia envolvente',
            description:
          'Disfruta de una navegación intuitiva y atractiva que te transportará a una galaxia muy, muy lejana.',
          },
        ].map((item, index) => (
          <Text key={index} style={styles.descriptionText}>
            <Text style={{...defaultStyles.textColorDefault}}>
          🔹 {item.key}:
            </Text>{' '}
            {item.description}
          </Text>
        ))}
        </View>
          </ScrollView>
      </View>
      <View>
        <Button title="¡vamos allá!" onPress={onButtonPress} />
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
