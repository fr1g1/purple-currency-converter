import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';

type CardProps = {
    children: ReactNode;
    variant?: 'primary' | 'transparent';
};

export function Card({ children, variant = 'primary' }: CardProps) {
    return <View style={[styles.card, variant === 'transparent' && styles.transparentCard]}>{children}</View>;
}

const styles = StyleSheet.create({
    card: {
        borderRadius: Spacing.three,
        backgroundColor: Colors.primary,
        padding: Spacing.three,
        gap: Spacing.three,
        shadowColor: Colors.dark,
        shadowOpacity: 0.18,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        elevation: 4,
    },
    transparentCard: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.mutedText,
        shadowOpacity: 0,
        elevation: 0,
    },
});