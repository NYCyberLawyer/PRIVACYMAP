import {useRouter} from "next/router";
import {useState} from "react";
import {Box, Button, Grid, TextField} from "@mui/material";
import Image from 'next/image'
import {toast} from "react-hot-toast";

/**
 * Used on the Login and Sign Up screens to handle authentication. Can be shared between those as Passport.js doesn't differentiate between logging in and signing up.
 */
export default function AuthenticationForm() {
    const [email, setEmail] = useState("");
    const router = useRouter();
    const {r} = router.query;
    const redirect = r?.toString();

    return (
        <form
            onSubmit={(evt) => {
                evt.preventDefault();
                // POST a request with the users email or phone number to the server
                fetch(`/api/auth/magiclink`, {
                    method: `POST`,
                    body: JSON.stringify({
                        redirect,
                        destination: email,
                    }),
                    headers: {"Content-Type": "application/json"},
                })
                    .then((res) => res.json())
                    .then((json) => {
                        if (json.success) {
                            // Add the email and security code to the query params so we can show them on the /check-mailbox page
                            router.push(
                                `/check-mailbox?e=${encodeURIComponent(email)}&c=${json.code}`
                            );
                        } else {
                            toast.error('The submitted user is not registered in the app!')
                        }
                    });
            }}
        >
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
                    <TextField
                        type={'email'}
                        label="Email Address"
                        variant="standard"
                        style={{width: '394px'}}
                        value={email}
                        onChange={(evt) => setEmail(evt.target.value)}
                    />
                    <br/>
                    <Button
                        style={{
                            backgroundColor: '#F6931E',
                            height: '42px',
                            width: '394px',
                            borderRadius: '50px',
                            marginTop: '30px',
                        }}
                        variant="contained"
                        type={'submit'}
                    >
                        Sign in
                    </Button>
                    <Box sx={{display: 'block', paddingLeft: '40%', marginTop: '35px'}}> <Image src={'/loginLogo.svg'}
                                                                                                alt={'logo image'}
                                                                                                width={'80px'}
                                                                                                height={'80px'}/> </Box>

                    <Box sx={{textAlign: 'center', marginTop: '90px'}}>
                        <a style={{textDecoration: 'none', color: '#0072E5'}}
                           href='https://www.privateers.io/privacy-policy/' target="_blank"> Privacy policy </a> & <a
                        style={{textDecoration: 'none', color: '#0072E5'}} href='https://www.privateers.io/tou/'
                        target="_blank"> Terms
                        of Service </a>
                    </Box>
                </Grid>
            </Grid>
        </form>
    );
}
