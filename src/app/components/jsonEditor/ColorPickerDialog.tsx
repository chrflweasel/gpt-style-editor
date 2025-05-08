import { FC } from 'react';
import { 
  Box, 
  TextField, 
  Typography, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme
} from '@mui/material';
import { HexColorPicker } from 'react-colorful';

// Color picker dialog component
const ColorPickerDialog: FC<{
  open: boolean;
  onClose: () => void;
  color: string;
  onChange: (color: string) => void;
  onSave: () => void;
}> = ({ open, onClose, color, onChange, onSave }) => {
  const theme = useTheme();
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Edit Color</DialogTitle>
      <DialogContent>
        <Box sx={{ p: 2 }}>
          <HexColorPicker color={color} onChange={onChange} />
          <TextField
            fullWidth
            value={color}
            onChange={(e) => onChange(e.target.value)}
            sx={{ mt: 2 }}
            placeholder="#RRGGBB"
          />
          <Box 
            sx={{ 
              height: 60, 
              width: '100%', 
              bgcolor: color,
              mt: 2,
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography 
              variant="body1" 
              sx={{ 
                color: theme.palette.getContrastText(color),
                fontWeight: 'bold'
              }}
            >
              {color}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} variant="contained" color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColorPickerDialog;