import DefaultStyles from "utils/styles/DefaultStyles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ExternalDropdown from 'react-native-input-select';


interface DropdownProps {
    placeholderStyle?: any;
    dropdownStyle?: any;
    dropdownIcon?: any;
    dropdownIconStyle?: any;
    placeholder?: string;
    options: any[];
    selectedValue: string;
    setSelectedValue: (selectedValue: string) => void;
    onValueChange?: (selectedItems: any) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
    placeholderStyle,
    dropdownStyle,
    dropdownIcon,
    dropdownIconStyle,
    placeholder,
    options,
    selectedValue,
    setSelectedValue,
    onValueChange
}) => {
    const defaultStyles = DefaultStyles();
    const textColor = { ... defaultStyles.textColorDefaultLight };

    return (
        <ExternalDropdown
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
            onValueChange={(selectedItems: any) => {
                if (Array.isArray(selectedItems)) {
                    setSelectedValue(selectedItems[0].value);
                } else if (selectedItems) {
                    setSelectedValue(selectedItems.value);
                }
                if (onValueChange) {
                    onValueChange(selectedItems);
                }
            }}
        />
    );

}

export default Dropdown;