import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

const CALCULATION_COUNT_STORAGE_KEY = '@converter/calculation-count';

export function useCalculationCount() {
    const [calculationCount, setCalculationCount] = useState(0);
    const [isCalculationCountLoaded, setIsCalculationCountLoaded] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const loadCalculationCount = async () => {
            const storedCount = await AsyncStorage.getItem(CALCULATION_COUNT_STORAGE_KEY);

            if (!isMounted) {
                return;
            }

            const parsedCount = storedCount ? Number(storedCount) : 0;
            setCalculationCount(Number.isFinite(parsedCount) ? parsedCount : 0);
            setIsCalculationCountLoaded(true);
        };

        void loadCalculationCount();

        return () => {
            isMounted = false;
        };
    }, []);

    const incrementCalculationCount = useCallback(async () => {
        const storedCount = await AsyncStorage.getItem(CALCULATION_COUNT_STORAGE_KEY);
        const parsedCount = storedCount ? Number(storedCount) : 0;
        const currentCount = Number.isFinite(parsedCount) ? parsedCount : 0;
        const nextCount = currentCount + 1;

        await AsyncStorage.setItem(CALCULATION_COUNT_STORAGE_KEY, String(nextCount));
        setCalculationCount(nextCount);

        return nextCount;
    }, []);

    return {
        calculationCount,
        isCalculationCountLoaded,
        incrementCalculationCount,
    };
}
