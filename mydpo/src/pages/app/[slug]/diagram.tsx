import {Box, Button, Grid} from "@mui/material";
import {useRouter} from "next/router";
import { useEffect } from "react";
import Layout from "../../../client/components/Layout";
import {useGetBusinessQuery} from "../../../client/graphql/getBusiness.generated";
import mermaid from "mermaid";
import { Application } from "../../../client/graphql/types.generated";
import { FaDownload, FaIgloo } from "react-icons/fa";
import isSensibleDataType from '../../../helper/sensibleDataType';

export default function Diagram() {
    const router = useRouter();
    const criticalClass = ":::critical";
    let svg:string;
    const {slug} = router.query;
    const [{data, fetching, error}] = useGetBusinessQuery({
        variables: { 
            id: String(slug)
        }
    })

    const regionsMap = new Map<string, string>([
        ["eastus", "East US"],
        ["centus", "Central US"],
        ["westus", "West US"],
        ["africa", "Africa"],
        ["asia", "Asia"],
        ["canada", "Canada"],
        ["europe", "Europe"],
        ["mideast", "Middle East"],
        ["southam", "South America"],
        ["govcloud", "Government Cloud"]
    ]);

    if (fetching) return <p>Loading...</p>;

    if (error) return <p>{error.message}</p>;

    useEffect(() => {
        mermaid.initialize({ startOnLoad: true });
        let graph = generateGraphDefinition();
        
        renderMermaIdDiagram(graph);
        
    });

    const renderMermaIdDiagram = (graph:string) => {
        mermaid.render('theGraph', graph, function(svgCode){
            let output = document.getElementById('output');
            if(output){
                svg = svgCode;
                output.innerHTML = svgCode;
            }
        });
    }


    const generateGraphDefinition = () => {
        let graphDefinition = "";
        graphDefinition += loadGraphConfiguration();
        graphDefinition += loadGraphBody();

        return graphDefinition;
    }
    
    const loadGraphConfiguration = () => {
        return `
            graph LR
                %%{init: {'theme': 'neutral', "flowchart" : { "curve" : "step" } } }%%
                subgraph "${data?.business?.companyName} "
                    subgraph Reference
                        classDef critical fill:#ff6f6f;
                        classDef references fill:transparent,stroke:none;
                        ref1[" "]:::critical --> refCritial["Critical Data"]:::references
                        ref2[" "] --> refNoCritical["None Critic Data"]:::references
                    end
        `;
    }

    const loadGraphBody = () => {
        let body:string = "";
        let numerator:number = 1;

        //- Get all Hosting Types availebles for this company. (Cloud, On-Premise, Co-Location):
        let hostingTypeNames = getAllHostingTypes();
        hostingTypeNames?.forEach(hostingType => {
            body += `subgraph ${hostingType}\n`;
            
            //- All regions availables for this particular Hosting Type:
            let allRegions:string[] = getAllRegions(hostingType);

            allRegions?.forEach(regionStored => {
                body += `subgraph ${numerator}["${regionsMap.get(regionStored) || regionStored}"]\n`;
                data?.business?.applications.forEach(app => {
                    body += loadGraphicalApplications(app, hostingType, regionStored);
                });
                body += "end\n";
                numerator++;
            });
            body += "end\n";
        });

        body += createRelationships();
        body += "end\n";
        return body;
    }

    const getAllHostingTypes = () => {
        let hostingTypeNames = data?.business?.applications?.
            map(app => app.applicationHostingType).
            filter(function(elem, index, self) {
                return index === self.indexOf(elem);
        });

        return hostingTypeNames;
    }

    const getAllRegions = (hostingType:string) => {
        let regionStoredApplicationsNames = data?.business?.applications?.
                filter(app => app.applicationHostingType === hostingType).
                map(app => app.applicationRegionStored);
        let regionStoredDRsNames = data?.business?.applications?.
            filter(app => app.applicationHostingType === hostingType).
            filter(app => app.hasDRHosting).
            map(app => app.applicationDRRegionStored);

        let allregions = [...regionStoredApplicationsNames || [], ...regionStoredDRsNames || []].
            filter(function(elem, index, self) {
            return index === self.indexOf(elem);
            });

        return allregions;
    }

    const loadGraphicalApplications = (app:Application, hostingType:string, regionStored:string) => {
        let application = "";

        if(app.applicationRegionStored === regionStored && app.applicationHostingType === hostingType){
            application += `${app.id}["${app.applicationName.toUpperCase()} <br> (${formatRegulations(app.applicableRegulations)})"]${getClassPorApplicationDataCriticType(app)}\n`;
        }
        
        if(app.applicationDRRegionStored === regionStored && app.applicationHostingType === hostingType){
            application += `${app.id}DR[("DR - ${app.applicationName.toUpperCase()}")]${getClassPorApplicationDataCriticType(app)}\n`;
        }

        return application;
    }

    const getClassPorApplicationDataCriticType = (app:Application) => {
        if(app.hasNameAndInitials && isSensibleDataType("hasNameAndInitials")){ return criticalClass; }
        if(app.hasIdNumbers && isSensibleDataType("hasIdNumbers")){ return criticalClass; }
        if(app.hasBirthdate && isSensibleDataType("hasBirthdate")){ return criticalClass; }
        if(app.hasAge && isSensibleDataType("hasAge")){ return criticalClass; }
        if(app.hasGender && isSensibleDataType("hasGender")){ return criticalClass; }
        if(app.hasHomeAddress && isSensibleDataType("hasHomeAddress")){ return criticalClass; }
        if(app.hasTelephoneNumber && isSensibleDataType("hasTelephoneNumber")){ return criticalClass; }
        if(app.hasMobileNumber && isSensibleDataType("hasMobileNumber")){ return criticalClass; }
        if(app.hasEmailAddress && isSensibleDataType("hasEmailAddress")){ return criticalClass; }
        if(app.hasDriversLicenceNumber && isSensibleDataType("hasDriversLicenceNumber")){ return criticalClass; }
        if(app.hasMedicalInfo && isSensibleDataType("hasMedicalInfo")){ return criticalClass; }
        if(app.hasFinancialInfo && isSensibleDataType("hasFinancialInfo")){ return criticalClass; }
        if(app.hasHealthInfo && isSensibleDataType("hasHealthInfo")){ return criticalClass; }
        if(app.hasStudentInfo && isSensibleDataType("hasStudentInfo")){ return criticalClass; }
        if(app.hasMinorInfo && isSensibleDataType("hasMinorInfo")){ return criticalClass; }
        if(app.hasMaritalStatus && isSensibleDataType("hasMaritalStatus")){ return criticalClass; }
        if(app.hasNationality && isSensibleDataType("hasNationality")){ return criticalClass; }
        if(app.hasSexualBehaviour && isSensibleDataType("hasSexualBehaviour")){ return criticalClass; }
        if(app.hasPhysicalCharacteristics && isSensibleDataType("hasNamhasPhysicalCharacteristicseAndInitials")){ return criticalClass; }
        if(app.hasEthnicOrigin && isSensibleDataType("hasEthnicOrigin")){ return criticalClass; }
        if(app.hasReligiousPhilosophicalPoliticalBeliefs && isSensibleDataType("hasReligiousPhilosophicalPoliticalBeliefs")){ return criticalClass; }
        if(app.hasTradeUnionMembership && isSensibleDataType("hasTradeUnionMembership")){ return criticalClass; }
        if(app.hasBiometricData && isSensibleDataType("hasBiometricData")){ return criticalClass; }
        if(app.hasHouseholdInfo && isSensibleDataType("hasHouseholdInfo")){ return criticalClass; }
        if(app.hasBillingHistory && isSensibleDataType("hasBillingHistory")){ return criticalClass; }
        if(app.hasUniqueDeviceId && isSensibleDataType("hasUniqueDeviceId")){ return criticalClass; }
        if(app.hasLocation && isSensibleDataType("hasLocation")){ return criticalClass; }
        if(app.hasCriminalInfo && isSensibleDataType("hasCriminalInfo")){ return criticalClass; }
        if(app.hasCivilJusticeInfo && isSensibleDataType("hasCivilJusticeInfo")){ return criticalClass; }
        if(app.hasSocialMedia && isSensibleDataType("hasSocialMedia")){ return criticalClass; }

        return "";
    }

    const createRelationships = () => {
        let relationships = "";
        data?.business?.applications.forEach(app => {
            if(app.linkedApps != null && app.linkedApps.length > 0){
                for (let i = 0; i < app.linkedApps.length; i++) {
                    if(app.connectionType){
                        relationships += `${app.id} -->|"${app.connectionType}"| ${app.linkedApps[i]}\n `;
                    }else{
                        relationships += `${app.id} --> ${app.linkedApps[i]}\n `;
                    }
                }
                
            }
            if(app.hasDRHosting){
                relationships += `${app.id} --- ${app.id}DR\n `;
            }
        });

        return relationships;
    }

    const formatRegulations = (regulations:string[]) =>{
        let regulationsFormatted = "";
        regulations.forEach((regulation, index) => {
            if((index + 1) !== regulations.length)
                regulationsFormatted += `${regulation} - `;
            else{
                regulationsFormatted += regulation;
            }
        });
        return regulationsFormatted;
    }

    const downloadDiagram = () => {
        var svgBlob = new Blob([svg || ""], {type:"image/svg+xml;charset=utf-8"});
        var svgUrl = URL.createObjectURL(svgBlob);
        var downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = `${data?.business?.companyName}_diagram.svg`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    const greenButton = {

        height: '46px',
        marginTop: '0px',
        marginBottom: '15px',
        borderRadius: '25px',
        gridColumnStart: 1,
        backgroundColor: '#0AA64E',
        marginRight:'auto',
        "&:hover": {
            background: "#09953D"
        },
    }

    return (
        <>
            <Layout>
                <Grid
                    sx={{
                        marginTop: '40px',
                        marginBottom: '30px',
                        display: 'grid',
                        gap: '20px',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                    }}>
                    <Box
                        sx={{
                            backgroundColor: '#FFFFFF',
                            width: '1020px',
                            height: '44px',
                            borderRadius: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <h1 style={{marginLeft: '20px'}} >{data?.business?.companyName}</h1>
                    </Box>
                    <Box style={{ marginRight:'auto' }}>
                        <Button
                            variant={'contained'}
                            style={greenButton}
                            onClick={ downloadDiagram }>
                            DOWNLOAD
                        </Button>
                    </Box>
                        
                </Grid>

                <Grid sx={{marginTop: '10px'}}>
                    <div style={{ width: "100%", display: 'grid', justifyItems: 'center', alignContent: 'center', gridTemplateColumns: '1fr'}} id="output"></div>
                </Grid>
            </Layout>
        </>
    );

}