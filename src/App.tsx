import { useRef, useState } from 'react'
import { AppBar, Badge, Box, Button, Container, Divider, Stack, Typography } from '@mui/material'
import { Filter, Plus, Save, X } from 'lucide-react';
import { FilterDropdown } from './FilterDropdown';
import { MoreFiltersPopover } from './MoreFiltersPopover';
import { SavedFiltersPopover } from './SavedFiltersPopover';

const scheduleTypes = ['All', 'Active', 'Inactive'];
const dateRanges = ['This Quarter', 'Last Quarter', 'This Year', 'Last Year', 'Custom'];

export interface FilterState {
  scheduleType: string;
  dateRange: string;
  customFilters: any[];
}

export interface SavedFilter {
  name: string;
  state: FilterState;
  selected: boolean;
}

function App() {
  const [count, setCount] = useState(0)
  const [scheduleType, setScheduleType] = useState('All');
  const [reportType, setReportType] = useState('Account Type Summary');
  const [dateRange, setDateRange] = useState('This Quarter');
  const [reportBasis, setReportBasis] = useState('Cash');
  const [isMoreFiltersOpen, setIsMoreFiltersOpen] = useState(false);
  const [isSavedFiltersOpen, setIsSavedFiltersOpen] = useState(false);
  const [customFilters, setCustomFilters] = useState<any[]>([]);
  const [activeCustomFilters, setActiveCustomFilters] = useState<number>(0);
  const [activeSavedFilters, setActiveSavedFilters] = useState<number>(0);
  const filterIconRef = useRef<HTMLElement>(null);

  const handleMoreFiltersClick = () => {
    setIsMoreFiltersOpen(true);
  };

  const handleMoreFiltersClose = () => {
    setIsMoreFiltersOpen(false);
  };

  const handleSavedFiltersClick = () => {
    setIsSavedFiltersOpen(true);
  };

  const handleSavedFiltersClose = () => {
    setIsSavedFiltersOpen(false);
  };

  const handleRunReport = () => {
    console.log('Running report with current filters');
  };

  const handleClearAll = () => {
    setScheduleType('All');
    setReportType('Account Type Summary');
    setDateRange('This Quarter');
    setReportBasis('Cash');
    setCustomFilters([]);
    setActiveCustomFilters(0);
    setActiveSavedFilters(0);
    // Clear selected saved filters
    const savedFilters = JSON.parse(localStorage.getItem('savedFilters') || '[]');
    const updatedFilters = savedFilters.map((filter: SavedFilter) => ({
      ...filter,
      selected: false,
    }));
    localStorage.setItem('savedFilters', JSON.stringify(updatedFilters));
  };

  const handleCustomFiltersUpdate = (filters: any[]) => {
    setCustomFilters(filters);
    setActiveCustomFilters(filters.length);
  };

  const getCurrentFilterState = (): FilterState => ({
    scheduleType,
    dateRange,
    customFilters,
  });

  const handleSavedFiltersUpdate = (count: number) => {
    setActiveSavedFilters(count);
  };

  return (
    <>
      <AppBar position="static">
        <Typography variant="h6">sick-filters</Typography>
      </AppBar>
      <Container maxWidth="xl" sx={{ mt: 4, border: '1px solid black', height: '90vh' }}>

        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Filter size={18} ref={filterIconRef} />
            <Typography variant='body2'>Filters :</Typography>
            <FilterDropdown
              label="Date Range"
              options={dateRanges}
              value={dateRange}
              onChange={setDateRange}
            />
            <FilterDropdown
              label="Schedule Type"
              options={scheduleTypes}
              value={scheduleType}
              onChange={setScheduleType}
            />
            <Badge
              badgeContent={activeCustomFilters}
              color="primary"
              sx={{
                '& .MuiBadge-badge': {
                  right: -3,
                  top: 3,
                },
              }}
            >
              <Button
                variant="outlined"
                size="small"
                onClick={handleMoreFiltersClick}
                startIcon={<Plus size={16} />}
              >
                More Filters
              </Button>
            </Badge>
            <Badge
              badgeContent={activeSavedFilters}
              color="primary"
              sx={{
                '& .MuiBadge-badge': {
                  right: -3,
                  top: 3,
                },
              }}
            >
              <Button
                variant="outlined"
                size="small"
                onClick={handleSavedFiltersClick}
                startIcon={<Save size={16} />}
              >
                Saved Filters
              </Button>
            </Badge>
            <Button
              variant="outlined"
              size="small"
              onClick={handleClearAll}
              startIcon={<X size={16} />}
              color="error"
            >
              Clear All
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleRunReport}
              sx={{
                ml: 'auto !important',
                bgcolor: 'rgb(59, 130, 246)',
                '&:hover': {
                  bgcolor: 'rgb(29, 78, 216)',
                },
              }}
            >
              Run Report
            </Button>
          </Stack>

          <MoreFiltersPopover
            open={isMoreFiltersOpen}
            anchorEl={filterIconRef.current}
            onClose={handleMoreFiltersClose}
            onFiltersUpdate={handleCustomFiltersUpdate}
            currentFilters={customFilters}
            onSave={getCurrentFilterState}
          />
          <SavedFiltersPopover
            open={isSavedFiltersOpen}
            anchorEl={filterIconRef.current}
            onClose={handleSavedFiltersClose}
            onApply={(filterState: FilterState) => {
              setScheduleType(filterState.scheduleType);
              setDateRange(filterState.dateRange);
              setCustomFilters(filterState.customFilters);
            }}
            onUpdateCount={handleSavedFiltersUpdate}
          />
        </Box>
      </Container>
    </>
  )
}

export default App
