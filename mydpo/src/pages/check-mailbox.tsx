import {useRouter} from "next/router";
import {Box, Grid} from "@mui/material";
import Image from "next/image";

function CheckMailbox() {
    const router = useRouter();
    const email = router.query.e && decodeURIComponent(router.query.e.toString());
    const code = router.query.c && decodeURIComponent(router.query.c.toString());

    return (
        <>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{minHeight: '100vh'}}
            >
                <Grid
                    sx={{marginTop: '30px'}}
                >
                    <Box
                        sx={{textAlign: 'center'}}
                    >
                        <h1>Check your mailbox!</h1>
                        <p>We've sent you a magic link to {email ? email : "your email"}.</p>
                        <p>Click on the link to finish signing in.</p>
                        {code && <p>Make sure the verification code matches {code}!</p>}
                    </Box>
                    <Box sx={{display: 'block', paddingLeft: '40%', marginTop: '35px'}}>
                        <Image src={'/loginLogo.svg'}
                               alt={'logo image'}
                               width={'80px'}
                               height={'80px'}/>
                    </Box>

                </Grid>
            </Grid>

        </>
    );
}

export default CheckMailbox;
