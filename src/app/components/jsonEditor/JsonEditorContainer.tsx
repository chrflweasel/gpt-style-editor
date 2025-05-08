import { FC, useState, useEffect } from 'react';
import { Box, Button, Typography, Alert } from '@mui/material';
import JsonEditor from './JsonEditor';

interface JsonEditorContainerProps {
  jsonString: string;
  onUpdate?: (updatedJsonString: string) => void;
}

const JsonEditorContainer: FC<JsonEditorContainerProps> = ({ jsonString, onUpdate }) => {
  const [jsonData, setJsonData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Parse the JSON string when it changes
  useEffect(() => {
    try {
      const parsed = JSON.parse(jsonString);
      setJsonData(parsed);
      setError(null);
    } catch (err) {
      setError('Invalid JSON: ' + (err instanceof Error ? err.message : String(err)));
      setJsonData(null);
    }
  }, [jsonString]);

  // Handle updates from the JsonEditor component
  const handleUpdate = (path: string, value: any) => {
    if (!jsonData) return;

    // Create a deep copy of the current data
    const newData = JSON.parse(JSON.stringify(jsonData));
    
    // Update the value at the specified path
    updateValueAtPath(newData, path, value);
    
    // Update the state
    setJsonData(newData);
    
    // Notify parent component if callback is provided
    if (onUpdate) {
      onUpdate(JSON.stringify(newData, null, 2));
    }
  };

  // Helper function to update a value at a specific path in an object
  const updateValueAtPath = (obj: any, path: string, value: any) => {
    // Handle array indices in the path
    const parts = path.split(/\.|\[|\]/).filter(Boolean);
    let current = obj;
    
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      // If the next part is a number, ensure the current part is an array
      if (!isNaN(Number(parts[i + 1])) && !Array.isArray(current[part])) {
        current[part] = [];
      }
      
      if (current[part] === undefined) {
        // If the next part is a number, create an array, otherwise create an object
        current[part] = !isNaN(Number(parts[i + 1])) ? [] : {};
      }
      
      current = current[part];
    }
    
    const lastPart = parts[parts.length - 1];
    current[lastPart] = value;
  };

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!jsonData) {
    return (
      <Typography variant="body1" color="text.secondary">
        No valid JSON data to display.
      </Typography>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, mx: 'auto', p: 2 }}>
      <JsonEditor
        data={jsonData}
        onUpdate={handleUpdate}
      />
    </Box>
  );
};

export default JsonEditorContainer;