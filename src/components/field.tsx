import { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

import { Text, type TextProps } from '@/components/text';
import { Spacing } from '@/constants/theme';

import { ErrorMessage } from './error-message';


type FieldProps = PropsWithChildren<{
    label: string;
    errorMessage?: string;
    labelColor?: TextProps['color'];
}>;

export function Field({ label, errorMessage, labelColor = 'onPrimary', children }: FieldProps) {
    return (
        <View style={styles.container}>
            <Text color={labelColor} type='smallBold' style={styles.label}>
                {label}
            </Text>
            {children}
            <ErrorMessage message={errorMessage} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: Spacing.two,
    },
    label: {
        lineHeight: 18,
    },
});