import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { Text } from '@/components/text';
import { Colors, Spacing } from '@/constants/theme';

type ConvertButtonProps = {
    disabled: boolean;
    isCurrenciesLoading: boolean;
    isStorageLoading: boolean;
    isConvertLoading: boolean;
    onPress: () => void;
};

export function ConvertButton({
    disabled,
    isCurrenciesLoading,
    isStorageLoading,
    isConvertLoading,
    onPress,
}: ConvertButtonProps) {
    return (
        <Pressable
            disabled={disabled}
            onPress={onPress}
            style={[styles.convertButton, disabled && styles.convertButtonDisabled]}
        >
            {isCurrenciesLoading || isStorageLoading ? (
                <View style={styles.buttonContent}>
                    <ActivityIndicator color={Colors.onPrimary} size='small' />
                    <Text color='onPrimary' type='smallBold'>
                        Loading data
                    </Text>
                </View>
            ) : isConvertLoading ? (
                <View style={styles.buttonContent}>
                    <ActivityIndicator color={Colors.onPrimary} size='small' />
                    <Text color='onPrimary' type='smallBold'>
                        Converting
                    </Text>
                </View>
            ) : (
                <Text color='onPrimary' type='smallBold'>
                    Convert currency
                </Text>
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    convertButton: {
        borderRadius: Spacing.two,
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.three,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: Colors.dark,
        shadowOpacity: 0.18,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        elevation: 4,
    },
    convertButtonDisabled: {
        opacity: 0.7,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: Spacing.two,
    },
});