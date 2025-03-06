// src/components/StatuteDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import UpdateIcon from '@mui/icons-material/Update';
import BookmarkIcon from '@mui/icons-material/Bookmark';
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

const StatuteDetail = () => {
  const { id } = useParams();
  const [statute, setStatute] = useState(null);
  const [relatedStatutes, setRelatedStatutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Statute ID:", id);
    const fetchStatuteDetail = async () => {
      try {
        setLoading(true);
        const statuteData = await apiService.getStatuteById(id);
        setStatute(statuteData);
        
        // If there are related statutes, fetch them
        if (statuteData.relatedStatutes && statuteData.relatedStatutes.length > 0) {
          const relatedIds = statuteData.relatedStatutes;
          const relatedData = await Promise.all(
            relatedIds.map(relatedId => apiService.getStatuteById(relatedId))
          );
          setRelatedStatutes(relatedData);
        }
        
        setError(null);
      } catch (err) {
        setError('Failed to load statute details. Please try again later.');
        console.error('Error fetching statute details:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStatuteDetail();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 2 }}>
        <Alert severity="error">{error}</Alert>
        <Button
          component={RouterLink}
          to="/statutes"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Back to Statutes
        </Button>
      </Box>
    );
  }

  if (!statute) {
    return (
      <Box sx={{ mt: 2 }}>
        <Alert severity="info">Statute not found.</Alert>
        <Button
          component={RouterLink}
          to="/statutes"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Back to Statutes
        </Button>
      </Box>
    );
  }

  return (
    <div>
      <Button
        component={RouterLink}
        to="/statutes"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back to Statutes
      </Button>
      
      <Paper className="statute-detail-container">
        <div className="statute-detail-header">
          <Typography variant="h5" component="h1" gutterBottom>
            {statute.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {statute.state} {statute.code} § {statute.section}
          </Typography>
          
          <Box sx={{ mt: 2, mb: 1 }}>
            {statute.tags && statute.tags.map((tag) => (
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
            {statute.dateEnacted && (
              <div className="metadata-item">
                <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">
                  Enacted: {formatDate(statute.dateEnacted)}
                </Typography>
              </div>
            )}
            
            {statute.lastAmended && (
              <div className="metadata-item">
                <UpdateIcon fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body2">
                  Last Amended: {formatDate(statute.lastAmended)}
                </Typography>
              </div>
            )}
          </div>
        </div>
        
        <Typography variant="h6" gutterBottom>
          Statute Text
        </Typography>
        <Typography variant="body1" className="statute-text">
          {statute.text}
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
                  component={RouterLink}
                  to={`/statutes/${related.id}`}
                  sx={{
                    textDecoration: 'none',
                    color: 'inherit',
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
      </Paper>
    </div>
  );
};

export default StatuteDetail;