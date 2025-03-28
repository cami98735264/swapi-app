import { useColorScheme } from "react-native";
import { darkColors, lightColors } from "../../constants/colors";


export const useColors = () => {
    const colorScheme = useColorScheme();
    return colorScheme === "dark" ? darkColors : lightColors;
    };