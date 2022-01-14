import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {Field, Form, Formik} from "formik";
import {useMutation} from "urql";
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
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css';
import {toast} from "react-hot-toast";
import {FaArchive, FaSave} from "react-icons/fa";
import {UpdateApplicationDocument} from "../../../../client/graphql/updateApplication.generated";
import {useGetBusinessQuery} from "../../../../client/graphql/getBusiness.generated";
import Layout from "../../../../client/components/Layout";
import {useGetLinkedAppsByIdQuery} from "../../../../client/graphql/getLinkedApps.generated";

const addApplication: React.FC = () => {
    const router = useRouter();
    const {slug, appId} = router.query;

    const [, updateApplication] = useMutation(UpdateApplicationDocument)

    const [{data, fetching, error}] = useGetBusinessQuery({
        variables: {
            id: String(slug)
        }
    })

    const [linkedApps] = useGetLinkedAppsByIdQuery({
        variables: {
            id: String(appId)
        }
    })

    const app = data?.business?.applications.filter(app => app.id == appId)[0]

    const [appName, setAppName] = useState(app?.applicationName)
    const [applicableRegulations, setApplicableRegulations] = useState(app?.applicableRegulations)
    const [desc, setDesc] = useState(app?.description)
    const [modules, setModules] = useState(app?.modules)
    const [appType, setAppType] = useState(app?.applicationType)
    const [hostingType, setHostingType] = useState(app?.applicationHostingType)
    const [hostingManagementType, setHostingManagementType] = useState(app?.applicationHostingManagement)
    const [hostingEntity, setHostingEntity] = useState(app?.applicationHostingEntity)
    const [appOwner, setAppOwner] = useState(app?.applicationOwner)
    const [techOwner, setTechOwner] = useState(app?.technologyOwner)
    const [hostingRegion, setHostingRegion] = useState(app?.applicationRegionStored)
    const [hasDRHosting, setHasDRHosting] = useState(app?.hasDRHosting)
    const [drHostingRegion, setDrHostingRegion] = useState(app?.applicationDRRegionStored)

    const [hasNameAndInitials, setHasNameAndInitials] = useState(app?.hasNameAndInitials)
    const [hasIdNumbers, setHasIdNumbers] = useState(app?.hasIdNumbers)
    const [hasBirthdate, setHasBirthdate] = useState(app?.hasBirthdate)
    const [hasAge, setHasAge] = useState(app?.hasAge)
    const [hasGender, setHasGender] = useState(app?.hasGender)
    const [hasHomeAddress, setHasHomeAddress] = useState(app?.hasHomeAddress)
    const [hasTelephoneNumber, setHasTelephoneNumber] = useState(app?.hasTelephoneNumber)
    const [hasMobileNumber, setHasMobileNumber] = useState(app?.hasMobileNumber)
    const [hasEmailAddress, setHasEmailAddress] = useState(app?.hasEmailAddress)
    const [hasDriversLicenceNumber, setHasDriversLicenceNumber] = useState(app?.hasDriversLicenceNumber)
    const [hasMedicalInfo, setHasMedicalInfo] = useState(app?.hasMedicalInfo)
    const [hasFinancialInfo, setHasFinancialInfo] = useState(app?.hasFinancialInfo)
    const [hasHealthInfo, setHasHealthInfo] = useState(app?.hasHealthInfo)
    const [hasStudentInfo, setHasStudentInfo] = useState(app?.hasStudentInfo)
    const [hasMinorInfo, setHasMinorInfo] = useState(app?.hasMinorInfo)
    const [hasMaritalStatus, setHasMaritalStatus] = useState(app?.hasMaritalStatus)
    const [hasNationality, setHasNationality] = useState(app?.hasNationality)
    const [hasSexualBehaviour, setHasSexualBehaviour] = useState(app?.hasSexualBehaviour)
    const [hasPhysicalCharacteristics, setHasPhysicalCharacteristics] = useState(app?.hasPhysicalCharacteristics)
    const [hasEthnicOrigin, setHasEthnicOrigin] = useState(app?.hasEthnicOrigin)
    const [hasReligiousPhilosophicalPoliticalBeliefs, setHasReligiousPhilosophicalPoliticalBeliefs] = useState(app?.hasReligiousPhilosophicalPoliticalBeliefs)
    const [hasTradeUnionMembership, setHasTradeUnionMembership] = useState(app?.hasTradeUnionMembership)
    const [hasBiometricData, setHasBiometricData] = useState(app?.hasBiometricData)
    const [hasHouseholdInfo, setHasHouseholdInfo] = useState(app?.hasHouseholdInfo)
    const [hasBillingHistory, setHasBillingHistory] = useState(app?.hasBillingHistory)
    const [hasUniqueDeviceId, setHasUniqueDeviceId] = useState(app?.hasUniqueDeviceId)
    const [hasLocation, setHasLocation] = useState(app?.hasLocation)
    const [hasCriminalInfo, setHasCriminalInfo] = useState(app?.hasCriminalInfo)
    const [hasCivilJusticeInfo, setHasCivilJusticeInfo] = useState(app?.hasCivilJusticeInfo)
    const [hasSocialMedia, setHasSocialMedia] = useState(app?.hasSocialMedia)

    const [appLinkedTo, setAppLinkedTo] = useState(app?.linkedApps)
    const [connectionType, setConnectionType] = useState(app?.connectionType)
    const [encryptedDataTransfer, setEncryptedDataTransfer] = useState(app?.encryptedDataTransfer)
    const [retentionReqs, setRetentionReqs] = useState(app?.dataRetentionReq)
    const [comments, setComments] = useState(app?.comments)

    useEffect(() => {
        setAppName(app?.applicationName)
        setApplicableRegulations(app?.applicableRegulations)
        setDesc(app?.description)
        setModules(app?.modules)
        setAppType(app?.applicationType)
        setHostingType(app?.applicationHostingType)
        setHostingManagementType(app?.applicationHostingType)
        setHostingEntity(app?.applicationHostingEntity)
        setAppOwner(app?.applicationOwner)
        setTechOwner(app?.technologyOwner)
        setHostingRegion(app?.applicationRegionStored)
        setHasDRHosting(app?.hasDRHosting)
        setDrHostingRegion(app?.applicationDRRegionStored)
        setHasNameAndInitials(app?.hasNameAndInitials)
        setHasIdNumbers(app?.hasIdNumbers)
        setHasBirthdate(app?.hasBirthdate)
        setHasAge(app?.hasAge)
        setHasGender(app?.hasGender)
        setHasHomeAddress(app?.hasHomeAddress)
        setHasTelephoneNumber(app?.hasTelephoneNumber)
        setHasMobileNumber(app?.hasMobileNumber)
        setHasEmailAddress(app?.hasEmailAddress)
        setHasDriversLicenceNumber(app?.hasDriversLicenceNumber)
        setHasMedicalInfo(app?.hasMedicalInfo)
        setHasFinancialInfo(app?.hasFinancialInfo)
        setHasHealthInfo(app?.hasHealthInfo)
        setHasStudentInfo(app?.hasStudentInfo)
        setHasMinorInfo(app?.hasMinorInfo)
        setHasMaritalStatus(app?.hasMaritalStatus)
        setHasNationality(app?.hasNationality)
        setHasSexualBehaviour(app?.hasSexualBehaviour)
        setHasPhysicalCharacteristics(app?.hasPhysicalCharacteristics)
        setHasEthnicOrigin(app?.hasEthnicOrigin)
        setHasReligiousPhilosophicalPoliticalBeliefs(app?.hasReligiousPhilosophicalPoliticalBeliefs)
        setHasTradeUnionMembership(app?.hasTradeUnionMembership)
        setHasBiometricData(app?.hasBiometricData)
        setHasHouseholdInfo(app?.hasHouseholdInfo)
        setHasBillingHistory(app?.hasBillingHistory)
        setHasUniqueDeviceId(app?.hasUniqueDeviceId)
        setHasLocation(app?.hasLocation)
        setHasCriminalInfo(app?.hasCriminalInfo)
        setHasCivilJusticeInfo(app?.hasCivilJusticeInfo)
        setHasSocialMedia(app?.hasSocialMedia)

        setAppLinkedTo(app?.linkedApps)
        setConnectionType(app?.connectionType)
        setEncryptedDataTransfer(app?.encryptedDataTransfer)
        setRetentionReqs(app?.dataRetentionReq)
        setComments(app?.comments)
    }, [app])

    if (fetching) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>
    if (linkedApps.fetching) return <p>Loading...</p>

    const submit = () => {
        const data = {
            id: appId,
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
            modules: modules,
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
            // @ts-ignore
            linkedApps: appLinkedTo,
        }

        updateApplication(data)
            .then(_ => {
                toast.success('App updated successfully!')
                router.push(`/app/${slug}`)
            }).catch(reason => console.log('ERROR', reason))
    }

    console.log('APP', app)

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
                            console.log(values)
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
                                            >{app?.applicationName}</h1>
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
                                                            onClick: () => router.push(`/app/${data?.business?.id}/${appId}`)
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
                                            sx={{
                                                width: '149px',
                                                height: '44px',
                                                borderRadius: '50px',
                                            }}
                                            onClick={() => submit()}
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
                                                // @ts-ignore
                                                error={errors.applicationName && touched.applicationName}
                                                component={TextField}
                                                name={'applicationName'}
                                                type={'text'}
                                                label="Application name"
                                                defaultValue={appName}
                                                // @ts-ignore
                                                onChange={(evt) => setAppName(evt.target.value)}
                                                helperText={errors.applicationName}
                                                variant="standard"
                                            />
                                            <Autocomplete
                                                multiple
                                                options={['GDPR', 'CCPA', 'Nevada Privacy Act', 'HIPAA', 'Swiss Data Protection Act']}
                                                getOptionLabel={(option) => option.toString()}
                                                defaultValue={app?.applicableRegulations}
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
                                                defaultValue={desc}
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
                                                defaultValue={modules}
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
                                                        defaultValue={app?.applicationType}
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
                                                        defaultValue={app?.applicationHostingType}
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
                                                            // HERE
                                                            defaultValue={app?.applicationHostingManagement}
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
                                                            defaultValue={app?.applicationHostingManagement}
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
                                                value={hostingEntity}
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
                                                value={appOwner}
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
                                                value={techOwner}
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
                                                        // @ts-ignore
                                                        onChange={(_, value) => setHostingRegion(value.props.value)}
                                                        defaultValue={app?.applicationRegionStored}
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
                                                                          control={<Radio/>} label="Yes"
                                                                          defaultChecked={app?.hasDRHosting}/>
                                                        <FormControlLabel name={'hasDRHosting'} value={false}
                                                                          control={<Radio/>} label="No"
                                                                          defaultChecked={app?.hasDRHosting}/>
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
                                                            defaultValue={app?.applicationDRRegionStored}
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
                                        <p>*Highly sensitive PII which could cause significant damage if it gets into
                                            the
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
                                                                    defaultChecked={app?.hasNameAndInitials}
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
                                                                    defaultChecked={app?.hasIdNumbers}
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
                                                                    defaultChecked={app?.hasBirthdate}
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
                                                                    defaultChecked={app?.hasAge}
                                                                    value={'hasAge'}/>} label="Age"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel
                                                    name={'storedDataTypes'}
                                                    value={'hasGender'}
                                                    onChange={(_, value) => setHasGender(value)}
                                                    control={<Field component={Checkbox}
                                                                    name={'storedDataTypes'}
                                                                    defaultChecked={app?.hasGender}
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
                                                                    defaultChecked={app?.hasHomeAddress}
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
                                                                    defaultChecked={app?.hasTelephoneNumber}
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
                                                                    defaultChecked={app?.hasMobileNumber}
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
                                                                    defaultChecked={app?.hasEmailAddress}
                                                                    value={'hasEmailAddress'}/>}
                                                    label="Personal E-mail Address"/>
                                            </FormGroup>
                                            <FormGroup>
                                                <FormControlLabel name={'storedDataTypes'}
                                                                  value={'hasDriversLicenceNumber'}
                                                                  onChange={(_, value) => setHasDriversLicenceNumber(value)}
                                                                  control={<Field component={Checkbox}
                                                                                  name={'storedDataTypes'}
                                                                                  defaultdefaultChecked={app?.hasDriversLicenceNumber}
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
                                                                    defaultChecked={app?.hasMedicalInfo}
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
                                                                    defaultChecked={app?.hasFinancialInfo}
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
                                                                    defaultChecked={app?.hasHealthInfo}
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
                                                                    defaultChecked={app?.hasStudentInfo}
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
                                                                    defaultChecked={app?.hasMinorInfo}
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
                                                                    defaultChecked={app?.hasMaritalStatus}
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
                                                                    defaultChecked={app?.hasNationality}
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
                                                                    defaultChecked={app?.hasSexualBehaviour}
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
                                                                    defaultChecked={app?.hasPhysicalCharacteristics}
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
                                                                    defaultChecked={app?.hasEthnicOrigin}
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
                                                                    defaultChecked={app?.hasReligiousPhilosophicalPoliticalBeliefs}
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
                                                                    defaultChecked={app?.hasTradeUnionMembership}
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
                                                                    defaultChecked={app?.hasBiometricData}
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
                                                                    defaultChecked={app?.hasHouseholdInfo}
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
                                                                    defaultChecked={app?.hasBillingHistory}
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
                                                                    defaultChecked={app?.hasUniqueDeviceId}
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
                                                                    defaultChecked={app?.hasLocation}
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
                                                                    defaultChecked={app?.hasCriminalInfo}
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
                                                                    defaultChecked={app?.hasCivilJusticeInfo}
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
                                                                    defaultChecked={app?.hasSocialMedia}
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
                                                    // @ts-ignore
                                                    options={[...data?.business?.applications.map((app) => {return app.applicationName}) as string[], 'PENDING']}
                                                    getOptionLabel={(option) => option.toString()}
                                                    // @ts-ignore
                                                    defaultValue={linkedApps.data?.linkedApps.map((app) => {return app.applicationName})}
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
                                                        defaultValue={app?.connectionType}
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
                                                                          control={<Radio/>} label="Yes"
                                                                          defaultChecked={app?.encryptedDataTransfer}/>
                                                        <FormControlLabel name={'encryptedDataTransfer'} value={false}
                                                                          control={<Radio/>} label="No"
                                                                          defaultChecked={!app?.encryptedDataTransfer}/>
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
                                                        defaultValue={app?.dataRetentionReq}
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
                                                    defaultValue={app?.comments}
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
                                                            onClick: () => router.push(`/app/${data?.business?.id}/${appId}`)
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
                                            onClick={() => submit()}
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