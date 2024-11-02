// src/CustomButton.tsx
import React from 'react';
import { Button, ButtonProps } from '@mui/material';

export interface CustomButtonProps extends ButtonProps {
    customLabel?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
    customLabel,
    children,
    ...props
}) => {
    return (
        <Button {...props}>
            {customLabel || children}
        </Button>
    );
};

export default CustomButton;