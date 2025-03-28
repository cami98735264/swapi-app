import { View, TextInput } from "react-native";
import DefaultStyles from "@utils/styles/DefaultStyles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface StyledInputProps {
    setValue: React.Dispatch<React.SetStateAction<string>>;
    value: string;
    placeholder: string;
    icon?: string;
}

const StyledInput: React.FC<StyledInputProps> = ({ value, setValue, placeholder, icon }) => {
    let defaultStyles = DefaultStyles();
    let textColor = { ...defaultStyles.textColorDefaultLight };
    return (
        <View style={defaultStyles.inputSection}>
            <TextInput
                style={defaultStyles.input}
                onChangeText={setValue}
                value={value}
                placeholder={placeholder}
            />
            {icon && <MaterialIcons name={icon} size={28} color={textColor.color} style={{ flex: 0 }} />}
        </View>
    );
}

export default StyledInput;
