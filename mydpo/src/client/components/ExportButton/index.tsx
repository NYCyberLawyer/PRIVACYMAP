import XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import React from 'react';
import { Button } from '@mui/material';
import { Application } from '../../graphql/types.generated';
import { FaDownload} from 'react-icons/fa';
import isSensibleDataType from '../../../helper/sensibleDataType';

// @ts-ignore
export default function ExportButton({business}) {

    //- Row number where data about applications starts
    const ROWLINE_APPLICATIONS_STARTS = 12;
    const ROWLINE_APPLICATION_DATA_STARTS = 30;

    //- Long in rows of the final exported excel
    const NUMBER_OF_ROWS_EXPECTED = 60;

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';  

    const exportToExcel = () => { 
        const wb = createWorkBook()
        const buisnessInfo = createBuisnessInfo()
        const ws = XLSX.utils.aoa_to_sheet(buisnessInfo);
        loadWorkSheetIsCriticalData(ws, ROWLINE_APPLICATIONS_STARTS, ROWLINE_APPLICATION_DATA_STARTS);
        loadWorkSheetHeaders(ws, ROWLINE_APPLICATIONS_STARTS);

        let colNum = 2;
        business?.applications?.forEach((app:Application) => {
            const colLetter = numToAlpha(colNum);
            loadApplicationData(ws, app, colLetter, ROWLINE_APPLICATIONS_STARTS);
            colNum ++;
        })
        
        ws["!ref"] = "A1:" + numToAlpha((1 + business?.applications?.length) || 2) + NUMBER_OF_ROWS_EXPECTED

        wb.Sheets[business?.companyName || ""] = ws;
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const dataBlob = new Blob([excelBuffer], {type: fileType});
        saveAs(dataBlob, (business?.companyName || "summary") + fileExtension);
    }

    //- Return Column Letter corresponding to num
    const numToAlpha = (num:number) => {

        let alpha = '';
        
        // @ts-ignore
        for (; num >= 0; num = parseInt(num / 26, 10) - 1) {
            alpha = String.fromCharCode(num % 26 + 0x41) + alpha;
        }
        
        return alpha;
    }

    const createWorkBook = () => {
        const wb = XLSX.utils.book_new();
        wb.Props = {
            Title: "Summary",
            Subject: "Summary",
            Author: "Me",
            CreatedDate: new Date()
        };

        wb.SheetNames.push(business?.companyName || "");
        return wb;
    }

    const createBuisnessInfo = () => {
        return [
            [business?.companyName],
            [],
            ["COMPANY INFO"],
            ["Address", business?.companyAddress],
            ["Phone", business?.companyPhone],
            ["E-mail", business?.companyEmail],
            ["Business Contact", business?.businessContactName +", "+ business?.businessContactPosition +", "+ business?.businessContactEmail + ", "+ business?.businessContactPhone],
            ["Technical Contact", business?.technicalContactName + ", "+ business?.technicalContactPosition + ", "+ business?.technicalContactEmail + ", "+ business?.technicalContactPhone],
            ["Privacy Liaison", business?.privacyLiaisonContactName + ", "+ business?.privacyLiaisonContactPosition + ", "+ business?.privacyLiaisonContactEmail + ", "+ business?.privacyLiaisonContactPhone],
            ["Human Resources Contact", business?.hrContactName + ", "+ business?.hrContactPosition + ", "+ business?.hrContactEmail + ", "+ business?.hrContactPhone],
            []
        ];
    }

    const loadApplicationData = (ws: XLSX.WorkSheet, application:Application, col: string, rowNum:number) => {
        //- Apps info:
        ws[col + rowNum]      = {v: application.applicationName, t: "s"};
        ws[col + (++rowNum)]  = {v: application.description, t: "s"};
        ws[col + (++rowNum)]  = {v: application.applicableRegulations, t: "s"};
        ws[col + (++rowNum)]  = {v: application.modules, t: "s"};
        ws[col + (++rowNum)]  = {v: application.applicationType, t: "s"};
        ws[col + (++rowNum)]  = {v: application.applicationHostingType, t: "s"};
        ws[col + (++rowNum)]  = {v: application.applicationHostingManagement, t: "s"};
        ws[col + (++rowNum)]  = {v: application.applicationHostingEntity, t: "s"};
        ws[col + (++rowNum)]  = {v: application.applicationOwner, t: "s"};
        ws[col + (++rowNum)]  = {v: application.technologyOwner, t: "s"};
        ws[col + (++rowNum)]  = {v: application.applicationRegionStored, t: "s"};
        ws[col + (++rowNum)]  = {v: application.hasDRHosting ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)]  = {v: application.linkedApps, t: "s"};
        ws[col + (++rowNum)]  = {v: application.connectionType, t: "s"};
        ws[col + (++rowNum)]  = {v: application.encryptedDataTransfer ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)]  = {v: application.dataRetentionReq, t: "s"};
        ws[col + (++rowNum)]  = {v: application.comments, t: "s"};
        
        //- Skipping 2 rows:
        rowNum += 2;

        //- Type of data stored:
        ws[col + (++rowNum)] = {v: application.hasNameAndInitials ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasIdNumbers ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasBirthdate ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasAge ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasGender ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasHomeAddress ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasTelephoneNumber ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasMobileNumber ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasEmailAddress ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasDriversLicenceNumber ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasMedicalInfo ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasFinancialInfo ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasHealthInfo ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasStudentInfo ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasMinorInfo ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasMaritalStatus ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasNationality ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasSexualBehaviour ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasPhysicalCharacteristics ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasEthnicOrigin ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasReligiousPhilosophicalPoliticalBeliefs ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasTradeUnionMembership ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasBiometricData ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasHouseholdInfo ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasBillingHistory ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasUniqueDeviceId ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasLocation ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasCriminalInfo ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasCivilJusticeInfo ? "Yes" : "No", t: "s"};
        ws[col + (++rowNum)] = {v: application.hasSocialMedia ? "Yes" : "No", t: "s"};
    }

    const loadWorkSheetIsCriticalData = (ws: XLSX.WorkSheet, rowTitleStart:number, rowStart:number) => {
        
        ws['A' + (rowTitleStart)]  = {v: "APPS", t: "s"};
        ws['A' + (rowTitleStart + 18)]  = {v: "TYPE OF DATA STORED", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasNameAndInitials') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasIdNumbers') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasBirthdate') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasAge') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasGender') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasHomeAddress') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasTelephoneNumber') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasMobileNumber') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasEmailAddress') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasDriversLicenceNumber') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasMedicalInfo') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasFinancialInfo') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasHealthInfo') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasStudentInfo') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasMinorInfo') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasMaritalStatus') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasNationality') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasSexualBehaviour') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasPhysicalCharacteristics') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasEthnicOrigin') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasReligiousPhilosophicalPoliticalBeliefs') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasTradeUnionMembership') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasBiometricData') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasHouseholdInfo') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasBillingHistory') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasUniqueDeviceId') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasLocation') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasCriminalInfo') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasCivilJusticeInfo') ? "*" : "", t: "s"};
        ws['A' + (++rowStart)]  = {v: isSensibleDataType('hasSocialMedia') ? "*" : "", t: "s"};
    }

    const loadWorkSheetHeaders = (ws: XLSX.WorkSheet, rowStart:number) => {
        ws['B' + (++rowStart)]  = {v: "Description", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Applicable Regulations", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Modules or subservices", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Service or application", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Cloud or On Premise", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Type of hosting", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Hosting entity", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Application Owner", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Technology Owner", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Region Stored", t: "s"};
        ws['B' + (++rowStart)]  = {v: "DR hosting", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Application is linked to", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Type of connection", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Data Transfer ecrypted", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Data retention requirements", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Comments", t: "s"};
        ws['B' + (++rowStart)]  = {v: "", t: "s"};
        ws['B' + (++rowStart)]  = {v: "", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Name and initials in any combination", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Identification numbers (e.g., Social Security)", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Birthdate", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Age", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Gender", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Home address", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Home telephone number", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Personal cellular, mobile or wireless number", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Personal e-mail address", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Drivers’ license number", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Information on medical or health conditions", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Financial information (credit cards, billing info, account info)", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Health information", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Student information", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Minor/Youth information", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Marital status", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Nationality", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Sexual behavior or sexual preference", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Physical characteristics", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Racial or ethnic origin", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Religious, philosophical or political beliefs", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Trade union membership", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Biometric data", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Household information", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Consumer purchase or billing history", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Unique device identifiers (IP/ MAC addresses)", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Location (e.g., GPS) info (including that provided by mobile devices)", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Criminal information", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Civil justice information", t: "s"};
        ws['B' + (++rowStart)]  = {v: "Social Media", t: "s"};
    }

    const greenButton = {
        width: '394px',
        height: '46px',
        marginTop: '-10px',
        marginBottom: '0px',
        borderRadius: '25px',
        gridColumnStart: 2,
        backgroundColor: '#0AA64E',
        "&:hover": {
            background: "#09953D"
        },
    }

    return (
        <Button 
            variant="contained"
            color="success"
            sx={greenButton} 
            onClick={exportToExcel}>
            <span>DOWNLOAD REPORT</span><span style={{ marginLeft: '10px',marginTop: '4px', fontSize: '13px'}}>
                <FaDownload style={{color:'white',border:'2px solid white',  padding: '2px', marginLeft: '10px' }} />
            </span>
        </Button>
    );
}
