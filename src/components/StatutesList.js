// src/components/StatutesList.js
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  Button,
  Pagination,
  CircularProgress,
  Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import apiService from '../services/api';

const StatutesList = () => {
  const [statutes, setStatutes] = useState([]);
  const [states, setStates] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filter states
  const [selectedState, setSelectedState] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        // Fetch statutes, states, and tags in parallel
        const [statutesResponse, statesResponse, tagsResponse] = await Promise.all([
          apiService.getStatutes({ page: 1 }),
          apiService.getStates(),
          apiService.getTags(),
        ]);
        
        setStatutes(statutesResponse.statutes);
        setTotalPages(statutesResponse.totalPages);
        setCurrentPage(statutesResponse.currentPage);
        setStates(statesResponse);
        setTags(tagsResponse);
        setError(null);
      } catch (err) {
        setError('Failed to load statutes. Please try again later.');
        console.error('Error fetching initial data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);

  // Handle filter changes
  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleTagChange = (event) => {
    setSelectedTags(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    fetchFilteredStatutes(page);
  };

  // Apply filters
  const applyFilters = () => {
    setCurrentPage(1);
    fetchFilteredStatutes(1);
  };

  const fetchFilteredStatutes = async (page = 1) => {
    setLoading(true);
    try {
      const params = { page };
      
      if (selectedState) {
        params.state = selectedState;
      }
      
      if (selectedTags.length > 0) {
        params.tags = selectedTags.join(',');
      }
      
      if (searchQuery) {
        params.search = searchQuery;
      }
      
      const response = await apiService.getStatutes(params);
      setStatutes(response.statutes);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
      setError(null);
    } catch (err) {
      setError('Failed to apply filters. Please try again.');
      console.error('Error applying filters:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h1" gutterBottom>
        Browse Statutes
      </Typography>
      
      {/* Filters */}
      <Paper className="filter-section">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FilterListIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Filters</Typography>
        </Box>
        
        <Box className="filter-controls">
          {/* State filter */}
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="state-select-label">State</InputLabel>
            <Select
              labelId="state-select-label"
              id="state-select"
              value={selectedState}
              label="State"
              onChange={handleStateChange}
            >
              <MenuItem value="">All States</MenuItem>
              {states.map((state) => (
                <MenuItem key={state.abbreviation} value={state.name}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {/* Tags filter */}
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="tags-select-label">Tags</InputLabel>
            <Select
              labelId="tags-select-label"
              id="tags-select"
              multiple
              value={selectedTags}
              label="Tags"
              onChange={handleTagChange}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} size="small" />
                  ))}
                </Box>
              )}
            >
              {tags.map((tag) => (
                <MenuItem key={tag.name} value={tag.name}>
                  {tag.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          {/* Search */}
          <TextField
            className="search-input"
            label="Search"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
            }}
          />
          
          <Button variant="contained" onClick={applyFilters}>
            Apply Filters
          </Button>
        </Box>
      </Paper>
      
      {/* Error message */}
      {error && (
        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {/* Loading indicator */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Results list */}
          {statutes.length === 0 ? (
            <Alert severity="info" sx={{ mt: 2 }}>
              No statutes found. Try adjusting your filters.
            </Alert>
          ) : (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {statutes.map((statute) => (
                <Grid item xs={12} key={statute.id}>
                  <Card className="statute-card">
                    <CardHeader
                      className="statute-card-header"
                      title={statute.title}
                      subheader={`${statute.state} ${statute.code} § ${statute.section}`}
                    />
                    <CardContent className="statute-card-content">
                      <Box sx={{ mb: 1 }}>
                        {statute.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            className="tag-chip"
                          />
                        ))}
                      </Box>
                      <Button
                        component={RouterLink}
                        to={`/statutes/${statute.id}`}
                        variant="outlined"
                        size="small"
                      >
                        View Statute
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Box className="pagination-container">
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </div>
  );
};

export default StatutesList;