import DefaultStyles from "utils/styles/DefaultStyles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ExternalDropdown from 'react-native-input-select';
import { Text, View } from "react-native";


interface DropdownProps {
    isMultiple?: boolean;
    placeholderStyle?: any;
    dropdownStyle?: any;
    dropdownIcon?: any;
    dropdownIconStyle?: any;
    placeholder?: string;
    options: any[];
    searchControlTextInputStyle?: boolean;
    selectedValue: string;
    onValueChange?: (selectedItems: any) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
    placeholderStyle,
    dropdownStyle,
    dropdownIcon,
    isMultiple,
    dropdownIconStyle,
    placeholder,
    options,
    selectedValue,
    onValueChange
}) => {
    const defaultStyles = DefaultStyles();
    const textColor = { ... defaultStyles.textColorDefaultLight };

    return (
        <ExternalDropdown
            searchControls={{
                textInputStyle: { ...defaultStyles.searchControlTextInputStyle },
                textInputProps: {
                    placeholder: "Buscar...",
                    placeholderTextColor: defaultStyles.textColorDefaultLighter.color,
                }
            }}
            selectedItemStyle={{
                ...defaultStyles.defaultFontFamily,
                ...defaultStyles.textColorDefaultLighter,
                ...defaultStyles.textSmall
            }}
            checkboxControls={{
                checkboxLabelStyle: { ...defaultStyles.textColorDefaultLight, ...defaultStyles.defaultFontFamily, ...defaultStyles.textSmall },
            }}
            modalControls={{
                modalOptionsContainerStyle: { ...defaultStyles.containerBackground },
            }}
            multipleSelectedItemStyle={{ ...defaultStyles.multipleSelectedItemStyle }}
            isSearchable={true}
            listComponentStyles={{
                listEmptyComponentStyle: { ...defaultStyles.textColorDefaultLighter, ...defaultStyles.defaultFontFamily, ...defaultStyles.textSmall },
            }}
            listControls={{
                selectAllText: "Seleccionar todo",
                unselectAllText: "Deseleccionar todo",
                emptyListMessage: "No se encontraron resultados",
            }}
            isMultiple={isMultiple}
            placeholderStyle={{ ...defaultStyles.textColorDefaultLighter, ...defaultStyles.defaultFontFamily, ...defaultStyles.textSmall, ...placeholderStyle }}
            dropdownStyle={{ ...defaultStyles.dropdown, ...dropdownStyle }}
            dropdownIcon={dropdownIcon || <MaterialIcons name="arrow-drop-down" size={24} color={textColor.color} />}
            dropdownIconStyle={{ ...defaultStyles.dropdownIcon, ...dropdownIconStyle }}
            placeholder={placeholder || "Selecciona una opción"}
            dropdownContainerStyle={{
                marginBottom: 0,
            }}
            options={options || []}
            selectedValue={selectedValue}
            onValueChange={onValueChange || (() => {})}
        />
    );

}

export default Dropdown;