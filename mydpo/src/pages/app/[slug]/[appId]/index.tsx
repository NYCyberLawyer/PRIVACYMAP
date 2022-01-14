import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {useGetApplicationQuery} from "../../../../client/graphql/getApplication.generated";
import {
    Autocomplete,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField
} from "@mui/material";
import {Field, Form, Formik} from "formik";
import Layout from "../../../../client/components/Layout";
import {useMutation} from "urql";
import {DeleteApplicationDocument} from "../../../../client/graphql/deleteApplication.generated";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import {useGetLinkedAppsByIdQuery} from "../../../../client/graphql/getLinkedApps.generated";



const Application: React.FC = () => {
    const router = useRouter()

    const {appId, slug} = router.query;
    const [, deleteApplication] = useMutation(DeleteApplicationDocument)

    const [{data, fetching, error}] = useGetApplicationQuery({
        variables: {
            id: String(appId)
        }
    })

    const [linkedApps] = useGetLinkedAppsByIdQuery({
        variables: {
            id: String(appId)
        }
    })

    if (fetching) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>
    if (linkedApps.fetching) return <p>Loading...</p>

    // @ts-ignore
    const linkedNames = linkedApps.data?.linkedApps.map((app) => {return app.applicationName})

    return (
        <>
            <Layout>
                <Grid>
                    <Formik
                        initialValues={{}}
                        onSubmit={async (values) => {
                            console.log('DATA', data)
                        }}
                    >
                        {({errors, touched}) => (
                            <Form>
                                {/*Header Grid*/}
                                <Grid>
                                    <Grid
                                        sx={{
                                            marginTop: '40px',
                                            marginBottom: '30px',
                                            display: 'grid',
                                            gap: 10,
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
                                                style={{marginLeft: '20px'}}
                                            >{data?.application?.applicationName}</h1>
                                        </Box>
                                        <Button
                                            variant={'contained'}
                                            color={'secondary'}
                                            sx={{
                                                width: '150px',
                                                height: '44px',
                                                borderRadius: '50px',
                                            }}
                                            onClick={() => router.push(`/app/${slug}/${appId}/edit`)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant={'contained'}
                                            color={'error'}
                                            sx={{
                                                width: '150px',
                                                height: '44px',
                                                borderRadius: '50px',
                                            }}
                                            onClick={() => {
                                                confirmAlert({
                                                    title: 'Cancel',
                                                    message: 'Are you sure to do this?',
                                                    buttons: [
                                                        {
                                                            label: 'Yes',
                                                            onClick: () => {
                                                                deleteApplication({
                                                                    id: String(appId)
                                                                })
                                                                    .then(_ => router.back())
                                                            }
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
                                            Delete
                                        </Button>
                                    </Grid>
                                </Grid>

                                {/*App data grid*/}
                                <Grid
                                    sx={{
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '20px',
                                        paddingTop: '1px',
                                        paddingRight: '20px',
                                        paddingBottom: '5px',
                                        paddingLeft: '20px',
                                    }}>
                                    <Grid
                                        sx={{
                                            marginTop: '40px',
                                            marginBottom: '30px',
                                        }}
                                    >
                                        <Grid
                                            sx={{
                                                display: 'grid',
                                                gap: 10,
                                                gridTemplateColumns: 'repeat(2, 1fr)',
                                            }}
                                        >
                                            <Field
                                                component={TextField}
                                                value={data?.application?.applicationName}
                                                label="Application name"
                                                variant="standard"
                                                disabled
                                            />
                                            <Autocomplete
                                                multiple
                                                options={['GDPR', 'CCPA', 'Nevada Privacy Act', 'HIPAA', 'Swiss Data Protection Act']}
                                                getOptionLabel={(option) => option.toString()}
                                                defaultValue={data?.application?.applicableRegulations}
                                                disabled
                                                renderInput={(params) => (
                                                    <Field
                                                        component={TextField}
                                                        {...params}
                                                        variant="standard"
                                                        label="Applicable Regulations"
                                                    />
                                                )}

                                            />
                                        </Grid>

                                        <Grid
                                            sx={{
                                                display: 'grid',
                                                gap: 10,
                                                gridTemplateColumns: 'repeat(2, 1fr)',
                                                marginBottom: '20px',
                                            }}>
                                            <Field
                                                // @ts-ignore
                                                component={TextField}
                                                label="Description"
                                                value={data?.application?.description}
                                                variant="standard"
                                                disabled
                                            />

                                            <Autocomplete
                                                multiple
                                                id="tags-standard"
                                                options={['1', '2', '3']}
                                                getOptionLabel={(option) => option.toString()}
                                                defaultValue={data?.application?.modules}
                                                disabled
                                                renderInput={(params) => (
                                                    <Field
                                                        {...params}
                                                        component={TextField}
                                                        variant="standard"
                                                        label="Modules or Subservices"
                                                    />
                                                )}
                                            />
                                        </Grid>

                                        <Grid
                                            sx={{
                                                display: 'grid',
                                                gap: 10,
                                                gridTemplateColumns: 'repeat(3, 1fr)',
                                                marginBottom: '20px',
                                            }}>
                                            <Box>
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">Service or Application</FormLabel>
                                                    <RadioGroup
                                                        row
                                                    >
                                                        <FormControlLabel name={'applicationType'} value={'service'}
                                                                          disabled
                                                                          control={<Radio/>} label="Service"
                                                                          checked={data?.application?.applicationType == 'service'}/>
                                                        <FormControlLabel name={'applicationType'} value={'application'}
                                                                          disabled
                                                                          control={<Radio/>} label="Application"
                                                                          checked={data?.application?.applicationType == 'application'}/>
                                                    </RadioGroup>
                                                </FormControl>
                                            </Box>
                                            <Box>
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">Hosting</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        name="applicationHostingType"
                                                        // @ts-ignore
                                                        onChange={(_, value) => setHostingType(value)}
                                                    >
                                                        <FormControlLabel name={'applicationHostingType'}
                                                                          value={'cloud'}
                                                                          disabled
                                                                          checked={data?.application?.applicationHostingType == 'Cloud'}
                                                                          control={<Radio/>} label="Cloud"/>
                                                        <FormControlLabel name={'applicationHostingType'}
                                                                          value={'onpremise'}
                                                                          disabled
                                                                          checked={data?.application?.applicationHostingType == 'On Premise'}
                                                                          control={<Radio/>}
                                                                          label="On Premise"/>
                                                        <FormControlLabel name={'applicationHostingType'}
                                                                          value={'distributed'}
                                                                          disabled
                                                                          checked={data?.application?.applicationHostingType == 'Distributed'}
                                                                          control={<Radio/>}
                                                                          label="Distributed"/>
                                                    </RadioGroup>
                                                </FormControl>
                                            </Box>
                                            <Box>
                                                <TextField
                                                    disabled
                                                    value={data?.application?.applicationHostingManagement}
                                                    label="Type of Hosting"
                                                    variant="standard"
                                                />
                                            </Box>
                                        </Grid>

                                        <Grid
                                            sx={{
                                                display: 'grid',
                                                gap: 10,
                                                gridTemplateColumns: 'repeat(3, 1fr)',
                                                marginBottom: '20px',
                                            }}
                                        >
                                            <TextField
                                                disabled
                                                defaultValue={data?.application?.applicationHostingEntity}
                                                label="Hosting Entity"
                                                variant="standard"
                                            />
                                            <TextField
                                                disabled
                                                defaultValue={data?.application?.applicationOwner}
                                                label="Application Owner"
                                                variant="standard"
                                            />
                                            <TextField
                                                disabled
                                                defaultValue={data?.application?.technologyOwner}
                                                label="Technology Owner"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid
                                            sx={{
                                                display: 'grid',
                                                gap: 10,
                                                gridTemplateColumns: 'repeat(3, 1fr)',
                                                marginBottom: '20px',
                                            }}
                                        >
                                            <Box>
                                                <FormControl fullWidth>
                                                    <InputLabel>Region Stored</InputLabel>
                                                    <Select
                                                        disabled
                                                        label="Region Stored"
                                                        defaultValue={data?.application?.applicationRegionStored}
                                                    >
                                                        <MenuItem value={'eastus'}>East US</MenuItem>
                                                        <MenuItem value={'centus'}>Central US</MenuItem>
                                                        <MenuItem value={'westus'}>West US</MenuItem>
                                                        <MenuItem value={'africa'}>Africa</MenuItem>
                                                        <MenuItem value={'asia'}>Asia</MenuItem>
                                                        <MenuItem value={'canada'}>Canada</MenuItem>
                                                        <MenuItem value={'europe'}>Europe</MenuItem>
                                                        <MenuItem value={'mideast'}>Middle East</MenuItem>
                                                        <MenuItem value={'southam'}>South America</MenuItem>
                                                        <MenuItem value={'govcloud'}>Government Cloud</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            <Box>
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">DR Hosting</FormLabel>
                                                    <RadioGroup
                                                        row
                                                    >
                                                        <FormControlLabel name={'hasDRHosting'} value={true}
                                                                          control={<Radio/>} label="Yes"
                                                                          checked={data?.application?.hasDRHosting}
                                                                          disabled
                                                        />
                                                        <FormControlLabel name={'hasDRHosting'} value={false}
                                                                          control={<Radio/>} label="No"
                                                                          checked={data?.application?.hasDRHosting == false}
                                                                          disabled
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                            </Box>
                                            {data?.application?.hasDRHosting ? (
                                                <Box>
                                                    <FormControl fullWidth>
                                                        <InputLabel>DR Region Stored</InputLabel>
                                                        <Select
                                                            disabled
                                                            label="Region Stored"
                                                            defaultValue={data.application.applicationDRRegionStored}
                                                        >
                                                            <MenuItem value={'eastus'}>East US</MenuItem>
                                                            <MenuItem value={'centus'}>Central US</MenuItem>
                                                            <MenuItem value={'westus'}>West US</MenuItem>
                                                            <MenuItem value={'africa'}>Africa</MenuItem>
                                                            <MenuItem value={'asia'}>Asia</MenuItem>
                                                            <MenuItem value={'canada'}>Canada</MenuItem>
                                                            <MenuItem value={'europe'}>Europe</MenuItem>
                                                            <MenuItem value={'mideast'}>Middle East</MenuItem>
                                                            <MenuItem value={'southam'}>South America</MenuItem>
                                                            <MenuItem value={'govcloud'}>Government Cloud</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            ) : null}
                                        </Grid>
                                    </Grid>
                                </Grid>

                                {/*App data type grid*/}
                                <Grid
                                    sx={{
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '20px',
                                        paddingRight: '20px',
                                        paddingBottom: '5px',
                                        paddingLeft: '20px',
                                    }}>
                                    <Grid
                                        sx={{
                                            marginTop: '40px',
                                            marginBottom: '30px',
                                            paddingTop: '3px',
                                            backgroundColor: '#FFFFFF',
                                        }}
                                    >
                                        <h2>Type of Data Stored</h2>
                                        <Grid
                                            sx={{
                                                display: 'grid',
                                                gap: 1,
                                                gridTemplateColumns: 'repeat(3, 1fr)',
                                            }}
                                        >
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasNameAndInitials'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasNameAndInitials'}
                                                                    defaultChecked={data?.application?.hasNameAndInitials}
                                                                    disabled
                                                    />}
                                                    label="Names and Initials in any combination"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasIdNumbers'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasIdNumbers'}
                                                                    defaultChecked={data?.application?.hasIdNumbers}
                                                                    disabled/>}
                                                    label="Identification Numbers (e.g., Social Security Number) *"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasBirthdate'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasBirthdate'}
                                                                    defaultChecked={data?.application?.hasBirthdate}
                                                                    disabled/>}
                                                    label="Birthdate"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasAge'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasAge'}
                                                                    defaultChecked={data?.application?.hasAge}
                                                                    disabled
                                                    />} label="Age"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasGender'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasGender'}
                                                                    defaultChecked={data?.application?.hasGender}
                                                                    disabled/>}
                                                    label="Gender"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasHomeAddress'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasHomeAddress'}
                                                                    defaultChecked={data?.application?.hasHomeAddress}
                                                                    disabled/>}
                                                    label="Home Address"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasTelephoneNumber'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasTelephoneNumber'}
                                                                    defaultChecked={data?.application?.hasTelephoneNumber}
                                                                    disabled/>}
                                                    label="Telephone Number"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasMobileNumber'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasMobileNumber'}
                                                                    defaultChecked={data?.application?.hasMobileNumber}
                                                                    disabled/>}
                                                    label="Personal Cellular, Mobile or Wireless Number"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasEmailAddress'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasEmailAddress'}
                                                                    defaultChecked={data?.application?.hasEmailAddress}
                                                                    disabled/>}
                                                    label="Personal E-mail Address"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel name={'storedDataTypes'}
                                                                  value={'hasDriversLicenceNumber'}
                                                                  control={<Field component={Checkbox}
                                                                                  name={'storedDataTypes'}
                                                                                  value={'hasDriversLicenceNumber'}
                                                                                  defaultChecked={data?.application?.hasDriversLicenceNumber}
                                                                                  disabled/>}
                                                                  label="Drivers' Licence Number *"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasMedicalInfo'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasMedicalInfo'}
                                                                    defaultChecked={data?.application?.hasMedicalInfo}
                                                                    disabled/>}
                                                    label="Information on Medical or Health Conditions *"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasFinancialInfo'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasFinancialInfo'}
                                                                    defaultChecked={data?.application?.hasFinancialInfo}
                                                                    disabled/>}
                                                    label="Financial Information (credit cards, billing info, account info) *"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasHealthInfo'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasHealthInfo'}
                                                                    defaultChecked={data?.application?.hasHealthInfo}
                                                                    disabled/>}
                                                    label="Health Information *"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasStudentInfo'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasStudentInfo'}
                                                                    defaultChecked={data?.application?.hasStudentInfo}
                                                                    disabled/>}
                                                    label="Student Information *"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasMinorInfo'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasMinorInfo'}
                                                                    defaultChecked={data?.application?.hasMinorInfo}
                                                                    disabled/>}
                                                    label="Minor/Youth Information"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasMaritalStatus'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasMaritalStatus'}
                                                                    defaultChecked={data?.application?.hasMaritalStatus}
                                                                    disabled/>}
                                                    label="Marital Status"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasNationality'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasNationality'}
                                                                    defaultChecked={data?.application?.hasNationality}
                                                                    disabled/>}
                                                    label="Nationality"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasSexualBehaviour'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasSexualBehaviour'}
                                                                    defaultChecked={data?.application?.hasSexualBehaviour}
                                                                    disabled/>}
                                                    label="Sexual Behaviour or Sexual Preference"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasPhysicalCharacteristics'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasPhysicalCharacteristics'}
                                                                    defaultChecked={data?.application?.hasPhysicalCharacteristics}
                                                                    disabled/>}
                                                    label="Physical Characteristics"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasEthnicOrigin'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasEthnicOrigin'}
                                                                    defaultChecked={data?.application?.hasEthnicOrigin}
                                                                    disabled/>}
                                                    label="Racial or Ethnic Origin"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasReligiousPhilosophicalPoliticalBeliefs'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasReligiousPhilosophicalPoliticalBeliefs'}
                                                                    defaultChecked={data?.application?.hasReligiousPhilosophicalPoliticalBeliefs}
                                                                    disabled/>}
                                                    label="Religious, Philosophical or Political Beliefs"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasTradeUnionMembership'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasTradeUnionMembership'}
                                                                    defaultChecked={data?.application?.hasTradeUnionMembership}
                                                                    disabled/>}
                                                    label="Trade Union Membership"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasBiometricData'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasBiometricData'}
                                                                    defaultChecked={data?.application?.hasBiometricData}
                                                                    disabled/>}
                                                    label="Biometric Data *"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasHouseholdInfo'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasHouseholdInfo'}
                                                                    defaultChecked={data?.application?.hasHouseholdInfo}
                                                                    disabled/>}
                                                    label="Household Information"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasBillingHistory'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasBillingHistory'}
                                                                    defaultChecked={data?.application?.hasBillingHistory}
                                                                    disabled/>}
                                                    label="Consumer Purchase or Billing History *"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasUniqueDeviceId'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasUniqueDeviceId'}
                                                                    defaultChecked={data?.application?.hasUniqueDeviceId}
                                                                    disabled/>}
                                                    label="Unique Device Identifiers (IP/MAC addresses)"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasLocation'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasLocation'}
                                                                    defaultChecked={data?.application?.hasLocation}
                                                                    disabled/>}
                                                    label="Location (e.g., GPS)"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasCriminalInfo'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasCriminalInfo'}
                                                                    defaultChecked={data?.application?.hasCriminalInfo}
                                                                    disabled/>}
                                                    label="Criminal Information *"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasCivilJusticeInfo'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasCivilJusticeInfo'}
                                                                    defaultChecked={data?.application?.hasCivilJusticeInfo}
                                                                    disabled/>}
                                                    label="Civil Justice Information *"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasSocialMedia'}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasSocialMedia'}
                                                                    defaultChecked={data?.application?.hasSocialMedia}
                                                                    disabled/>}
                                                    label="Social Media"/>
                                            </FormGroup>
                                        </Grid>

                                        <Grid
                                            sx={{
                                                display: 'grid',
                                                gap: 10,
                                                gridTemplateColumns: 'repeat(3, 1fr)',
                                                marginBottom: '20px',
                                                marginTop: '50px',
                                            }}
                                        >
                                            <Box>
                                                <Autocomplete
                                                    multiple
                                                    options={['', ' ']}
                                                    getOptionLabel={(option) => option.toString()}
                                                    defaultValue={linkedNames}
                                                    disabled
                                                    renderInput={(params) => (
                                                        <Field
                                                            component={TextField}
                                                            {...params}
                                                            variant="standard"
                                                            label="Application sends to"
                                                        />
                                                    )}
                                                />
                                            </Box>
                                            <Box>
                                                <FormControl fullWidth>
                                                    <InputLabel>Type of connection</InputLabel>
                                                    <Select
                                                        disabled
                                                        label="Type of connection"
                                                        name={'connectionType'}
                                                        defaultValue={data?.application?.connectionType}
                                                    >
                                                        <MenuItem value={'filetransfer'}>File Transfer</MenuItem>
                                                        <MenuItem value={'api'}>API</MenuItem>
                                                        <MenuItem value={'batch'}>Batch</MenuItem>
                                                        <MenuItem value={'manual'}>Manual</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            <Box>
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">Data transfer encrypted</FormLabel>
                                                    <RadioGroup
                                                        row
                                                        name="encryptedDataTransfer"
                                                    >
                                                        <FormControlLabel name={'encryptedDataTransfer'} value={true}
                                                                          control={<Radio/>} label="Yes"
                                                                          checked={data?.application?.encryptedDataTransfer}
                                                                          disabled/>
                                                        <FormControlLabel name={'encryptedDataTransfer'} value={false}
                                                                          control={<Radio/>} label="No"
                                                                          checked={data?.application?.encryptedDataTransfer == false}
                                                                          disabled/>
                                                    </RadioGroup>
                                                </FormControl>
                                            </Box>
                                        </Grid>

                                        <Grid
                                            sx={{
                                                display: 'grid',
                                                gap: 10,
                                                gridTemplateColumns: 'repeat(2, 1fr)',
                                                marginBottom: '20px',
                                                marginTop: '30px',
                                            }}>
                                            <Box>
                                                <FormControl fullWidth>
                                                    <InputLabel>Data Retention requirements</InputLabel>
                                                    <Select
                                                        label="Data Retention requirements"
                                                        name={'dataRetentionReq'}
                                                        defaultValue={data?.application?.dataRetentionReq}
                                                        disabled
                                                    >
                                                        <MenuItem value={'1 year'}>1 Year</MenuItem>
                                                        <MenuItem value={'3 years'}>3 Years</MenuItem>
                                                        <MenuItem value={'5 years'}>5 Years</MenuItem>
                                                        <MenuItem value={'10 years'}>10 Years</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            <Box>
                                                <Field
                                                    disabled
                                                    component={TextField}
                                                    defaultValue={data?.application?.comments}
                                                    label="Comments (optional)"
                                                    variant="standard"
                                                    sx={{
                                                        width: '100%'
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>


                            </Form>)}

                    </Formik>
                </Grid>
            </Layout>
        </>
    )
}

export default Application