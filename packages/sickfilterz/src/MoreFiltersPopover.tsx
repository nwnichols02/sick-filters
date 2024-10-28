import React, { useState } from 'react';
import {
    Popover,
    Box,
    Button,
    Stack,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { CustomFilter } from './CustomFilter';
import type { FilterState } from './App';

interface MoreFiltersPopoverProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    onClose: () => void;
    onFiltersUpdate: (filters: any[]) => void;
    currentFilters: any[];
    onSave: () => FilterState;
}

export const MoreFiltersPopover: React.FC<MoreFiltersPopoverProps> = ({
    open,
    anchorEl,
    onClose,
    onFiltersUpdate,
    currentFilters,
    onSave,
}) => {
    const [filters, setFilters] = useState(currentFilters.length ? currentFilters : [1]);
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);
    const [filterName, setFilterName] = useState('');

    const handleAddFilter = () => {
        setFilters([...filters, filters.length + 1]);
    };

    const handleDeleteFilter = (id: number) => {
        setFilters(filters.filter(f => f !== id));
    };

    const handleApply = () => {
        onFiltersUpdate(filters);
        onClose();
    };

    const handleSave = () => {
        setSaveDialogOpen(true);
    };

    const handleSaveConfirm = () => {
        const savedFilters = JSON.parse(localStorage.getItem('savedFilters') || '[]');
        const filterState = onSave();
        savedFilters.push({
            name: filterName,
            state: filterState,
        });
        localStorage.setItem('savedFilters', JSON.stringify(savedFilters));
        setSaveDialogOpen(false);
        setFilterName('');
    };

    return (
        <>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
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
                        width: 900,
                        p: 2,
                        mt: 3,
                    },
                }}
            >
                <Box>
                    {/* <Typography variant="h6" sx={{ mb: 3 }}>Additional Filters</Typography> */}
                    {filters.map((id) => (
                        <CustomFilter
                            key={id}
                            id={id}
                            onDelete={handleDeleteFilter}
                            onAdd={handleAddFilter}
                        />
                    ))}
                    <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                        <Button
                            variant="contained"
                            onClick={handleApply}
                            sx={{ minWidth: 100 }}
                        >
                            Apply
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleSave}
                            sx={{ minWidth: 100 }}
                        >
                            Save As
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={onClose}
                            sx={{ minWidth: 100 }}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </Box>
            </Popover>

            <Dialog open={saveDialogOpen} onClose={() => setSaveDialogOpen(false)}>
                <DialogTitle>Save Filter</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Filter Name"
                        fullWidth
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSaveDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSaveConfirm} variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};