import PageLayout from "./app/components/layout/PageLayout.tsx";
import {Typography} from "@mui/material";
import JsonFileUploader from "./app/components/fileUploader/JsonFileUploader.tsx";
import {useState} from "react";

const App = () => {
    const [jsonContent, setJsonContent] = useState<string | null>(null);

    const handleFileLoaded = (content: string) => {
        setJsonContent(content);
        // You can add additional processing here if needed
    };

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


        </PageLayout>
    )
}

export default App;
