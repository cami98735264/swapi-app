import { StyleSheet, View, Text, ScrollView } from "react-native";
import DefaultStyles from "utils/styles/DefaultStyles";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface statsItem {
    name: string;
    icon: string;
    value: number;
}

interface headerProps {
    title: {
        text: string;
        icon: string;
    };
    complementaryInfo: {
        text: string;
        icon: string;
    }
}

interface subtitleProps {
    producer: string;
    director: string;
}
interface StatsCardProps {
    header: headerProps;
    episode_id: number;
    subtitle: subtitleProps;
    description: string;
    statsItems: statsItem[];
}


const Movie: React.FC<StatsCardProps> = ({ 
    header: {
        title: { text, icon },
        complementaryInfo: { text: complementaryText, icon: complementaryIcon }
    },
    episode_id,
    subtitle: { producer, director },
    description,
    statsItems
 }) => {
    let defaultStyles = DefaultStyles();
    let defaultTextColor = { ...defaultStyles.textColorDefault };

    let styles = StyleSheet.create({
        // StatsCard Container
        statsCardContainer: {
            ...defaultStyles.containerForeground,
            ...defaultStyles.containerBorder,
            padding: 14,
            gap: 16,
            borderRadius: 8,
        },

        // StatsCard Header Container
        statsCardHeaderContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 34,
        },

        // StatsCard Title Container
        statsCardTitleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
        },

        // StatsCard Title Text
        statsCardTitleText: {
            ...defaultStyles.textColorDefault,
            ...defaultStyles.textLarge,
            ...defaultStyles.defaultFontFamily,
        },
        statsCardTitleTextContainer: {
            gap: 8,
        },

        // StatsCard date text
        statsCardDateText: {
            ...defaultStyles.defaultFontFamily,
            ...defaultStyles.textSmall,
            padding: 4,
            color: '#000',
        },
        statsCardDateTextContainer: {
            borderRadius: 4,
            paddingHorizontal: 8,
            alignItems: 'center',
            ...defaultStyles.secondaryBackground,
            flexDirection: 'row',
            gap: 6,
        },

        // StatsCard Subtitle Container
        statsCardSubtitleContainer: {
            flexDirection: 'column',
        },

        statsCardSubtitleText: {
            ...defaultStyles.textColorDefaultLighter,
            ...defaultStyles.textSmall,
            ...defaultStyles.defaultFontFamily,
            lineHeight: 20,
        },

        // StatsCard Description Text
        statsCardDescriptionContainer: {
            maxHeight: 90,
        },
        statsCardDescriptionText: {
            ...defaultStyles.textColorDefaultLight,
            ...defaultStyles.textMedium,
            ...defaultStyles.defaultFontFamily,
            lineHeight: 20,
        },

        // StatsCard Stats Container
        statsCardStatsContainer: {
            ...defaultStyles.containerSubForeground,
            flexDirection: 'row',
            gap: 8,
            flexWrap: 'wrap',
            borderRadius: 8,
            padding: 12,
            marginVertical: 8,
        },

        // StatsCard Stats Item Container
        statsCardStatsItemContainer: {
            flex: 1,
            gap: 6,
            flexDirection: 'row',
            alignItems: 'center',
            flexBasis: '48%',
        },

        // StatsCard Stats Item Text
        statsCardStatsItemText: {
            ...defaultStyles.textColorDefaultLighter,
            ...defaultStyles.textSmall,
            ...defaultStyles.defaultFontFamily,
            flex: 1,
        },

        statsCardStatsItemNumber: {
            ...defaultStyles.textColorDefault,
            ...defaultStyles.textLarge,
            ...defaultStyles.defaultFontFamily,
        },

        statsCardViewDetailedInfoButton: {
            ...defaultStyles.buttonColorPrimary,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12,
            borderRadius: 8,
        },

        statsCardViewDetailedInfoButtonText: {
            ...defaultStyles.buttonText,
        }
    })
    return (
        <View style={styles.statsCardContainer}>
            <View style={styles.statsCardHeaderContainer}>
            <ScrollView contentContainerStyle={styles.statsCardTitleContainer} horizontal={true}>
                <MaterialIcons name={icon} size={36} color={defaultTextColor.color} />
                <Text style={styles.statsCardTitleText}>{text}</Text>
            </ScrollView>
            <View style={styles.statsCardDateTextContainer}>
                <MaterialIcons name={complementaryIcon} size={24} color={'#000'} />
                <Text style={styles.statsCardDateText}>{complementaryText}</Text>
            </View>
            </View>
            <View style={styles.statsCardSubtitleContainer}>
            <Text style={styles.statsCardSubtitleText}>Productor(es): {producer}</Text>
            <Text style={styles.statsCardSubtitleText}>Director(es): {director}</Text>
            </View>
            <ScrollView style={styles.statsCardDescriptionContainer}>
            <Text style={styles.statsCardDescriptionText}>
                {description}
            </Text>
            </ScrollView>
            <View style={styles.statsCardStatsContainer}>
            {statsItems.map((item, index) => (
                <View key={index} style={styles.statsCardStatsItemContainer}>
                <MaterialIcons name={item.icon} size={26} color={defaultTextColor.color} />
                <Text style={styles.statsCardStatsItemText}>
                    <Text style={styles.statsCardStatsItemNumber}>{item.value}</Text> {item.name}
                </Text>
                </View>
            ))}
            </View>
            <View style={styles.statsCardViewDetailedInfoButton}>
            <Text style={styles.statsCardViewDetailedInfoButtonText}>ver información detallada</Text>
            </View>
        </View>
    )
}



export default Movie;