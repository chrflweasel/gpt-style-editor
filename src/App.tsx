import PageLayout from "./app/components/layout/PageLayout.tsx";
import {Typography} from "@mui/material";

const App = () => {

    return (
        <PageLayout>
            <Typography
                variant={'h4'}
                p={4}
            >
                Upload a JSON style file
            </Typography>
        </PageLayout>
    )
}

export default App
