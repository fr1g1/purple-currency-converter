import { Text } from '@/components/text';

type ErrorMessageProps = {
    message?: string;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
    if (!message) {
        return null;
    }

    return (
        <Text color='danger' type='smallBold'>
            {message}
        </Text>
    );
}