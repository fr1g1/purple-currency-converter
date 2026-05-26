import { Platform, StyleSheet, Text as RNText, type TextProps } from 'react-native';

import { Fonts } from '@/constants/theme';

export type ThemedTextProps = TextProps & {
    type?: 'default' | 'title' | 'small' | 'smallBold' | 'link' | 'linkPrimary' | 'code';
};

export function Text({ style, type = 'default', ...rest }: ThemedTextProps) {
    return (
        <RNText
            style={[
                type === 'default' && styles.default,
                type === 'title' && styles.title,
                type === 'small' && styles.small,
                type === 'smallBold' && styles.smallBold,
                type === 'link' && styles.link,
                type === 'linkPrimary' && styles.linkPrimary,
                type === 'code' && styles.code,
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
    link: {
        lineHeight: 30,
        fontSize: 14,
    },
    linkPrimary: {
        lineHeight: 30,
        fontSize: 14,
        color: '#3c87f7',
    },
    code: {
        fontFamily: Fonts.mono,
        fontWeight: Platform.select({ android: 700 }) ?? 500,
        fontSize: 12,
    },
});
