import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DefaultStyles from '@utils/styles/DefaultStyles';
import Button from '@components/Button';

interface MoviesScreenProps {
    navigation: any;
}


const MoviesScreen: React.FC<MoviesScreenProps> = ({navigation}) => {
    let defaultStyles = DefaultStyles();
    return (
        <SafeAreaView style={{...defaultStyles.containerView, height: '100%'}}>
            <View>
                <Text style={{
                    ...defaultStyles.textColorDefault,
                    ...defaultStyles.textLarge,
                    ...defaultStyles.defaultFontFamily,
                    marginTop: 12
                }}>Planetas</Text>
            </View>
            <View>
                
            </View>

        </SafeAreaView>
    )
};

export default MoviesScreen;