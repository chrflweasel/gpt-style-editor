import {useState, useRef, useEffect, type FC} from 'react';
import {Box, Typography, Stack, Paper, Button} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

interface JsonFileUploaderProps {
    onFileLoaded?: (content: string) => void;
}

const JsonFileUploader: FC<JsonFileUploaderProps> = ({onFileLoaded}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const dropAreaRef = useRef<HTMLDivElement>(null);
    const dragCounterRef = useRef<number>(0);

    // Handle file reading
    const handleFileRead = (file: File) => {
        if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
            alert('Please upload a JSON file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const content = e.target?.result as string;
                // Validate JSON
                JSON.parse(content);
                setFileName(file.name);
                onFileLoaded?.(content);
            } catch (error) {
                alert('Invalid JSON file');
            }
        };
        reader.readAsText(file);
    };

    // Handle click upload
    const handleClickUpload = () => {
        fileInputRef.current?.click();
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileRead(file);
        }
    };

    // Handle drag and drop
    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current += 1;
      setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current -= 1;
      if (dragCounterRef.current === 0) {
        setIsDragging(false);
      }
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current = 0;
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (file) {
        handleFileRead(file);
      }
    };

    // Handle clipboard paste
    useEffect(() => {
        const handlePaste = (e: ClipboardEvent) => {
            const clipboardData = e.clipboardData;
            if (!clipboardData) return;

            // Check for files in clipboard
            if (clipboardData.files.length > 0) {
                const file = clipboardData.files[0];
                handleFileRead(file);
                return;
            }

            // Check for text in clipboard that might be JSON
            const text = clipboardData.getData('text');
            if (text) {
                try {
                    JSON.parse(text);
                    setFileName('pasted-content.json');
                    onFileLoaded?.(text);
                } catch (error) {
                    // Not valid JSON, ignore
                }
            }
        };

        document.addEventListener('paste', handlePaste);
        return () => {
            document.removeEventListener('paste', handlePaste);
        };
    }, [onFileLoaded]);

    return (
        <Stack spacing={2} alignItems="center" width="100%" maxWidth={600}>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                accept=".json,application/json"
                style={{display: 'none'}}
            />

            <Paper
                ref={dropAreaRef}
                component={Box}
                sx={{
                    width: '100%',
                    p: 4,
                    borderRadius: 2,
                    border: isDragging ? '3px dashed' : '2px dashed',
                    borderColor: isDragging ? 'primary.main' : 'divider',
                    bgcolor: isDragging ? 'primary.light' : 'background.paper',
                    boxShadow: isDragging ? 3 : 1,
                    transform: isDragging ? 'scale(1.02)' : 'scale(1)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    '&:hover': {
                        bgcolor: 'action.hover',
                    },
                }}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleClickUpload}
            >
                <Stack spacing={2} alignItems="center">
                    <UploadFileIcon sx={{
                        fontSize: 48,
                        color: isDragging ? 'primary.dark' : 'primary.main',
                        transition: 'color 0.2s ease'
                    }}/>

                    <Typography
                        variant="h6"
                        align="center"
                        sx={{
                            color: isDragging ? 'primary.contrastText' : 'text.primary',
                            transition: 'color 0.2s ease'
                        }}
                    >
                        {fileName ? `File loaded: ${fileName}` : 'Drop JSON file here or click to upload'}
                    </Typography>

                    <Typography
                        variant="body2"
                        align="center"
                        sx={{
                            color: isDragging ? 'primary.contrastText' : 'text.secondary',
                            transition: 'color 0.2s ease'
                        }}
                    >
                        You can also paste JSON content from clipboard (Ctrl+V)
                    </Typography>

                    <Button
                        variant="contained"
                        startIcon={<UploadFileIcon/>}
                        sx={{
                            opacity: isDragging ? 0.8 : 1,
                            transition: 'opacity 0.2s ease'
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClickUpload();
                        }}
                    >
                        Select JSON File
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={<ContentPasteIcon/>}
                        sx={{
                            opacity: isDragging ? 0.8 : 1,
                            transition: 'opacity 0.2s ease'
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            alert('Press Ctrl+V to paste JSON content from clipboard');
                        }}
                    >
                        Paste from Clipboard
                    </Button>
                </Stack>
            </Paper>

            {fileName && (
                <Typography variant="body2" color="success.main">
                    JSON file loaded successfully: {fileName}
                </Typography>
            )}
        </Stack>
    );
};

export default JsonFileUploader;
