'use client';

import { useCallback, useContext } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { FilterAlt } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import { NewsContext } from '../../contexts/news/news';
import moment from 'moment';
import {
  ARTICLE_CATEGORIES,
  DATA_SOURCE,
  DATA_SOURCE_ENUM,
  SORT_OPTIONS,
} from '../../constants/global';

export const Filters = () => {
  const { state, setState, getNews, saveFilters } = useContext(NewsContext);

  const { dataSource, keyWord, sort, category, from, to } = state;

  const onKeyWordChange = useCallback(
    (e: any) =>
      setState((prevState) => ({ ...prevState, keyWord: e.target.value })),
    [setState]
  );

  return (
    <Box
      sx={{
        p: 3,
        mb: 4,
      }}
    >
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <FilterAlt color="primary" />
        <h2 className="text-xl font-medium m-0">News Filters</h2>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
          mb: 3,
        }}
      >
        <FormControl fullWidth>
          <InputLabel>News Source</InputLabel>
          <Select
            value={dataSource}
            label="News Source"
            onChange={(e) =>
              setState((prevState) => ({
                ...prevState,
                dataSource: e.target.value,
              }))
            }
          >
            {DATA_SOURCE.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Search"
          value={keyWord}
          onChange={onKeyWordChange}
          fullWidth
        />
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          gap: 2,
          mb: 3,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            value={from}
            label="From Date"
            slotProps={{ textField: { size: 'small', fullWidth: true } }}
            onChange={(e) =>
              setState((prevState) => ({ ...prevState, from: e }))
            }
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterMoment}>
          <DatePicker
            value={to}
            label="To Date"
            slotProps={{ textField: { size: 'small', fullWidth: true } }}
            minDate={from || moment()}
            onChange={(e) => setState((prevState) => ({ ...prevState, to: e }))}
          />
        </LocalizationProvider>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
          gap: 2,
          mb: 3,
        }}
      >
        <FormControl fullWidth>
          <InputLabel>Categories</InputLabel>
          <Select
            value={category}
            label="Categories"
            onChange={(e) =>
              setState((prevState) => ({
                ...prevState,
                category: e.target.value,
              }))
            }
          >
            <MenuItem value="">None</MenuItem>
            {ARTICLE_CATEGORIES.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {(dataSource === DATA_SOURCE_ENUM.NEW_YORK_ITEMS ||
          dataSource === DATA_SOURCE_ENUM.THE_GUARDIAN) && (
          <FormControl fullWidth>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sort}
              label="Sort By"
              onChange={(e) =>
                setState((prevState) => ({
                  ...prevState,
                  sort: e.target.value,
                }))
              }
            >
              <MenuItem value="">None</MenuItem>
              {SORT_OPTIONS.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 3 }}>
        <Button
          variant="contained"
          onClick={() => saveFilters()}
          startIcon={<SaveIcon />}
          sx={{ px: 3 }}
        >
          Save Filters
        </Button>
        <Button
          variant="contained"
          onClick={() => getNews()}
          startIcon={<FilterAlt />}
          sx={{ px: 3 }}
        >
          Apply Filters
        </Button>
      </Box>
    </Box>
  );
};
