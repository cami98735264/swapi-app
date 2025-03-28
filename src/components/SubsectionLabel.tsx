import DefaultStyles from 'utils/styles/DefaultStyles';

import {View, Text} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface SubsectionLabelProps {
  label: string;
  icon?: string; // Optional icon prop
}

const SubsectionLabel: React.FC<SubsectionLabelProps> = ({label, icon}) => {
  const defaultStyles = DefaultStyles();
  const textColor = {...defaultStyles.textColorDefaultLight};
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
      {icon && <MaterialIcons name={icon} size={24} color={textColor.color} />}
      <Text
        style={{
          ...defaultStyles.textColorDefaultLight,
          ...defaultStyles.textMedium,
          ...defaultStyles.defaultFontFamily,
        }}>
        {label}
      </Text>
    </View>
  );
};

export default SubsectionLabel;
