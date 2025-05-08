import type {FC, ReactNode} from "react";
import {Stack} from "@mui/material";

const PageLayout: FC<{children: ReactNode}> = (props) => {
    const { children } = props;

    return (
        <Stack
            height={'100dvh'}
            width={'100vw'}
            alignItems={'center'}
        >
            {children}
        </Stack>
    )
}

export default PageLayout;