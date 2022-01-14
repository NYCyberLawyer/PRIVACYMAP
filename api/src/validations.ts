import {CustomValidator} from "express-validator";

const isValidApplicableRegulations: CustomValidator = (value: string[]) => {
    const isValid = value.every((currentValue) => {
        return currentValue == 'GDPR' ||
            currentValue == 'CCPA' ||
            currentValue == 'Nevada Privacy Act' ||
            currentValue == 'HIPAA' ||
            currentValue == 'Swiss Data Privacy Act'
    })
    if (!isValid) return Promise.reject('Invalid applicableRegulations field values')
    else return Promise.resolve()
}

const isValidApplicationType: CustomValidator = (value: string) => {
    const isValid = value == 'service' || value == 'application'

    if (!isValid) return Promise.reject('Invalid applicationType field values')
    else return Promise.resolve()
}

const isValidApplicationHostingType: CustomValidator = (value: string) => {
    const isValid = value == 'Cloud' || value == 'On Premise' || value == 'Distributed'
    if (!isValid) return Promise.reject('Invalid applicationHostingType field values')
    else return Promise.resolve()
}

const isValidApplicationHostingManagement: CustomValidator = (value: string) => {
    const isValid = value == 'SaaS' || value == 'IaaS' || value == 'PaaS' || value == 'Self Hosted' || value == 'Co-Location'
    if (!isValid) return Promise.reject('Invalid ApplicationHostingManagement field values')
    else return Promise.resolve()
}

const isValidApplicationConnectionType: CustomValidator = (value: string) => {
    const isValid = value == 'filetransfer' || value == 'api' || value == 'batch' || value == 'manual'
    if (!isValid) return Promise.reject('Invalid applicationConnectionType field values')
    else return Promise.resolve()
}

export {
    isValidApplicableRegulations,
    isValidApplicationType,
    isValidApplicationHostingType,
    isValidApplicationHostingManagement,
    isValidApplicationConnectionType
}