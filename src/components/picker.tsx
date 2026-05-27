import { Picker as RNPicker } from '@react-native-picker/picker';
import { StyleSheet, View } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';

import { Field } from './field';

export type PickerItem = {
    label: string;
    value: string;
};

type PickerProps = {
    label: string;
    selectedValue: string;
    onValueChange: (value: string) => void;
    items: PickerItem[];
    disabled?: boolean;
};

export function Picker({ label, selectedValue, onValueChange, items, disabled = false }: PickerProps) {
    return (
        <Field label={label}>
            <View style={[styles.pickerContainer, disabled && styles.pickerContainerDisabled]}>
                <RNPicker
                    enabled={!disabled}
                    selectedValue={selectedValue}
                    onValueChange={(value) => onValueChange(value)}
                    style={{ color: disabled ? Colors.mutedText : Colors.text }}
                >
                    {items.map((item) => (
                        <RNPicker.Item key={item.value} label={item.label} value={item.value} />
                    ))}
                </RNPicker>
            </View>
        </Field>
    );
}

const styles = StyleSheet.create({
    pickerContainer: {
        borderRadius: Spacing.two,
        backgroundColor: Colors.onPrimary,
        overflow: 'hidden',
    },
    pickerContainerDisabled: {
        opacity: 0.5,
    },
});