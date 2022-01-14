import React from "react";
import {Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import {useMutation} from "urql";
import {toast} from "react-hot-toast";
import {useRouter} from "next/router";
import {Box, Button, Grid} from "@mui/material";
import {TextField} from "formik-mui";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import {FaArchive, FaSave} from "react-icons/fa";
import Layout from "../../../client/components/Layout";
import {UpdateBusinessDocument} from "../../../client/graphql/updateBusiness.generated";
import {useGetBusinessQuery} from "../../../client/graphql/getBusiness.generated";

const addBusiness: React.FC = () => {
    const [, updateBusiness] = useMutation(UpdateBusinessDocument)
    const router = useRouter();
    const {slug} = router.query;
    const [{data, fetching, error}] = useGetBusinessQuery({
        variables: {
            id: String(slug)
        }
    })

    if (fetching) return <p>Loading...</p>;

    if (error) return <p>{error.message}</p>;

    const validationSchema = Yup.object().shape({
        companyName: Yup.string()
            .min(2, 'Too short!')
            .max(50, 'Too long!')
            .required('Required!'),
        companyAddress: Yup.string()
            .min(2, 'Too short!')
            .max(50, 'Too long!')
            .required('Required!'),
        companyPhone: Yup.string()
            .matches(/^[0-9]+$/, "maximum 20 digits")
            .min(5, 'Too short!')
            .max(20, 'Too long!')
            .required('Required!'),
        companyEmail: Yup.string()
            .required()
            .min(2, 'Too short!')
            .max(50, 'Too long!')
            .required('Required!'),

        businessContactName: Yup.string()
            .min(2, 'Too short!')
            .max(50, 'Too long!')
            .required('Required!'),
        businessContactPosition: Yup.string()
            .min(2, 'Too short!')
            .max(50, 'Too long!')
            .required('Required!'),
        businessContactPhone: Yup.string()
            .matches(/^[0-9]+$/, "maximum 20 digits")
            .min(5, 'Too short!')
            .max(20, 'Too long!')
            .required('Required!'),
        businessContactEmail: Yup.string()
            .min(2, 'Too short!')
            .max(50, 'Too long!')
            .required('Required!'),

        technicalContactName: Yup.string()
            .min(2, 'Too short!')
            .max(50, 'Too long!')
            .required('Required!'),
        technicalContactPosition: Yup.string()
            .min(2, 'Too short!')
            .max(50, 'Too long!')
            .required('Required!'),
        technicalContactPhone: Yup.string()
            .matches(/^[0-9]+$/, "maximum 20 digits")
            .min(5, 'Too short!')
            .max(20, 'Too long!')
            .required('Required!'),
        technicalContactEmail: Yup.string()
            .min(2, 'Too short!')
            .max(50, 'Too long!')
            .required('Required!'),

        privacyLiaisonContactName: Yup.string()
            .min(2, 'Too short!')
            .max(50, 'Too long!')
            .required('Required!'),
        privacyLiaisonContactPosition: Yup.string()
            .min(2, 'Too short!')
            .max(50, 'Too long!')
            .required('Required!'),
        privacyLiaisonContactPhone: Yup.string()
            .matches(/^[0-9]+$/, "maximum 20 digits")
            .min(5, 'Too short!')
            .max(20, 'Too long!')
            .required('Required!'),
        privacyLiaisonContactEmail: Yup.string()
            .min(2, 'Too short!')
            .max(50, 'Too long!')
            .required('Required!'),

        hrContactName: Yup.string()
            .min(2, 'Too short!')
            .max(50, 'Too long!')
            .required('Required!'),
        hrContactPosition: Yup.string()
            .min(2, 'Too short!')
            .max(50, 'Too long!')
            .required('Required!'),
        hrContactPhone: Yup.string()
            .matches(/^[0-9]+$/, "maximum 20 digits")
            .min(5, 'Too short!')
            .max(20, 'Too long!')
            .required('Required!'),
        hrContactEmail: Yup.string()
            .min(2, 'Too short!')
            .max(50, 'Too long!')
            .required('Required!'),
    })

    return (
        <>
            <Layout>
                <Grid
                >
                    <Formik
                        initialValues={{
                            companyName: data?.business?.companyName,
                            companyAddress: data?.business?.companyAddress,
                            companyPhone: data?.business?.companyPhone,
                            companyEmail: data?.business?.companyEmail,

                            businessContactName: data?.business?.businessContactName,
                            businessContactPosition: data?.business?.businessContactPosition,
                            businessContactPhone: data?.business?.businessContactPhone,
                            businessContactEmail: data?.business?.businessContactEmail,

                            technicalContactName: data?.business?.technicalContactName,
                            technicalContactPosition: data?.business?.technicalContactPosition,
                            technicalContactPhone: data?.business?.technicalContactPhone,
                            technicalContactEmail: data?.business?.technicalContactEmail,

                            privacyLiaisonContactName: data?.business?.privacyLiaisonContactName,
                            privacyLiaisonContactPosition: data?.business?.privacyLiaisonContactPosition,
                            privacyLiaisonContactPhone: data?.business?.privacyLiaisonContactPhone,
                            privacyLiaisonContactEmail: data?.business?.privacyLiaisonContactEmail,

                            hrContactName: data?.business?.hrContactName,
                            hrContactPosition: data?.business?.hrContactPosition,
                            hrContactPhone: data?.business?.hrContactPhone,
                            hrContactEmail: data?.business?.hrContactEmail,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => {
                            const data = {id: String(slug), ...values}
                            await updateBusiness(data)
                            toast.success('Business updated successfully!')
                            await router.push('/app')
                        }}
                    >
                        {({errors, touched}) => (
                            <Form>
                                <Grid
                                    sx={{
                                        marginTop: '40px',
                                        marginBottom: '30px',
                                        display: 'grid',
                                        gap: '10px',
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            backgroundColor: '#FFFFFF',
                                            width: '661px',
                                            height: '44px',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <h1
                                            style={{
                                                marginLeft: '20px',
                                                color: '#F6931E',
                                                fontSize: '20px'
                                            }}
                                        >{data?.business?.companyName}</h1>
                                    </Box>
                                    <Button
                                        variant={'contained'}
                                        color={'error'}
                                        sx={{
                                            width: '149px',
                                            height: '44px',
                                            borderRadius: '50px',
                                        }}
                                        onClick={() => {
                                            confirmAlert({
                                                title: 'Cancel',
                                                message: 'Are you sure you want to cancel? You will lose all the data you entered',
                                                buttons: [
                                                    {
                                                        label: 'Yes',
                                                        onClick: () => router.push(`/app/${data?.business?.id}`)
                                                    },
                                                    {
                                                        label: 'No',
                                                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                                                        onClick: () => {
                                                        }
                                                    }
                                                ]
                                            });
                                        }}
                                    >
                                        <span>
                                                <FaArchive style={{
                                                    color: 'white',
                                                    border: '2px solid white',
                                                    padding: '2px',
                                                    marginRight: '7px',
                                                    marginTop: '4px'
                                                }}/>
                                            </span>
                                        Cancel
                                    </Button>
                                    <Button
                                        variant={'contained'}
                                        color={'success'}
                                        type={'submit'}
                                        sx={{
                                            width: '149px',
                                            height: '44px',
                                            borderRadius: '50px',
                                        }}
                                    >
                                        <span>
                                                <FaSave style={{
                                                    color: 'white',
                                                    border: '2px solid white',
                                                    padding: '2px',
                                                    marginRight: '7px',
                                                    marginTop: '4px'
                                                }}/>
                                            </span>
                                        Save
                                    </Button>
                                </Grid>
                                <Grid
                                    sx={{
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '10px',
                                        paddingBottom: '25px',
                                        paddingTop: '10px',
                                        paddingLeft: '20px',
                                        paddingRight: '20px',
                                    }}
                                >
                                    <Box>
                                        <h2>Company Data</h2>
                                    </Box>
                                    <Grid
                                        sx={{
                                            display: 'grid',
                                            gap: '10px',
                                            gridTemplateColumns: 'repeat(2, 1fr)',
                                        }}
                                    >
                                        <Field
                                            // @ts-ignore
                                            error={errors.companyName && touched.companyName}
                                            component={TextField}
                                            name={'companyName'}
                                            type={'text'}
                                            label="Name"
                                            helperText={errors.companyName}
                                            variant="standard"
                                        />
                                        <Field
                                            // @ts-ignore
                                            error={errors.companyAddress && touched.companyAddress}
                                            component={TextField}
                                            name={'companyAddress'}
                                            type={'text'}
                                            label="Address"
                                            helperText={errors.companyAddress}
                                            variant="standard"
                                        />
                                        <Field
                                            // @ts-ignore
                                            error={errors.companyPhone && touched.companyPhone}
                                            component={TextField}
                                            name={'companyPhone'}
                                            type={'text'}
                                            label="Phone"
                                            helperText={errors.companyPhone}
                                            variant="standard"
                                            maxLength={10}
                                        />
                                        <Field
                                            // @ts-ignore
                                            error={errors.companyEmail && touched.companyEmail}
                                            component={TextField}
                                            name={'companyEmail'}
                                            type={'email'}
                                            label="Email"
                                            helperText={errors.companyEmail}
                                            variant="standard"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    sx={{
                                        marginTop: '40px', display: 'grid',
                                        gap: '10px',
                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                    }}
                                >
                                    <Grid
                                        sx={{
                                            backgroundColor: '#FFFFFF',
                                            borderRadius: '10px',
                                            paddingBottom: '25px',
                                            paddingTop: '10px',
                                            paddingLeft: '20px',
                                            paddingRight: '20px',
                                            display: 'grid',
                                            gap: '10px',
                                            gridTemplateColumns: 'repeat(1, 1fr)'
                                        }}
                                    >
                                        <Box>
                                            <h2>Business Contact</h2>
                                        </Box>
                                        <Field
                                            // @ts-ignore
                                            error={errors.businessContactName && touched.businessContactName}
                                            component={TextField}
                                            name={'businessContactName'}
                                            type={'text'}
                                            label="Name"
                                            helperText={errors.businessContactName}
                                            variant="standard"
                                        />
                                        <Field
                                            // @ts-ignore
                                            error={errors.businessContactPosition && touched.businessContactPosition}
                                            component={TextField}
                                            name={'businessContactPosition'}
                                            type={'text'}
                                            label="Position"
                                            helperText={errors.businessContactPosition}
                                            variant="standard"
                                        />
                                        <Field
                                            // @ts-ignore
                                            error={errors.businessContactPhone && touched.businessContactPhone}
                                            component={TextField}
                                            name={'businessContactPhone'}
                                            type={'text'}
                                            label="Phone"
                                            helperText={errors.businessContactPhone}
                                            variant="standard"
                                        />
                                        <Field
                                            // @ts-ignore
                                            error={errors.businessContactEmail && touched.businessContactEmail}
                                            component={TextField}
                                            name={'businessContactEmail'}
                                            type={'email'}
                                            label="Email"
                                            helperText={errors.businessContactEmail}
                                            variant="standard"
                                        />
                                    </Grid>
                                    <Grid
                                        sx={{
                                            backgroundColor: '#FFFFFF',
                                            borderRadius: '10px',
                                            paddingBottom: '25px',
                                            paddingTop: '10px',
                                            paddingLeft: '20px',
                                            paddingRight: '20px',
                                            display: 'grid',
                                            gap: '10px',
                                            gridTemplateColumns: 'repeat(1, 1fr)'
                                        }}
                                    >
                                        <Box>
                                            <h2>Technical Contact</h2>
                                        </Box>
                                        <Field
                                            // @ts-ignore
                                            error={errors.technicalContactName && touched.technicalContactName}
                                            component={TextField}
                                            name={'technicalContactName'}
                                            type={'text'}
                                            label="Name"
                                            helperText={errors.technicalContactName}
                                            variant="standard"
                                        />
                                        <Field
                                            // @ts-ignore
                                            error={errors.technicalContactPosition && touched.technicalContactPosition}
                                            component={TextField}
                                            name={'technicalContactPosition'}
                                            type={'text'}
                                            label="Position"
                                            helperText={errors.technicalContactPosition}
                                            variant="standard"
                                        />
                                        <Field
                                            // @ts-ignore
                                            error={errors.technicalContactPhone && touched.technicalContactPhone}
                                            component={TextField}
                                            name={'technicalContactPhone'}
                                            type={'text'}
                                            label="Phone"
                                            helperText={errors.technicalContactPhone}
                                            variant="standard"
                                        />
                                        <Field
                                            // @ts-ignore
                                            error={errors.technicalContactEmail && touched.technicalContactEmail}
                                            component={TextField}
                                            name={'technicalContactEmail'}
                                            type={'email'}
                                            label="Email"
                                            helperText={errors.technicalContactEmail}
                                            variant="standard"
                                        />
                                    </Grid>
                                    <Grid
                                        sx={{
                                            backgroundColor: '#FFFFFF',
                                            borderRadius: '10px',
                                            paddingBottom: '25px',
                                            paddingTop: '10px',
                                            paddingLeft: '20px',
                                            paddingRight: '20px',
                                            display: 'grid',
                                            gap: '10px',
                                            gridTemplateColumns: 'repeat(1, 1fr)'
                                        }}
                                    >
                                        <Box>
                                            <h2>Privacy Liaison Contact</h2>
                                        </Box>
                                        <Field
                                            // @ts-ignore
                                            error={errors.privacyLiaisonContactName && touched.privacyLiaisonContactName}
                                            component={TextField}
                                            name={'privacyLiaisonContactName'}
                                            type={'text'}
                                            label="Name"
                                            helperText={errors.privacyLiaisonContactName}
                                            variant="standard"
                                        />
                                        <Field
                                            // @ts-ignore
                                            error={errors.privacyLiaisonContactPosition && touched.privacyLiaisonContactPosition}
                                            component={TextField}
                                            name={'privacyLiaisonContactPosition'}
                                            type={'text'}
                                            label="Position"
                                            helperText={errors.privacyLiaisonContactPosition}
                                            variant="standard"
                                        />
                                        <Field
                                            // @ts-ignore
                                            error={errors.privacyLiaisonContactPhone && touched.privacyLiaisonContactPhone}
                                            component={TextField}
                                            name={'privacyLiaisonContactPhone'}
                                            type={'text'}
                                            label="Phone"
                                            helperText={errors.privacyLiaisonContactPhone}
                                            variant="standard"
                                        />
                                        <Field
                                            // @ts-ignore
                                            error={errors.privacyLiaisonContactEmail && touched.privacyLiaisonContactEmail}
                                            component={TextField}
                                            name={'privacyLiaisonContactEmail'}
                                            type={'email'}
                                            label="Email"
                                            helperText={errors.privacyLiaisonContactEmail}
                                            variant="standard"
                                        />
                                    </Grid>
                                    <Grid
                                        sx={{
                                            backgroundColor: '#FFFFFF',
                                            borderRadius: '10px',
                                            paddingBottom: '25px',
                                            paddingTop: '10px',
                                            paddingLeft: '20px',
                                            paddingRight: '20px',
                                            display: 'grid',
                                            gap: '10px',
                                            gridTemplateColumns: 'repeat(1, 1fr)'
                                        }}
                                    >
                                        <Box>
                                            <h2>Human Resources Contact</h2>
                                        </Box>
                                        <Field
                                            // @ts-ignore
                                            error={errors.hrContactName && touched.hrContactName}
                                            component={TextField}
                                            name={'hrContactName'}
                                            type={'text'}
                                            label="Name"
                                            helperText={errors.hrContactName}
                                            variant="standard"
                                        />
                                        <Field
                                            // @ts-ignore
                                            error={errors.hrContactPosition && touched.hrContactPosition}
                                            component={TextField}
                                            name={'hrContactPosition'}
                                            type={'text'}
                                            label="Position"
                                            helperText={errors.hrContactPosition}
                                            variant="standard"
                                        />
                                        <Field
                                            // @ts-ignore
                                            error={errors.hrContactPhone && touched.hrContactPhone}
                                            component={TextField}
                                            name={'hrContactPhone'}
                                            type={'text'}
                                            label="Phone"
                                            helperText={errors.hrContactPhone}
                                            variant="standard"
                                        />
                                        <Field
                                            // @ts-ignore
                                            error={errors.hrContactEmail && touched.hrContactEmail}
                                            component={TextField}
                                            name={'hrContactEmail'}
                                            type={'email'}
                                            label="Email"
                                            helperText={errors.hrContactEmail}
                                            variant="standard"
                                        />
                                    </Grid>
                                </Grid>
                                <Grid
                                    sx={{
                                        marginTop: '40px',
                                        marginBottom: '30px',
                                        display: 'grid',
                                        gap: '10px',
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            // backgroundColor: '#FFFFFF',
                                            width: '661px',
                                            height: '44px',
                                            borderRadius: '20px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                        }}
                                    >

                                    </Box>
                                    <Button
                                        variant={'contained'}
                                        color={'error'}
                                        sx={{
                                            width: '149px',
                                            height: '44px',
                                            borderRadius: '50px',
                                        }}
                                        onClick={() => {
                                            confirmAlert({
                                                title: 'Cancel',
                                                message: 'Are you sure you want to cancel? You will lose all the data you entered',
                                                buttons: [
                                                    {
                                                        label: 'Yes',
                                                        onClick: () => router.push(`/app/${data?.business?.id}`)
                                                    },
                                                    {
                                                        label: 'No',
                                                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                                                        onClick: () => {
                                                        }
                                                    }
                                                ]
                                            });
                                        }}
                                    >
                                        <span>
                                                <FaArchive style={{
                                                    color: 'white',
                                                    border: '2px solid white',
                                                    padding: '2px',
                                                    marginRight: '7px',
                                                    marginTop: '4px'
                                                }}/>
                                            </span>
                                        Cancel
                                    </Button>
                                    <Button
                                        variant={'contained'}
                                        color={'success'}
                                        type={'submit'}
                                        sx={{
                                            width: '149px',
                                            height: '44px',
                                            borderRadius: '50px',
                                        }}
                                    >
                                        <span>
                                                <FaSave style={{
                                                    color: 'white',
                                                    border: '2px solid white',
                                                    padding: '2px',
                                                    marginRight: '7px',
                                                    marginTop: '4px'
                                                }}/>
                                            </span>
                                        Save
                                    </Button>
                                </Grid>
                            </Form>
                        )}
                    </Formik>
                </Grid>
            </Layout>
        </>
    )
}

export default addBusiness
