import { Application } from "../client/graphql/types.generated"

const sensibleDataType = {
    hasNameAndInitials: false,
    hasIdNumbers: true,
    hasBirthdate: false,
    hasAge: false,
    hasGender: false,
    hasHomeAddress: false,
    hasTelephoneNumber: false,
    hasMobileNumber: false,
    hasEmailAddress: false,
    hasDriversLicenceNumber: true,
    hasMedicalInfo: true,
    hasFinancialInfo: true,
    hasHealthInfo: true,
    hasStudentInfo: true,
    hasMinorInfo: false,
    hasMaritalStatus: false,
    hasNationality: false,
    hasSexualBehaviour: false,
    hasPhysicalCharacteristics: false,
    hasEthnicOrigin: false,
    hasReligiousPhilosophicalPoliticalBeliefs: false,
    hasTradeUnionMembership: false,
    hasBiometricData: true,
    hasHouseholdInfo: false,
    hasBillingHistory: true,
    hasUniqueDeviceId: false,
    hasLocation: false,
    hasCriminalInfo: true,
    hasCivilJusticeInfo: true,
    hasSocialMedia: false,
}

const isSensibleDataType = (dataType: string): boolean => {
    const entries = Object.entries(sensibleDataType)

    const entry = entries.find((value) => value[0] == dataType)

    // @ts-ignore
    return entry[1]
}

export default isSensibleDataType