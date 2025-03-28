import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { DefaultStyles } from '@utils/styles/DefaultStyles';

interface ButtonProps {
    title: string;
    onPress: () => void;
    style?: object;
    textStyle?: object;
    disabled?: boolean;
}


const Button: React.FC<ButtonProps> = ({ title, onPress, style, textStyle, disabled }) => {
    const defaultStyles = DefaultStyles();
    return (
        <TouchableOpacity
            style={{
                ...defaultStyles.button,
                ...style,
                backgroundColor: disabled ? defaultStyles.buttonColorDisabled.backgroundColor : defaultStyles.buttonColorPrimary.backgroundColor,
                opacity: disabled ? 0.5 : 1
            }}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={{ ...defaultStyles.buttonText, ...textStyle }}>{title}</Text>
        </TouchableOpacity>
    );
};


export default Button;