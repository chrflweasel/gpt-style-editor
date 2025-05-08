import PageLayout from "./app/components/layout/PageLayout.tsx";
import {Typography, Button, Box} from "@mui/material";
import JsonFileUploader from "./app/components/fileUploader/JsonFileUploader.tsx";
import JsonEditorContainer from "./app/components/jsonEditor/JsonEditorContainer.tsx";
import JsonViewer from "./app/components/jsonViewer/JsonViewer.tsx";
import {useState} from "react";

const App = () => {
    const [jsonContent, setJsonContent] = useState<string | null>(null);

    const handleFileLoaded = (content: string) => {
        setJsonContent(content);
        // You can add additional processing here if needed
    };

    const handleJsonUpdate = (updatedJson: string) => {
        setJsonContent(updatedJson);
    };

    const handleReset = () => {
        setJsonContent(null);
    };

    console.log('json', jsonContent);

    return (
        <PageLayout>
            <Typography
                variant={'h4'}
                p={2}
                align="center"
            >
                JSON style editor
            </Typography>

            {!jsonContent && <JsonFileUploader onFileLoaded={handleFileLoaded}/>}

            {jsonContent && (
                <>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            width: '100%',
                            maxWidth: 1200,
                            mx: 'auto',
                            px: 2
                        }}
                    >
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleReset}
                            sx={{mb: 2}}
                        >
                            Load Different JSON
                        </Button>
                    </Box>
                    <Box
                        display={'flex'}
                        width={'100%'}
                        maxWidth={'1200px'}
                        sx={{
                            '& > div': {
                                flex: 1
                            }
                        }}
                    >
                        <JsonEditorContainer
                            jsonString={jsonContent}
                            onUpdate={handleJsonUpdate}
                        />
                        <JsonViewer jsonString={jsonContent} />
                    </Box>

                </>
            )}
        </PageLayout>
    )
}

export default App;
