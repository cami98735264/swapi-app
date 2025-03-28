import { StyleSheet } from "react-native";
import { useColors } from "../hooks/useColors";


export const DefaultStyles = () => {
  const colors = useColors();
  const styles = StyleSheet.create({
    
    // Container Styles
    containerView: {
      flexDirection: 'column',
      gap: 36,
      padding: 12,
      flex: 1,
      backgroundColor: colors.background,
    },
    containerBorder: {
        borderWidth: 1,
        borderColor: colors.border,
    },
    containerForeground: {
        backgroundColor: colors.foreground,
    },
    containerSubForeground: {
        backgroundColor: colors.subforeground,
    },
    containerBackground: {
        backgroundColor: colors.background,
    },


    // Primary Background
    primaryBackground: {
        backgroundColor: colors.primary
    },

    // Secondary Background
    secondaryBackground: {
        backgroundColor: colors.secondary
    },

    // Text Styles
    textSmall: {
        fontSize: 12
    },
    textMedium: {
        fontSize: 14
    },
    textLarge: {
        fontSize: 18
    },

    // Text Color Styles
    textColorDefault: {
        color: colors.copy
    },
    textColorDefaultLight: {
        color: colors.copyLight
    },
    textColorDefaultLighter: {
        color: colors.copyLighter
    },


    // Text Family Styles
    defaultFontFamily: {
        fontFamily: 'star_jedi',
        lineHeight: 22
    },


    // Buttons
    button: {
        padding: 12,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },

    // Button Text
    buttonText: {
        fontFamily: 'star_jedi',
        color: colors.copy,
        fontSize: 16
    },

    // Buttons background
    buttonColorDisabled: {
        backgroundColor: "#ccc"
    },
    buttonColorPrimary: {
        backgroundColor: colors.primary
    },
    
    // Input Styles


    input: {
        flex: 1,
        borderColor: colors.border,
        backgroundColor: 'transparent',
        color: colors.copy,
        fontFamily: 'star_jedi',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    inputSection: {
        paddingLeft: 12,
        paddingRight: 12,
        height: 54,
        borderWidth: 2,
        borderRadius: 12,
        borderColor: colors.border,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },


    // Dropdown Styles
    dropdown: {
        minHeight: 20,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderRadius: 12,
        borderColor: colors.border,
        backgroundColor: colors.background,
        color: colors.copy,
        fontFamily: 'star_jedi',
    },
    dropdownIcon: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',

      }
  });

  

  return styles;
};
export default DefaultStyles;