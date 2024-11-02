import React, { useState } from 'react';
import {
    Popover,
    TextField,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Button,
    Box,
} from '@mui/material';
import { ChevronDown } from 'lucide-react';

interface FilterDropdownProps {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
    label,
    options,
    value,
    onChange,
}) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSearchTerm('');
    };

    const handleOptionSelect = (option: string) => {
        onChange(option);
        handleClose();
    };

    const filteredOptions = options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const open = Boolean(anchorEl);

    return (
        <div>
            <Button
                onClick={handleClick}
                variant="outlined"
                size="small"
                endIcon={<ChevronDown size={16} />}
                sx={{
                    borderRadius: '4px',
                    textTransform: 'none',
                    color: 'text.primary',
                    borderColor: 'divider',
                }}
                disableRipple
            >
                {label}: {value}
            </Button>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                sx={{
                    '& .MuiPopover-paper': {
                        width: 180, // todo: make dynamic to fit the content
                        // mt: 1,
                    },
                }}
            >
                <Box p={2}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        sx={{ mb: 1 }}
                    />
                    <List sx={{ maxHeight: 300, overflow: 'auto' }} dense>
                        {filteredOptions.map((option) => (
                            <ListItem disablePadding key={option}>
                                <ListItemButton
                                    selected={option === value}
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    <ListItemText primary={option} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Popover>
        </div>
    );
};