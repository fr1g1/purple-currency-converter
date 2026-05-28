import { useIsRestoring } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    Pressable,
    StyleSheet,
    TextInput,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Card } from '@/components/card';
import { Field } from '@/components/field';
import { Picker } from '@/components/picker';
import { Text } from '@/components/text';
import { Colors, Spacing } from '@/constants/theme';
import { useCalculationCount } from '@/hooks/use-calculation-count';
import { useCurrencies } from '@/queries/currencies';
import { StatisticsCard } from '@/components/statistics-card';
import { useConvertCurrency } from '@/queries/conversion';

export default function HomeScreen() {
    const [amount, setAmount] = useState('');
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [conversionResult, setConversionResult] = useState<number | null>(null);
    const [conversionValidationError, setConversionValidationError] = useState<string | undefined>();
    const isRestoring = useIsRestoring();
    const currenciesQuery = useCurrencies();
    const convertMutation = useConvertCurrency();
    const {
        calculationCount,
        isCalculationCountLoaded,
        incrementCalculationCount,
    } = useCalculationCount();

    const resetConversionState = () => {
        setConversionValidationError(undefined);
        setConversionResult(null);
        convertMutation.reset();
    };

    const handleAmountChange = (value: string) => {
        setShowErrorMessage(false);
        resetConversionState();
        setAmount(value);
    };

    useEffect(() => {
        if (!currenciesQuery.data || currenciesQuery.data.length === 0) {
            return;
        }

        if (!fromCurrency) {
            setFromCurrency(currenciesQuery.data[0].value);
        }

        if (!toCurrency) {
            const fallbackTo = currenciesQuery.data[1]?.value ?? currenciesQuery.data[0].value;
            setToCurrency(fallbackTo);
        }
    }, [currenciesQuery.data, fromCurrency, toCurrency]);

    const parsedAmount = Number(amount);
    const isAmountValid = amount.trim().length > 0 && Number.isFinite(parsedAmount);
    const isCurrenciesLoading = isRestoring || currenciesQuery.isPending;
    const isDataReady = !isRestoring && currenciesQuery.isSuccess && isCalculationCountLoaded;
    const isInteractionDisabled = !isDataReady;
    const currenciesErrorMessage = currenciesQuery.isError ? 'Unable to load currencies' : undefined;
    const isConvertLoading = convertMutation.isPending;
    const isStorageLoading = !isCalculationCountLoaded;
    const convertErrorMessage = convertMutation.isError
        ? convertMutation.error.message
        : undefined;

    const handleConvertPress = () => {
        if (isInteractionDisabled) {
            return;
        }

        if (!fromCurrency || !toCurrency) {
            setConversionValidationError('Choose both currencies first.');
            return;
        }

        if (!isAmountValid) {
            setShowErrorMessage(true);
            return;
        }

        setConversionValidationError(undefined);
        setConversionResult(null);

        Keyboard.dismiss();

        convertMutation.mutate(
            {
                value: parsedAmount,
                from: fromCurrency,
                to: toCurrency,
            },
            {
                onSuccess: async (result: number) => {
                    setConversionResult(result);
                    await incrementCalculationCount();
                },
            }
        );
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding">
                    <Text type='title'>
                        Purple currency converter
                    </Text>

                    <Card>
                        <Field
                            label='Amount to convert'
                            errorMessage={
                                showErrorMessage && !isInteractionDisabled && !isAmountValid
                                    ? 'Value have to be a number'
                                    : undefined
                            }
                        >
                            <TextInput
                                editable={!isInteractionDisabled}
                                value={amount}
                                onChangeText={handleAmountChange}
                                keyboardType='decimal-pad'
                                placeholder='0.00'
                                placeholderTextColor={Colors.mutedText}
                                style={[styles.input, isInteractionDisabled && styles.inputDisabled]}
                            />
                        </Field>

                        <Picker
                            label='From'
                            selectedValue={fromCurrency}
                            onValueChange={(value) => {
                                resetConversionState();
                                setFromCurrency(value);
                            }}
                            items={currenciesQuery.data ?? []}
                            disabled={isInteractionDisabled}
                        />

                        <Picker
                            label='To'
                            selectedValue={toCurrency}
                            onValueChange={(value) => {
                                resetConversionState();
                                setToCurrency(value);
                            }}
                            items={currenciesQuery.data ?? []}
                            disabled={isInteractionDisabled}
                        />

                        {currenciesErrorMessage ? (
                            <Text color='danger' type='smallBold'>
                                {currenciesErrorMessage}
                            </Text>
                        ) : null}

                        {conversionValidationError ? (
                            <Text color='danger' type='smallBold'>
                                {conversionValidationError}
                            </Text>
                        ) : null}

                        {convertErrorMessage ? (
                            <Text color='danger' type='smallBold'>
                                {convertErrorMessage}
                            </Text>
                        ) : null}
                    </Card>

                    <Pressable
                        disabled={isInteractionDisabled || isConvertLoading}
                        onPress={handleConvertPress}
                        style={[
                            styles.convertButton,
                            (isInteractionDisabled || isConvertLoading) && styles.convertButtonDisabled,
                        ]}
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
                </KeyboardAvoidingView>
            </SafeAreaView>
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
        paddingHorizontal: Spacing.three,
        paddingVertical: Spacing.four,
        justifyContent: 'center',
        gap: Spacing.five,
    },
    keyboardAvoidingView: {
        gap: Spacing.five,
    },
    input: {
        height: 44,
        borderRadius: Spacing.two,
        backgroundColor: Colors.onPrimary,
        paddingHorizontal: Spacing.three,
    },
    inputDisabled: {
        opacity: 0.5,
    },
    convertButton: {
        borderRadius: Spacing.two,
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.three,
        alignItems: 'center',
        justifyContent: 'center',
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
