import Image from 'next/image'
import {useGetCurrentUserQuery} from "../../graphql/getCurrentUser.generated";
import {Box, Button, Container, Grid} from "@mui/material";
import {useRouter} from "next/router";
import {FaPlus} from 'react-icons/fa';

function Navbar() {
    const [{data}] = useGetCurrentUserQuery();
    const router = useRouter();
    const isAuthenticated = !!data?.currentUser;

    // @ts-ignore
    return (
        <Grid
            sx={{
                backgroundColor: '#FFFFFF',
            }}
        >
            <Container
                sx={{
                    display: `flex`,
                    justifyContent: `space-between`,
                    height: '111px',
                    alignItems: 'center'
                }}
            >
                <Box>
                    <Image src={'/navbarLogo.png'}
                           width={'76.38px'}
                           height={'70px'}
                           onClick={() => {
                               isAuthenticated ? router.push('/app') : router.push('/')
                           }}/>
                </Box>

                <Box sx={{marginLeft: '68%', position: 'static', marginBottom: '10px', marginTop: '12px'}}>
                    <Image src={'/navbarBack.svg'}
                           width={'24px'} height={'15px'}
                           onClick={() => {
                               router.back()
                           }}/>
                </Box>

                <Box
                    sx={{marginTop: '30px'}}
                >
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#F6931E',
                            height: '44px',
                            width: '170px',
                            borderRadius: '50px',
                            fontSize: '13px',
                            fontWeight: 500,
                            marginBottom: '35px',
                            marginRight: '20px',
                            marginLeft: '22px'
                        }}
                        onClick={() => router.push('/app/add-business')}
                    >

<span style={{
    color: 'white',
    padding: '0px 2px 0px 2px',
    height: '20px'
}}>
<FaPlus style={{
    color: 'white', border: '2px solid white',
    borderRadius: '20px', padding: '2px', marginRight: '10px'
}}/>
</span>
                        <span> new company </span>
                    </Button>

                    <Image src={'/logout.svg'}
                           width={'44px'}
                           height={'44px'}
                           onClick={() => {
                               router.push('/api/auth/logout')
                           }}/>
                </Box>
            </Container>
        </Grid>
    );
}

export default Navbar;
