import { Text as RNText, StyleSheet, type TextProps as RNTextProps } from 'react-native';

import { Colors } from '@/constants/theme';

export type TextProps = RNTextProps & {
    color?: 'text' | 'mutedText' | 'onPrimary' | 'danger' | 'primary' | 'light' | 'dark';
    type?: 'default' | 'title' | 'small' | 'smallBold';
};

export function Text({ color = 'text', style, type = 'default', ...rest }: TextProps) {
    return (
        <RNText
            style={[
                { color: Colors[color] },
                type === 'default' && styles.default,
                type === 'title' && styles.title,
                type === 'small' && styles.small,
                type === 'smallBold' && styles.smallBold,
                style,
            ]}
            {...rest}
        />
    );
}

const styles = StyleSheet.create({
    small: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: 500,
    },
    smallBold: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: 700,
    },
    default: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: 500,
    },
    title: {
        fontSize: 32,
        lineHeight: 44,
        fontWeight: 600,
    },
});
