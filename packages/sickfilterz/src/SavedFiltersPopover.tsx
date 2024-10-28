import React, { useEffect, useState } from 'react';
import {
    Popover,
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Typography,
    Checkbox,
} from '@mui/material';
import { X } from 'lucide-react';
import type { FilterState, SavedFilter } from './App';

interface SavedFiltersPopoverProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    onClose: () => void;
    onApply: (filterState: FilterState) => void;
    onUpdateCount: (count: number) => void;
}

export const SavedFiltersPopover: React.FC<SavedFiltersPopoverProps> = ({
    open,
    anchorEl,
    onClose,
    onApply,
    onUpdateCount,
}) => {
    const [filters, setFilters] = useState<SavedFilter[]>([]);

    useEffect(() => {
        const savedFilters = JSON.parse(localStorage.getItem('savedFilters') || '[]');
        const filtersWithSelection = savedFilters.map((filter: SavedFilter) => ({
            ...filter,
            selected: filter.selected || false,
        }));
        setFilters(filtersWithSelection);
    }, [open]);

    useEffect(() => {
        const selectedCount = filters.filter(filter => filter.selected).length;
        onUpdateCount(selectedCount);
    }, [filters]);

    const handleDelete = (index: number) => {
        const updatedFilters = filters.filter((_, i) => i !== index);
        setFilters(updatedFilters);
        localStorage.setItem('savedFilters', JSON.stringify(updatedFilters));
        if (updatedFilters.length === 0) {
            onClose();
        }
    };

    const handleToggleSelect = (index: number) => {
        const updatedFilters = filters.map((filter, i) => {
            if (i === index) {
                const updated = { ...filter, selected: !filter.selected };
                if (updated.selected) {
                    onApply(filter.state);
                }
                return updated;
            }
            return filter;
        });
        setFilters(updatedFilters);
        localStorage.setItem('savedFilters', JSON.stringify(updatedFilters));
    };

    return (
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
                    width: 400,
                    p: 2,
                    mt: 1,
                },
            }}
        >
            <Box>
                <Typography variant="h6" sx={{ mb: 2 }}>Saved Filters</Typography>
                {filters.length === 0 ? (
                    <Typography color="text.secondary">No saved filters</Typography>
                ) : (
                    <List>
                        {filters.map((filter, index) => (
                            <ListItem
                                key={index}
                                disablePadding
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => handleDelete(index)}
                                        size="small"
                                    >
                                        <X className="w-4 h-4" />
                                    </IconButton>
                                }
                            >
                                <ListItemButton onClick={() => handleToggleSelect(index)}>
                                    <Checkbox
                                        edge="start"
                                        checked={filter.selected}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                    <ListItemText primary={filter.name} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>
        </Popover>
    );
};