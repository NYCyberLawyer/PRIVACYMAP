import React, {useState} from "react";
import {useRouter} from "next/router";
import {Field, Form, Formik} from "formik";
import {useMutation} from "urql";
import {AddApplicationDocument} from "../../../client/graphql/addApplication.generated";
import Layout from "../../../client/components/Layout";
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
import {useGetBusinessQuery} from "../../../client/graphql/getBusiness.generated";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import {toast} from "react-hot-toast";
import {FaArchive, FaSave} from "react-icons/fa";

const addApplication: React.FC = () => {
    const router = useRouter();
    const {slug} = router.query;

    const [, addApplication] = useMutation(AddApplicationDocument)
    const [{data, fetching, error}] = useGetBusinessQuery({
        variables: {
            id: String(slug)
        }
    })

    const [appName, setAppName] = useState('')
    const [applicableRegulations, setApplicableRegulations] = useState([])
    const [desc, setDesc] = useState('')
    const [modules, setModules] = useState('')
    const [appType, setAppType] = useState('')
    const [hostingType, setHostingType] = useState('')
    const [hostingManagementType, setHostingManagementType] = useState('')
    const [hostingEntity, setHostingEntity] = useState('')
    const [appOwner, setAppOwner] = useState('')
    const [techOwner, setTechOwner] = useState('')
    const [hostingRegion, setHostingRegion] = useState('')
    const [hasDRHosting, setHasDRHosting] = useState(false)
    const [drHostingRegion, setDrHostingRegion] = useState('')

    const [hasNameAndInitials, setHasNameAndInitials] = useState(false)
    const [hasIdNumbers, setHasIdNumbers] = useState(false)
    const [hasBirthdate, setHasBirthdate] = useState(false)
    const [hasAge, setHasAge] = useState(false)
    const [hasGender, setHasGender] = useState(false)
    const [hasHomeAddress, setHasHomeAddress] = useState(false)
    const [hasTelephoneNumber, setHasTelephoneNumber] = useState(false)
    const [hasMobileNumber, setHasMobileNumber] = useState(false)
    const [hasEmailAddress, setHasEmailAddress] = useState(false)
    const [hasDriversLicenceNumber, setHasDriversLicenceNumber] = useState(false)
    const [hasMedicalInfo, setHasMedicalInfo] = useState(false)
    const [hasFinancialInfo, setHasFinancialInfo] = useState(false)
    const [hasHealthInfo, setHasHealthInfo] = useState(false)
    const [hasStudentInfo, setHasStudentInfo] = useState(false)
    const [hasMinorInfo, setHasMinorInfo] = useState(false)
    const [hasMaritalStatus, setHasMaritalStatus] = useState(false)
    const [hasNationality, setHasNationality] = useState(false)
    const [hasSexualBehaviour, setHasSexualBehaviour] = useState(false)
    const [hasPhysicalCharacteristics, setHasPhysicalCharacteristics] = useState(false)
    const [hasEthnicOrigin, setHasEthnicOrigin] = useState(false)
    const [hasReligiousPhilosophicalPoliticalBeliefs, setHasReligiousPhilosophicalPoliticalBeliefs] = useState(false)
    const [hasTradeUnionMembership, setHasTradeUnionMembership] = useState(false)
    const [hasBiometricData, setHasBiometricData] = useState(false)
    const [hasHouseholdInfo, setHasHouseholdInfo] = useState(false)
    const [hasBillingHistory, setHasBillingHistory] = useState(false)
    const [hasUniqueDeviceId, setHasUniqueDeviceId] = useState(false)
    const [hasLocation, setHasLocation] = useState(false)
    const [hasCriminalInfo, setHasCriminalInfo] = useState(false)
    const [hasCivilJusticeInfo, setHasCivilJusticeInfo] = useState(false)
    const [hasSocialMedia, setHasSocialMedia] = useState(false)

    const [appLinkedTo, setAppLinkedTo] = useState([])
    const [connectionType, setConnectionType] = useState('')
    const [encryptedDataTransfer, setEncryptedDataTransfer] = useState(false)
    const [retentionReqs, setRetentionReqs] = useState('')
    const [comments, setComments] = useState('')

    if (fetching) return <p>Loading...</p>;

    const appsToLink = data?.business?.applications.map((app) => {return app.applicationName})

    // @ts-ignore
    return (
        <>
            <Layout>
                <Grid
                >
                    <Formik
                        initialValues={{
                            applicationName: '',
                            description: '',
                            applicationHostingManagement: '',
                            applicationHostingEntity: '',
                            applicationOwner: '',
                            technologyOwner: '',
                            applicationType: '',
                            businessId: '',

                            storedDataTypes: [],
                            encryptedDataTransfer: '',
                            comments: '',
                        }}
                        onSubmit={async (values) => {
                            const modulesOrSubservices = modules.split(',')

                            const data = {
                                applicationName: appName,
                                applicableRegulations: applicableRegulations,
                                description: desc,
                                applicationHostingType: hostingType,
                                applicationHostingManagement: hostingManagementType,
                                applicationHostingEntity: hostingEntity,
                                applicationOwner: appOwner,
                                technologyOwner: techOwner,
                                applicationRegionStored: hostingRegion,
                                hasDRHosting: hasDRHosting,
                                applicationDRRegionStored: drHostingRegion,
                                modules: modulesOrSubservices,
                                applicationType: appType,
                                businessId: slug,

                                hasNameAndInitials: hasNameAndInitials,
                                hasIdNumbers: hasIdNumbers,
                                hasBirthdate: hasBirthdate,
                                hasAge: hasAge,
                                hasGender: hasGender,
                                hasHomeAddress: hasHomeAddress,
                                hasTelephoneNumber: hasTelephoneNumber,
                                hasMobileNumber: hasMobileNumber,
                                hasEmailAddress: hasEmailAddress,
                                hasDriversLicenceNumber: hasDriversLicenceNumber,
                                hasMedicalInfo: hasMedicalInfo,
                                hasFinancialInfo: hasFinancialInfo,
                                hasHealthInfo: hasHealthInfo,
                                hasStudentInfo: hasStudentInfo,
                                hasMinorInfo: hasMinorInfo,
                                hasMaritalStatus: hasMaritalStatus,
                                hasNationality: hasNationality,
                                hasSexualBehaviour: hasSexualBehaviour,
                                hasPhysicalCharacteristics: hasPhysicalCharacteristics,
                                hasEthnicOrigin: hasEthnicOrigin,
                                hasReligiousPhilosophicalPoliticalBeliefs: hasReligiousPhilosophicalPoliticalBeliefs,
                                hasTradeUnionMembership: hasTradeUnionMembership,
                                hasBiometricData: hasBiometricData,
                                hasHouseholdInfo: hasHouseholdInfo,
                                hasBillingHistory: hasBillingHistory,
                                hasUniqueDeviceId: hasUniqueDeviceId,
                                hasLocation: hasLocation,
                                hasCriminalInfo: hasCriminalInfo,
                                hasCivilJusticeInfo: hasCivilJusticeInfo,
                                hasSocialMedia: hasSocialMedia,
                                connectionType: connectionType,
                                encryptedDataTransfer: encryptedDataTransfer,
                                dataRetentionReq: retentionReqs,
                                comments: comments,
                                linkedApps: appLinkedTo,
                            }

                            addApplication(data)
                                .then(_ => {
                                    toast.success('App registered successfully!')
                                    router.push(`/app/${slug}`)
                                }).catch(reason => console.log('ERROR', reason))
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
                                            gap: 5,
                                            gridTemplateColumns: 'repeat(3, 2fr)',
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
                                                paddingRight: '20px',
                                                paddingBottom: '5px',
                                                paddingLeft: '20px',
                                                paddingTop: '1px',
                                            }}
                                        >
                                            <h1
                                                style={{marginLeft: '20px'}}
                                            >New App</h1>
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
                                </Grid>

                                {/*App data grid*/}
                                <Grid
                                    sx={{
                                        backgroundColor: '#FFFFFF',
                                        borderRadius: '20px',
                                        paddingRight: '20px',
                                        paddingBottom: '3px',
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
                                                // @ts-ignore
                                                error={errors.applicationName && touched.applicationName}
                                                component={TextField}
                                                name={'applicationName'}
                                                type={'text'}
                                                label="Application name"
                                                // @ts-ignore
                                                onChange={(evt) => setAppName(evt.target.value)}
                                                helperText={errors.applicationName}
                                                variant="standard"
                                            />
                                            <Autocomplete
                                                multiple
                                                options={['GDPR', 'CCPA', 'Nevada Privacy Act', 'HIPAA', 'Swiss Data Protection Act']}
                                                getOptionLabel={(option) => option.toString()}
                                                onChange={(_, value) => {
                                                    // @ts-ignore
                                                    setApplicableRegulations(value)
                                                }}
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
                                                error={errors.description && touched.description}
                                                component={TextField}
                                                name={'description'}
                                                type={'text'}
                                                label="Description"
                                                // @ts-ignore
                                                onChange={(evt) => setDesc(evt.target.value)}
                                                helperText={errors.description}
                                                variant="standard"
                                            />

                                            <Field
                                                component={TextField}
                                                name={'modules'}
                                                type={'text'}
                                                label="Modules or Subservices"
                                                // @ts-ignore
                                                onChange={(evt) => setModules(evt.target.value)}
                                                variant="standard"
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
                                                        name="applicationType"
                                                        // @ts-ignore
                                                        onChange={(_, value) => setAppType(value)}
                                                    >
                                                        <FormControlLabel name={'applicationType'} value={'service'}
                                                                          control={<Radio/>} label="Service"/>
                                                        <FormControlLabel name={'applicationType'} value={'application'}
                                                                          control={<Radio/>} label="Application"/>
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
                                                                          value={'Cloud'}
                                                                          control={<Radio/>} label="Cloud"/>
                                                        <FormControlLabel name={'applicationHostingType'}
                                                                          value={'On Premise'} control={<Radio/>}
                                                                          label="On Premise"/>
                                                        <FormControlLabel name={'applicationHostingType'}
                                                                          value={'Distributed'} control={<Radio/>}
                                                                          label="Distributed"/>
                                                    </RadioGroup>
                                                </FormControl>
                                            </Box>
                                            <Box>
                                                <FormControl fullWidth>
                                                    <InputLabel>Type of Hosting</InputLabel>
                                                    {hostingType == 'Cloud' ? (
                                                        <Select
                                                            label="Type of Hosting"
                                                            name={'applicationHostingManagement'}
                                                            value={hostingManagementType}
                                                            defaultValue={''}
                                                            // @ts-ignore
                                                            onChange={(_, value) => setHostingManagementType(value.props.value)}
                                                        >
                                                            <MenuItem value={'SaaS'}>SaaS</MenuItem>
                                                            <MenuItem value={'IaaS'}>IaaS</MenuItem>
                                                            <MenuItem value={'PaaS'}>PaaS</MenuItem>
                                                        </Select>
                                                    ) : (
                                                        <Select
                                                            label="Type of Hosting"
                                                            name={'applicationHostingManagement'}
                                                            value={hostingManagementType}
                                                            defaultValue={''}
                                                            // @ts-ignore
                                                            onChange={(_, value) => setHostingManagementType(value.props.value)}
                                                        >
                                                            <MenuItem value={'Self Hosted'}>Self Hosted</MenuItem>
                                                            <MenuItem value={'Co-Location'}>Co-Location</MenuItem>
                                                        </Select>
                                                    )}

                                                </FormControl>
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
                                                // @ts-ignore
                                                error={errors.applicationHostingEntity && touched.applicationHostingEntity}
                                                name={'applicationHostingEntity'}
                                                type={'text'}
                                                label="Hosting Entity"
                                                // @ts-ignore
                                                onChange={(evt) => setHostingEntity(evt.target.value)}
                                                helperText={errors.applicationHostingEntity}
                                                variant="standard"
                                            />
                                            <TextField
                                                // @ts-ignore
                                                error={errors.applicationOwner && touched.applicationOwner}
                                                name={'applicationOwner'}
                                                type={'text'}
                                                label="Application Owner"
                                                // @ts-ignore
                                                onChange={(evt) => setAppOwner(evt.target.value)}
                                                helperText={errors.applicationOwner}
                                                variant="standard"
                                            />
                                            <TextField
                                                // @ts-ignore
                                                error={errors.technologyOwner && touched.technologyOwner}
                                                name={'technologyOwner'}
                                                type={'text'}
                                                label="Technology Owner"
                                                // @ts-ignore
                                                onChange={(evt) => setTechOwner(evt.target.value)}
                                                helperText={errors.technologyOwner}
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
                                                        label="Region Stored"
                                                        name={'applicationRegionStored'}
                                                        defaultValue={''}
                                                        // @ts-ignore
                                                        onChange={(_, value) => setHostingRegion(value.props.value)}
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
                                                        // @ts-ignore
                                                        onChange={(_, value) => setHasDRHosting(value == 'true')}
                                                        row
                                                        name="hasDRHosting">
                                                        <FormControlLabel name={'hasDRHosting'} value={true}
                                                                          control={<Radio/>} label="Yes"/>
                                                        <FormControlLabel name={'hasDRHosting'} value={false}
                                                                          control={<Radio/>} label="No"/>
                                                    </RadioGroup>
                                                </FormControl>
                                            </Box>
                                            {hasDRHosting ? (
                                                <Box>
                                                    <FormControl fullWidth>
                                                        <InputLabel>DR Region Stored</InputLabel>
                                                        <Select
                                                            label="Region Stored"
                                                            name={'applicationDRRegionStored'}
                                                            defaultValue={''}
                                                            // @ts-ignore
                                                            onChange={(_, value) => setDrHostingRegion(value.props.value)}
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
                                        <p>*Highly sensitive PII which could cause significant damage if it gets into the
                                            wrong hands. Access to this data should be strictly on a need to know
                                            basis</p>
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
                                                    onChange={(_, value) => setHasNameAndInitials(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasNameAndInitials'}/>}
                                                    label="Names and Initials in any combination"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasIdNumbers'}
                                                    onChange={(_, value) => setHasIdNumbers(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasIdNumbers'}/>}
                                                    label="Identification Numbers (e.g., Social Security Number)*"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasBirthdate'}
                                                    onChange={(_, value) => setHasBirthdate(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasBirthdate'}/>}
                                                    label="Birthdate"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasAge'}
                                                    onChange={(_, value) => setHasAge(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasAge'}/>} label="Age"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasGender'}
                                                    onChange={(_, value) => setHasGender(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasGender'}/>}
                                                    label="Gender"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasHomeAddress'}
                                                    onChange={(_, value) => setHasHomeAddress(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasHomeAddress'}/>}
                                                    label="Home Address"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasTelephoneNumber'}
                                                    onChange={(_, value) => setHasTelephoneNumber(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasTelephoneNumber'}/>}
                                                    label="Telephone Number"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasMobileNumber'}
                                                    onChange={(_, value) => setHasMobileNumber(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasMobileNumber'}/>}
                                                    label="Personal Cellular, Mobile or Wireless Number"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasEmailAddress'}
                                                    onChange={(_, value) => setHasEmailAddress(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasEmailAddress'}/>}
                                                    label="Personal E-mail Address"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel name={'storedDataTypes'}
                                                                  value={'hasDriversLicenceNumber'}
                                                                  onChange={(_, value) => setHasDriversLicenceNumber(value)}
                                                                  control={<Field component={Checkbox}
                                                                                  name={'storedDataTypes'}
                                                                                  value={'hasDriversLicenceNumber'}/>}
                                                                  label="Drivers' Licence Number*"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasMedicalInfo'}
                                                    onChange={(_, value) => setHasMedicalInfo(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasMedicalInfo'}/>}
                                                    label="Information on Medical or Health Conditions*"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasFinancialInfo'}
                                                    onChange={(_, value) => setHasFinancialInfo(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasFinancialInfo'}/>}
                                                    label="Financial Information (credit cards, billing info, account info)*"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasHealthInfo'}
                                                    onChange={(_, value) => setHasHealthInfo(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasHealthInfo'}/>}
                                                    label="Health Information*"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasStudentInfo'}
                                                    onChange={(_, value) => setHasStudentInfo(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasStudentInfo'}/>}
                                                    label="Student Information*"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasMinorInfo'}
                                                    onChange={(_, value) => setHasMinorInfo(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasMinorInfo'}/>}
                                                    label="Minor/Youth Information"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasMaritalStatus'}
                                                    onChange={(_, value) => setHasMaritalStatus(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasMaritalStatus'}/>}
                                                    label="Marital Status"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasNationality'}
                                                    onChange={(_, value) => setHasNationality(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasNationality'}/>}
                                                    label="Nationality"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasSexualBehaviour'}
                                                    onChange={(_, value) => setHasSexualBehaviour(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasSexualBehaviour'}/>}
                                                    label="Sexual Behaviour or Sexual Preference"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasPhysicalCharacteristics'}
                                                    onChange={(_, value) => setHasPhysicalCharacteristics(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasPhysicalCharacteristics'}/>}
                                                    label="Physical Characteristics"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasEthnicOrigin'}
                                                    onChange={(_, value) => setHasEthnicOrigin(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasEthnicOrigin'}/>}
                                                    label="Racial or Ethnic Origin"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasReligiousPhilosophicalPoliticalBeliefs'}
                                                    onChange={(_, value) => setHasReligiousPhilosophicalPoliticalBeliefs(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasReligiousPhilosophicalPoliticalBeliefs'}/>}
                                                    label="Religious, Philosophical or Political Beliefs"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasTradeUnionMembership'}
                                                    onChange={(_, value) => setHasTradeUnionMembership(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasTradeUnionMembership'}/>}
                                                    label="Trade Union Membership"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasBiometricData'}
                                                    onChange={(_, value) => setHasBiometricData(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasBiometricData'}/>}
                                                    label="Biometric Data*"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasHouseholdInfo'}
                                                    onChange={(_, value) => setHasHouseholdInfo(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasHouseholdInfo'}/>}
                                                    label="Household Information"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasBillingHistory'}
                                                    onChange={(_, value) => setHasBillingHistory(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasBillingHistory'}/>}
                                                    label="Consumer Purchase or Billing History*"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasUniqueDeviceId'}
                                                    onChange={(_, value) => setHasUniqueDeviceId(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasUniqueDeviceId'}/>}
                                                    label="Unique Device Identifiers (IP/MAC addresses)"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasLocation'}
                                                    onChange={(_, value) => setHasLocation(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasLocation'}/>}
                                                    label="Location (e.g., GPS)"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasCriminalInfo'}
                                                    onChange={(_, value) => setHasCriminalInfo(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasCriminalInfo'}/>}
                                                    label="Criminal Information*"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasCivilJusticeInfo'}
                                                    onChange={(_, value) => setHasCivilJusticeInfo(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasCivilJusticeInfo'}/>}
                                                    label="Civil Justice Information*"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasSocialMedia'}
                                                    onChange={(_, value) => setHasSocialMedia(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    value={'hasSocialMedia'}/>}
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
                                                    options={[...appsToLink as string[], 'PENDING']}
                                                    getOptionLabel={(option) => option.toString()}
                                                    onChange={(_, value) => {
                                                        const appsIds = data?.business?.applications.filter(app => value.some(value => value == app.applicationName)).map((app) => {return app.id})

                                                        // @ts-ignore
                                                        if (value.filter(value => value == 'PENDING').length > 0) appsIds.push('PENDING')

                                                        // @ts-ignore
                                                        setAppLinkedTo(appsIds)
                                                    }}
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
                                                        label="Type of connection"
                                                        name={'connectionType'}
                                                        defaultValue={''}
                                                        // @ts-ignore
                                                        onChange={(_, value) => setConnectionType(value.props.value)}
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
                                                        // @ts-ignore
                                                        onChange={(_, value) => setEncryptedDataTransfer(Boolean(value))}
                                                    >
                                                        <FormControlLabel name={'encryptedDataTransfer'} value={true}
                                                                          control={<Radio/>} label="Yes"/>
                                                        <FormControlLabel name={'encryptedDataTransfer'} value={false}
                                                                          control={<Radio/>} label="No"/>
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
                                                        defaultValue={''}
                                                        // @ts-ignore
                                                        onChange={(_, value) => setRetentionReqs(value.props.value)}
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
                                                    component={TextField}
                                                    name={'comments'}
                                                    type={'text'}
                                                    label="Comments (optional)"
                                                    variant="standard"
                                                    // @ts-ignore
                                                    onChange={(evt) => setComments(evt.target.value)}
                                                />
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid>
                                    <Grid
                                        sx={{
                                            marginTop: '40px',
                                            marginBottom: '30px',
                                            marginLeft: '750px',
                                            display: 'grid',
                                            gap: 10,
                                            gridTemplateColumns: 'repeat(3, 1fr)',
                                        }}
                                    >
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
                                </Grid>


                            </Form>
                        )}
                    </Formik>
                </Grid>
            </Layout>

        </>
    )
}

export default addApplication