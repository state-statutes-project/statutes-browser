// src/components/StatutesBrowser.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import UpdateIcon from '@mui/icons-material/Update';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import apiService from '../services/api';

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const StatutesBrowser = () => {
  const { id } = useParams(); // Get statute ID from URL if available
  const navigate = useNavigate();
  
  // States for list view
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
  
  // States for detail view
  const [selectedStatute, setSelectedStatute] = useState(null);
  const [relatedStatutes, setRelatedStatutes] = useState([]);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState(null);

  // Initial data loading
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

  // Load statute details when ID changes
  useEffect(() => {
    const fetchStatuteDetail = async () => {
      if (!id) {
        setSelectedStatute(null);
        setRelatedStatutes([]);
        return;
      }
      
      try {
        setDetailLoading(true);
        const statuteData = await apiService.getStatuteById(id);
        setSelectedStatute(statuteData);
        
        // If there are related statutes, fetch them
        if (statuteData.relatedStatutes && statuteData.relatedStatutes.length > 0) {
          try {
            const relatedIds = statuteData.relatedStatutes;
            const relatedData = await Promise.all(
              relatedIds.map(relatedId => apiService.getStatuteById(relatedId))
            );
            setRelatedStatutes(relatedData);
          } catch (err) {
            console.error('Error fetching related statutes:', err);
            setRelatedStatutes([]);
          }
        } else {
          setRelatedStatutes([]);
        }
        
        setDetailError(null);
      } catch (err) {
        setDetailError('Failed to load statute details. Please try again later.');
        console.error('Error fetching statute details:', err);
      } finally {
        setDetailLoading(false);
      }
    };
    
    fetchStatuteDetail();
  }, [id]);

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

  // Handle statute selection
  const handleStatuteSelect = (statuteId) => {
    navigate(`/statutes/${statuteId}`);
  };

  // Render the details section
  const renderStatuteDetails = () => {
    if (detailLoading) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <CircularProgress />
        </Box>
      );
    }

    if (detailError) {
      return (
        <Alert severity="error" sx={{ m: 2 }}>
          {detailError}
        </Alert>
      );
    }

    if (!selectedStatute) {
      return (
        <div className="empty-detail-placeholder">
          <DescriptionOutlinedIcon className="placeholder-icon" />
          <Typography variant="h6" gutterBottom>
            No Statute Selected
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Select a statute from the list to view its details here.
          </Typography>
        </div>
      );
    }

    return (
      <div className="statute-detail-container">
        <div className="statute-detail-header">
          <Typography variant="h5" component="h1" gutterBottom>
            {selectedStatute.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {selectedStatute.state} {selectedStatute.code} § {selectedStatute.section}
          </Typography>
          
          <Box sx={{ mt: 2, mb: 1 }}>
            {selectedStatute.tags && selectedStatute.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                className="tag-chip"
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
          
          <div className="statute-detail-metadata">
            {selectedStatute.dateEnacted && (
              <div className="metadata-item">
                <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">
                  Enacted: {formatDate(selectedStatute.dateEnacted)}
                </Typography>
              </div>
            )}
            
            {selectedStatute.lastAmended && (
              <div className="metadata-item">
                <UpdateIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">
                  Last Amended: {formatDate(selectedStatute.lastAmended)}
                </Typography>
              </div>
            )}
          </div>
        </div>
        
        <Typography variant="h6" gutterBottom>
          Statute Text
        </Typography>
        <Typography variant="body1" className="statute-text">
          {selectedStatute.text}
        </Typography>
        
        {relatedStatutes.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <BookmarkIcon sx={{ mr: 1 }} />
              Related Statutes
            </Typography>
            <List>
              {relatedStatutes.map((related) => (
                <ListItem
                  key={related.id}
                  button
                  onClick={() => handleStatuteSelect(related.id)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <ListItemText
                    primary={related.title}
                    secondary={`${related.state} ${related.code} § ${related.section}`}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </div>
    );
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
      
      {/* Main content area with list and detail view */}
      <div className="browser-container">
        {/* Statutes list */}
        <div className="statutes-list-container">
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
                      <Card 
                        className={`statute-card ${statute.id === id ? 'selected' : ''}`}
                        onClick={() => handleStatuteSelect(statute.id)}
                      >
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
        
        {/* Statute detail view */}
        <div className="statute-detail-view">
          {renderStatuteDetails()}
        </div>
      </div>
    </div>
  );
};

export default StatutesBrowser;