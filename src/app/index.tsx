import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '@/components/text';
import { Spacing } from '@/constants/theme';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <Text type='title' style={styles.text}>
                    Purple currency converter
                </Text>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        paddingHorizontal: Spacing.two,
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.three,
    },
    text: {
        textAlign: 'center',
    },
});
