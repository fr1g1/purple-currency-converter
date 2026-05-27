import { useState } from 'react';
import { KeyboardAvoidingView, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '@/components/card';
import { Field } from '@/components/field';
import { Picker } from '@/components/picker';
import { Text } from '@/components/text';
import { Colors, Spacing } from '@/constants/theme';

export default function HomeScreen() {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const handleAmountChange = (value: string) => {
        setShowErrorMessage(false);
        setAmount(value);
    };

    const parsedAmount = Number(amount);
    const isAmountValid = amount.trim().length > 0 && Number.isFinite(parsedAmount);

    const handleConvertPress = () => {

        if (!isAmountValid) {
            setShowErrorMessage(true);
            return;
        }

        // Conversion behavior will be added in a later step.
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <SafeAreaView style={styles.safeArea}>
                    <Text type='title'>
                        Purple currency converter
                    </Text>

                    <Card>
                        <Field
                            label='Amount to convert'
                            errorMessage={
                                showErrorMessage && !isAmountValid
                                    ? 'Value have to be a number'
                                    : undefined
                            }
                        >
                            <TextInput
                                value={amount}
                                onChangeText={handleAmountChange}
                                keyboardType='decimal-pad'
                                placeholder='0.00'
                                placeholderTextColor={Colors.mutedText}
                                style={styles.input}
                            />
                        </Field>

                        <Picker
                            label='From'
                            selectedValue={fromCurrency}
                            onValueChange={setFromCurrency}
                            items={[]}
                        />

                        <Picker
                            label='To'
                            selectedValue={toCurrency}
                            onValueChange={setToCurrency}
                            items={[]}
                        />
                    </Card>

                    <Pressable onPress={handleConvertPress} style={styles.convertButton}>
                        <Text color='onPrimary' type='smallBold'>
                            Convert currency
                        </Text>
                    </Pressable>
                </SafeAreaView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.four,
        gap: Spacing.five,
    },
    input: {
        height: 44,
        borderRadius: Spacing.two,
        backgroundColor: Colors.onPrimary,
        paddingHorizontal: Spacing.three,
    },
    convertButton: {
        borderRadius: Spacing.two,
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.three,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
