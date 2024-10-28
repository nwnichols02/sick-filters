import React from 'react';
import { Stack, Select, MenuItem, TextField, IconButton, Typography } from '@mui/material';
import { Plus, Trash2 } from 'lucide-react';

interface CustomFilterProps {
    id: number;
    onDelete: (id: number) => void;
    onAdd: () => void;
}

export const CustomFilter: React.FC<CustomFilterProps> = ({ id, onDelete, onAdd }) => {
    return (
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Typography sx={{ width: 24 }}>{id}</Typography>
            <Select
                size="small"
                defaultValue=""
                sx={{ width: 200 }}
                displayEmpty
            >
                <MenuItem value="" disabled>Select a field</MenuItem>
                <MenuItem value="status">Status</MenuItem>
                <MenuItem value="category">Category</MenuItem>
                <MenuItem value="amount">Amount</MenuItem>
            </Select>
            <Select
                size="small"
                defaultValue=""
                sx={{ width: 150 }}
                displayEmpty
            >
                <MenuItem value="" disabled>Select a...</MenuItem>
                <MenuItem value="equals">Equals</MenuItem>
                <MenuItem value="contains">Contains</MenuItem>
                <MenuItem value="greater">Greater than</MenuItem>
                <MenuItem value="less">Less than</MenuItem>
            </Select>
            <TextField
                size="small"
                placeholder="Enter value..."
                sx={{ width: 200 }}
            />
            <IconButton onClick={() => onAdd()} color="primary" size="small">
                <Plus className="w-4 h-4" />
            </IconButton>
            <IconButton onClick={() => onDelete(id)} color="error" size="small">
                <Trash2 className="w-4 h-4" />
            </IconButton>
        </Stack>
    );
};