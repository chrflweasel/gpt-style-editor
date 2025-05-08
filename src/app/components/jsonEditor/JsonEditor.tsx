import { FC, useState } from 'react';
import { 
  Box, 
  TextField, 
  Typography, 
  Stack, 
  Paper, 
  Switch, 
  FormControlLabel,
  useTheme
} from '@mui/material';
import ColorPickerDialog from './ColorPickerDialog';

// Type for the props of the JsonEditor component
interface JsonEditorProps {
  data: any;
  path?: string;
  onUpdate: (path: string, value: any) => void;
}

// Helper function to check if a string is a valid hex color
const isHexColor = (str: string): boolean => {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(str);
};

// The main JsonEditor component
const JsonEditor: FC<JsonEditorProps> = ({ data, path = '', onUpdate }) => {
  const theme = useTheme();
  // State for color picker dialog
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [currentColorPath, setCurrentColorPath] = useState<string | null>(null);
  const [currentColor, setCurrentColor] = useState<string>('#000000');

  // If data is null or undefined, render nothing
  if (data === null || data === undefined) {
    return null;
  }

  // Render the final component with the color picker dialog
  const renderWithColorPicker = (content: React.ReactNode) => {
    return (
      <>
        {content}
        <ColorPickerDialog
          open={colorPickerOpen}
          onClose={handleCloseColorPicker}
          color={currentColor}
          onChange={setCurrentColor}
          onSave={handleSaveColor}
        />
      </>
    );
  };

  // Function to handle updates from child components or direct edits
  const handleUpdate = (fieldPath: string, value: any) => {
    onUpdate(fieldPath, value);
  };

  // Function to open color picker dialog
  const handleOpenColorPicker = (colorPath: string, color: string) => {
    setCurrentColorPath(colorPath);
    setCurrentColor(color);
    setColorPickerOpen(true);
  };

  // Function to close color picker dialog
  const handleCloseColorPicker = () => {
    setColorPickerOpen(false);
  };

  // Function to save color from dialog
  const handleSaveColor = () => {
    if (currentColorPath) {
      handleUpdate(currentColorPath, currentColor);
    }
    handleCloseColorPicker();
  };

  // Render different UI based on the type of data
  if (typeof data === 'object' && !Array.isArray(data)) {
    // Handle object type - recursively render each field
    return renderWithColorPicker(
      <Paper elevation={path ? 1 : 3} sx={{ p: 2, mb: 2, bgcolor: path ? 'background.default' : 'background.paper' }}>
        {path && (
          <Typography variant="subtitle1" fontWeight="bold" mb={2}>
            {path.split('.').pop()}
          </Typography>
        )}
        <Stack spacing={2}>
          {Object.entries(data).map(([key, value]) => {
            const currentPath = path ? `${path}.${key}` : key;
            return (
              <JsonEditor
                key={currentPath}
                data={value}
                path={currentPath}
                onUpdate={handleUpdate}
              />
            );
          })}
        </Stack>
      </Paper>
    );
  } else if (Array.isArray(data) && data.every(item => typeof item === 'string' && isHexColor(item))) {
    // Handle array of hex colors
    return renderWithColorPicker(
      <Box mb={2}>
        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          {path.split('.').pop()}
        </Typography>
        <Stack spacing={2}>
          {data.map((color, index) => {
            const colorPath = `${path}[${index}]`;
            return (
              <Paper 
                key={colorPath}
                elevation={1} 
                sx={{ 
                  p: 2,
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)'
                  }
                }}
                onClick={() => handleOpenColorPicker(colorPath, color)}
              >
                <Typography variant="body2" mb={1}>
                  Color {index + 1}
                </Typography>
                <Box 
                  sx={{ 
                    height: 60, 
                    width: '100%', 
                    bgcolor: color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1,
                    mb: 1
                  }}
                >
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: theme.palette.getContrastText(color),
                      fontWeight: 'bold'
                    }}
                  >
                    {color}
                  </Typography>
                </Box>
              </Paper>
            );
          })}
        </Stack>
      </Box>
    );
  } else if (Array.isArray(data)) {
    // Handle other arrays
    return renderWithColorPicker(
      <Box mb={2}>
        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          {path.split('.').pop()}
        </Typography>
        <Stack spacing={1}>
          {data.map((item, index) => {
            const itemPath = `${path}[${index}]`;
            return (
              <JsonEditor
                key={itemPath}
                data={item}
                path={itemPath}
                onUpdate={handleUpdate}
              />
            );
          })}
        </Stack>
      </Box>
    );
  } else if (typeof data === 'string' && isHexColor(data)) {
    // Handle hex color string
    return renderWithColorPicker(
      <Box mb={2}>
        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          {path.split('.').pop()}
        </Typography>
        <Paper 
          elevation={1} 
          sx={{ 
            p: 2,
            cursor: 'pointer',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.02)'
            }
          }}
          onClick={() => handleOpenColorPicker(path, data)}
        >
          <Box 
            sx={{ 
              height: 60, 
              width: '100%', 
              bgcolor: data,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 1
            }}
          >
            <Typography 
              variant="body1" 
              sx={{ 
                color: theme.palette.getContrastText(data),
                fontWeight: 'bold'
              }}
            >
              {data}
            </Typography>
          </Box>
        </Paper>
      </Box>
    );
  } else if (typeof data === 'boolean') {
    // Handle boolean values
    return renderWithColorPicker(
      <Box mb={2}>
        <FormControlLabel
          control={
            <Switch
              checked={data}
              onChange={(e) => handleUpdate(path, e.target.checked)}
              color="primary"
            />
          }
          label={path.split('.').pop()}
        />
      </Box>
    );
  } else if (typeof data === 'string' || typeof data === 'number') {
    // Handle string or number
    return renderWithColorPicker(
      <Box mb={2}>
        <TextField
          fullWidth
          label={path.split('.').pop()}
          value={data}
          onChange={(e) => {
            const value = typeof data === 'number' ? 
              (isNaN(Number(e.target.value)) ? 0 : Number(e.target.value)) : 
              e.target.value;
            handleUpdate(path, value);
          }}
          type={typeof data === 'number' ? 'number' : 'text'}
        />
      </Box>
    );
  }

  // Fallback for unsupported types
  return renderWithColorPicker(
    <Box mb={2}>
      <Typography color="error">
        Unsupported type for field: {path}
      </Typography>
    </Box>
  );
};


export default JsonEditor;
