import { TextField } from '@consta/uikit/TextField';

interface TokenInputProps {
    value: string,
    onChange: (value: string) => void,
    hasError: boolean
}

const TokenInput = ({ value, onChange, hasError} : TokenInputProps) => {
    return (
        <TextField
            label='Access token'
            placeholder='Введите ваш токен'
            value={value}
            onChange={(newValue) => onChange(newValue ?? '')}
            status={hasError ? 'alert' : undefined}
            caption={hasError ? 'Токен не может быть пустым' : undefined}
        />
    )
}

export default TokenInput;