import { StyleSheet, View } from 'react-native';

import { Colors } from '@/constants/theme';

import { Card } from './card';
import { Field } from './field';
import { Text } from './text';

type StatisticsCardProps = {
    result: number | null;
    calculationCount: number;
};

export function StatisticsCard({ result, calculationCount }: StatisticsCardProps) {
    return (
        <Card variant='transparent'>
            <Field label='Result' labelColor='mutedText'>
                <Text color='text' type='title'>
                    {result !== null ? `${result}` : '-'}
                </Text>
            </Field>

            <View style={styles.separator} />

            <Field label='Number of calculations' labelColor='mutedText'>
                <Text color='text' type='title'>
                    {calculationCount}
                </Text>
            </Field>
        </Card>
    );
}

const styles = StyleSheet.create({
    separator: {
        borderTopWidth: 1,
        borderTopColor: Colors.mutedText,
    },
});