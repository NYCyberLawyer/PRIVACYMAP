import Navbar from "../Navbar";
import {Box, Container, Grid} from "@mui/material";

interface Props {
    children: React.ReactNode;
}

export default function Layout({children}: Props) {
    return (
        <>
            <Box
            sx={{backgroundColor: '#F2F2F2'}}
            >
                <Navbar/>
                <Container>
                    <Grid>
                        {children}
                    </Grid>
                </Container>
            </Box>
        </>
    );
}
