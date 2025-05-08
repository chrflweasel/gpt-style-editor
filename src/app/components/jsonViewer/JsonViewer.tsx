import { FC, useState } from 'react';
import { Box, Button, Paper, Typography, Snackbar, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';

interface JsonViewerProps {
  jsonString: string;
}

const JsonViewer: FC<JsonViewerProps> = ({ jsonString }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  // Parse the JSON string to format it nicely
  const formattedJson = (() => {
    try {
      return JSON.stringify(JSON.parse(jsonString), null, 2);
    } catch (error) {
      return 'Invalid JSON';
    }
  })();

  // Function to syntax highlight JSON
  const syntaxHighlight = (json: string) => {
    // Replace special characters to prevent XSS
    json = json
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Regex patterns for different JSON elements
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = 'json-number'; // Default class for numbers
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = 'json-key'; // JSON keys
          } else {
            cls = 'json-string'; // JSON strings
          }
        } else if (/true|false/.test(match)) {
          cls = 'json-boolean'; // JSON booleans
        } else if (/null/.test(match)) {
          cls = 'json-null'; // JSON null
        }
        return `<span class="${cls}">${match}</span>`;
      }
    );
  };

  // Function to copy JSON to clipboard
  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setSnackbarMessage('JSON copied to clipboard');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Failed to copy JSON');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // Function to download JSON as a file
  const handleDownloadJson = () => {
    try {
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setSnackbarMessage('JSON downloaded successfully');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('Failed to download JSON');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  // Function to close the snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button 
          variant="outlined" 
          startIcon={<ContentCopyIcon />} 
          onClick={handleCopyToClipboard}
          sx={{ mr: 1 }}
        >
          Copy
        </Button>
        <Button 
          variant="outlined" 
          startIcon={<DownloadIcon />} 
          onClick={handleDownloadJson}
        >
          Download
        </Button>
      </Box>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 2, 
          maxHeight: '600px', 
          overflow: 'auto',
          fontFamily: 'monospace',
          backgroundColor: '#1e1e1e', // Dark background for better contrast
          borderRadius: 1,
          color: '#d4d4d4', // Light text for dark background
          '& .json-key': {
            color: '#9cdcfe', // Light blue for keys
          },
          '& .json-string': {
            color: '#ce9178', // Orange for strings
          },
          '& .json-number': {
            color: '#b5cea8', // Light green for numbers
          },
          '& .json-boolean': {
            color: '#569cd6', // Blue for booleans
          },
          '& .json-null': {
            color: '#569cd6', // Blue for null
          }
        }}
      >
        <pre 
          style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
          dangerouslySetInnerHTML={{ __html: syntaxHighlight(formattedJson) }}
        />
      </Paper>

      <Snackbar 
        open={snackbarOpen} 
        autoHideDuration={3000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default JsonViewer;
