import Layout from "../../../client/components/Layout";
import {Box, Button, Grid} from "@mui/material";
import {useRouter} from "next/router";
import Image from 'next/image'
import {FaDownload} from 'react-icons/fa';
import {useGetBusinessQuery} from "../../../client/graphql/getBusiness.generated";
import ExportButton from '../../../client/components/ExportButton'

export default function Reports() {
    const router = useRouter();
    const {slug} = router.query;
    const [{data, fetching, error}] = useGetBusinessQuery({
        variables: { 
            id: String(slug)
        }
    })

    if (fetching) return <p>Loading...</p>;

    if (error) return <p>{error.message}</p>;

    const greenButton = {
        width: '394px',
        height: '46px',
        marginTop: '0px',
        marginBottom: '15px',
        borderRadius: '25px',
        gridColumnStart: 2,
        backgroundColor: '#0AA64E',
        "&:hover": {
            background: "#09953D"
        },
    }

    

    return (
        <>
            <Layout>
                <Grid
                    sx={{marginTop: '70px'}}
                >
                    <Box
                        sx={{
                            display: 'grid',
                            gap: '24px',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                        }}
                    >
                    </Box>

                    <Box
                        sx={{
                            display: 'grid',
                            gap: '24px',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            marginTop: '8%',
                            justifyItems: 'center'
                        }}
                    >

                        <Button
                            variant="contained"
                            color="success"
                            sx={greenButton}
                            onClick={() => router.push(`/app/${data?.business?.id}/diagram`)}
                        >
                            <span>GENERATE MAP</span><span
                            style={{marginLeft: '10px', marginTop: '4px', fontSize: '13px'}}>
                                <FaDownload style={{
                                    color: 'white',
                                    border: '2px solid white',
                                    padding: '2px',
                                    marginLeft: '10px'
                                }}/>
                            </span>
                        </Button>

                        <ExportButton business={data?.business}/>

                        <Box style={{gridColumnStart: 2, marginTop: '40px'}}>
                            <Image src={'/navbarLogo.png'}
                                width={'76.38px'}
                                height={'70px'}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Layout>
        </>
    );
}
