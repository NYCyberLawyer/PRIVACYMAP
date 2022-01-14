import express, {NextFunction, Request, Response} from "express";
import prisma from "../prisma/prisma";
import {body, validationResult} from "express-validator";
import cuid from "cuid";
import {
    isValidApplicableRegulations, isValidApplicationConnectionType,
    isValidApplicationHostingManagement,
    isValidApplicationHostingType,
    isValidApplicationType
} from "./validations";

const PORT = process.env.PORT

const validateApiKey = async (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.header('api-key')

    if (apiKey == undefined) {
        res.status(400).send('No api-key provided')
    } else {
        const user = await prisma.user.findUnique({
            where: {
                id: apiKey
            }
        })

        if (!user) {
            res.status(400).send('Invalid api-key')
        } else {
            next()
        }
    }
}

const app = express()
app.use(express.json())
app.use(validateApiKey)

app.get('/company', async (req, res) => {
    const companies = await prisma.business.findMany()
    res.json(companies)
})

app.get('/company/:id', async (req, res) => {
    const {id} = req.params
    const company = await prisma.business.findUnique({
        where: {
            id: id
        }
    })

    const apps = await prisma.application.findMany({
        where: {
            businessId: id
        }
    })

    const data = {
        company: company,
        apps: apps
    }

    if (!company) {
        res.statusCode = 404
        res.json({error: 'company not found'})
    } else {
        res.json(data)
    }
})

app.post(
    '/company',

    body('companyName').isLength({min: 2, max: 50}),
    body('companyAddress').isLength({min: 2, max: 50}),
    body('companyPhone').isLength({min: 2, max: 50}).isNumeric(),
    body('companyEmail').isEmail(),


    body('businessContactName').isLength({min: 2, max: 50}),
    body('businessContactPosition').isLength({min: 2, max: 50}),
    body('businessContactPhone').isLength({min: 2, max: 50}).isNumeric(),
    body('businessContactEmail').isEmail(),


    body('technicalContactName').isLength({min: 2, max: 50}),
    body('technicalContactPosition').isLength({min: 2, max: 50}),
    body('technicalContactPhone').isLength({min: 2, max: 50}).isNumeric(),
    body('technicalContactEmail').isEmail(),


    body('privacyLiaisonContactName').isLength({min: 2, max: 50}),
    body('privacyLiaisonContactPosition').isLength({min: 2, max: 50}),
    body('privacyLiaisonContactPhone').isLength({min: 2, max: 50}).isNumeric(),
    body('privacyLiaisonContactEmail').isEmail(),


    body('hrContactName').isLength({min: 2, max: 50}),
    body('hrContactPosition').isLength({min: 2, max: 50}),
    body('hrContactPhone').isLength({min: 2, max: 50}).isNumeric(),
    body('hrContactEmail').isEmail(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }


        const user = await prisma.user.findUnique({
            where: {
                id: req.header('api-key')
            }
        })

        await prisma.business.create({
            data: {
                id: cuid(),
                companyName: req.body.companyName,
                companyAddress: req.body.companyAddress,
                companyPhone: req.body.companyPhone,
                companyEmail: req.body.companyEmail,

                businessContactName: req.body.businessContactName,
                businessContactPosition: req.body.businessContactPosition,
                businessContactPhone: req.body.businessContactPhone,
                businessContactEmail: req.body.businessContactEmail,

                technicalContactName: req.body.technicalContactName,
                technicalContactPosition: req.body.technicalContactPosition,
                technicalContactPhone: req.body.technicalContactPhone,
                technicalContactEmail: req.body.technicalContactEmail,

                privacyLiaisonContactName: req.body.privacyLiaisonContactName,
                privacyLiaisonContactPosition: req.body.privacyLiaisonContactPosition,
                privacyLiaisonContactPhone: req.body.privacyLiaisonContactPhone,
                privacyLiaisonContactEmail: req.body.privacyLiaisonContactEmail,

                hrContactName: req.body.hrContactName,
                hrContactPosition: req.body.hrContactPosition,
                hrContactPhone: req.body.hrContactPhone,
                hrContactEmail: req.body.hrContactEmail,

                consultancyFirmId: user?.consultancyFirmId
            }
        })

        res.status(200).send('created')
    }
)

app.post('/company/:id/app',

    body('applicationName').isLength({min: 2, max: 50}),
    body('applicableRegulations').custom(isValidApplicableRegulations),
    body('applicationType').custom(isValidApplicationType),
    body('applicationHostingType').custom(isValidApplicationHostingType),
    body('applicationHostingManagement').custom(isValidApplicationHostingManagement),
    body('connectionType').custom(isValidApplicationConnectionType),
    body('applicationHostingEntity').isLength({min: 2, max: 50}),
    body('applicationOwner').isLength({min: 2, max: 50}),
    body('technologyOwner').isLength({min: 2, max: 50}),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        // @ts-ignore
        const {id} = req.params

        await prisma.application.create({
            data: {
                id: cuid(),
                applicationName: req.body.applicationName,
                applicableRegulations: req.body.applicableRegulations,
                description: req.body.description,
                applicationHostingType: req.body.applicationHostingType,
                applicationHostingManagement: req.body.applicationHostingManagement,
                applicationHostingEntity: req.body.applicationHostingEntity,
                applicationOwner: req.body.applicationOwner,
                technologyOwner: req.body.technologyOwner,
                applicationRegionStored: req.body.applicationRegionStored,
                hasDRHosting: req.body.hasDRHosting,
                applicationDRRegionStored: req.body.applicationDRRegionStored,
                modules: req.body.modules,
                applicationType: req.body.applicationType,
                businessId: String(id),
                hasNameAndInitials: req.body.hasNameAndInitials,
                hasIdNumbers: req.body.hasIdNumbers,
                hasBirthdate: req.body.hasBirthdate,
                hasAge: req.body.hasAge,
                hasGender: req.body.hasGender,
                hasHomeAddress: req.body.hasHomeAddress,
                hasTelephoneNumber: req.body.hasTelephoneNumber,
                hasMobileNumber: req.body.hasMobileNumber,
                hasEmailAddress: req.body.hasEmailAddress,
                hasDriversLicenceNumber: req.body.hasDriversLicenceNumber,
                hasMedicalInfo: req.body.hasMedicalInfo,
                hasFinancialInfo: req.body.hasFinancialInfo,
                hasHealthInfo: req.body.hasHealthInfo,
                hasStudentInfo: req.body.hasStudentInfo,
                hasMinorInfo: req.body.hasMinorInfo,
                hasMaritalStatus: req.body.hasMaritalStatus,
                hasNationality: req.body.hasNationality,
                hasSexualBehaviour: req.body.hasSexualBehaviour,
                hasPhysicalCharacteristics: req.body.hasPhysicalCharacteristics,
                hasEthnicOrigin: req.body.hasEthnicOrigin,
                hasReligiousPhilosophicalPoliticalBeliefs: req.body.hasReligiousPhilosophicalPoliticalBeliefs,
                hasTradeUnionMembership: req.body.hasTradeUnionMembership,
                hasBiometricData: req.body.hasBiometricData,
                hasHouseholdInfo: req.body.hasHouseholdInfo,
                hasBillingHistory: req.body.hasBillingHistory,
                hasUniqueDeviceId: req.body.hasUniqueDeviceId,
                hasLocation: req.body.hasLocation,
                hasCriminalInfo: req.body.hasCriminalInfo,
                hasCivilJusticeInfo: req.body.hasCivilJusticeInfo,
                hasSocialMedia: req.body.hasSocialMedia,
                connectionType: req.body.connectionType,
                encryptedDataTransfer: req.body.encryptedDataTransfer,
                dataRetentionReq: req.body.dataRetentionReq,
                comments: req.body.comments,
                linkedApps: req.body.linkedApps,
            }
        })

        res.status(200).send('created')
    }
)

app.put(
    '/company/:id',

    body('companyName').isLength({min: 2, max: 50}),
    body('companyAddress').isLength({min: 2, max: 50}),
    body('companyPhone').isLength({min: 2, max: 50}).isNumeric(),
    body('companyEmail').isEmail(),


    body('businessContactName').isLength({min: 2, max: 50}),
    body('businessContactPosition').isLength({min: 2, max: 50}),
    body('businessContactPhone').isLength({min: 2, max: 50}).isNumeric(),
    body('businessContactEmail').isEmail(),


    body('technicalContactName').isLength({min: 2, max: 50}),
    body('technicalContactPosition').isLength({min: 2, max: 50}),
    body('technicalContactPhone').isLength({min: 2, max: 50}).isNumeric(),
    body('technicalContactEmail').isEmail(),


    body('privacyLiaisonContactName').isLength({min: 2, max: 50}),
    body('privacyLiaisonContactPosition').isLength({min: 2, max: 50}),
    body('privacyLiaisonContactPhone').isLength({min: 2, max: 50}).isNumeric(),
    body('privacyLiaisonContactEmail').isEmail(),


    body('hrContactName').isLength({min: 2, max: 50}),
    body('hrContactPosition').isLength({min: 2, max: 50}),
    body('hrContactPhone').isLength({min: 2, max: 50}).isNumeric(),
    body('hrContactEmail').isEmail(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        // @ts-ignore
        const {id} = req.params

         await prisma.business.update({
            where: {
                id: id
            },
            data: {
                companyName: req.body.companyName,
                companyAddress: req.body.companyAddress,
                companyPhone: req.body.companyPhone,
                companyEmail: req.body.companyEmail,

                businessContactName: req.body.businessContactName,
                businessContactPosition: req.body.businessContactPosition,
                businessContactPhone: req.body.businessContactPhone,
                businessContactEmail: req.body.businessContactEmail,

                technicalContactName: req.body.technicalContactName,
                technicalContactPosition: req.body.technicalContactPosition,
                technicalContactPhone: req.body.technicalContactPhone,
                technicalContactEmail: req.body.technicalContactEmail,

                privacyLiaisonContactName: req.body.privacyLiaisonContactName,
                privacyLiaisonContactPosition: req.body.privacyLiaisonContactPosition,
                privacyLiaisonContactPhone: req.body.privacyLiaisonContactPhone,
                privacyLiaisonContactEmail: req.body.privacyLiaisonContactEmail,

                hrContactName: req.body.hrContactName,
                hrContactPosition: req.body.hrContactPosition,
                hrContactPhone: req.body.hrContactPhone,
                hrContactEmail: req.body.hrContactEmail,
            }
        })

        res.status(204).send('updated')
    }
)

app.put('/company/:businessId/app/:appId',

    body('applicationName').isLength({min: 2, max: 50}),
    body('applicableRegulations').custom(isValidApplicableRegulations),
    body('applicationType').custom(isValidApplicationType),
    body('applicationHostingType').custom(isValidApplicationHostingType),
    body('applicationHostingManagement').custom(isValidApplicationHostingManagement),
    body('connectionType').custom(isValidApplicationConnectionType),
    body('applicationHostingEntity').isLength({min: 2, max: 50}),
    body('applicationOwner').isLength({min: 2, max: 50}),
    body('technologyOwner').isLength({min: 2, max: 50}),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        // @ts-ignore
        const {appId} = req.params

        await prisma.application.update({
            where: {
                id: appId
            },
            data: {
                applicationName: req.body.applicationName,
                applicableRegulations: req.body.applicableRegulations,
                description: req.body.description,
                applicationHostingType: req.body.applicationHostingType,
                applicationHostingManagement: req.body.applicationHostingManagement,
                applicationHostingEntity: req.body.applicationHostingEntity,
                applicationOwner: req.body.applicationOwner,
                technologyOwner: req.body.technologyOwner,
                applicationRegionStored: req.body.applicationRegionStored,
                hasDRHosting: req.body.hasDRHosting,
                applicationDRRegionStored: req.body.applicationDRRegionStored,
                modules: req.body.modules,
                applicationType: req.body.applicationType,
                hasNameAndInitials: req.body.hasNameAndInitials,
                hasIdNumbers: req.body.hasIdNumbers,
                hasBirthdate: req.body.hasBirthdate,
                hasAge: req.body.hasAge,
                hasGender: req.body.hasGender,
                hasHomeAddress: req.body.hasHomeAddress,
                hasTelephoneNumber: req.body.hasTelephoneNumber,
                hasMobileNumber: req.body.hasMobileNumber,
                hasEmailAddress: req.body.hasEmailAddress,
                hasDriversLicenceNumber: req.body.hasDriversLicenceNumber,
                hasMedicalInfo: req.body.hasMedicalInfo,
                hasFinancialInfo: req.body.hasFinancialInfo,
                hasHealthInfo: req.body.hasHealthInfo,
                hasStudentInfo: req.body.hasStudentInfo,
                hasMinorInfo: req.body.hasMinorInfo,
                hasMaritalStatus: req.body.hasMaritalStatus,
                hasNationality: req.body.hasNationality,
                hasSexualBehaviour: req.body.hasSexualBehaviour,
                hasPhysicalCharacteristics: req.body.hasPhysicalCharacteristics,
                hasEthnicOrigin: req.body.hasEthnicOrigin,
                hasReligiousPhilosophicalPoliticalBeliefs: req.body.hasReligiousPhilosophicalPoliticalBeliefs,
                hasTradeUnionMembership: req.body.hasTradeUnionMembership,
                hasBiometricData: req.body.hasBiometricData,
                hasHouseholdInfo: req.body.hasHouseholdInfo,
                hasBillingHistory: req.body.hasBillingHistory,
                hasUniqueDeviceId: req.body.hasUniqueDeviceId,
                hasLocation: req.body.hasLocation,
                hasCriminalInfo: req.body.hasCriminalInfo,
                hasCivilJusticeInfo: req.body.hasCivilJusticeInfo,
                hasSocialMedia: req.body.hasSocialMedia,
                connectionType: req.body.connectionType,
                encryptedDataTransfer: req.body.encryptedDataTransfer,
                dataRetentionReq: req.body.dataRetentionReq,
                comments: req.body.comments,
                linkedApps: req.body.linkedApps,
            }
        })

        res.status(204).send('updated')
    }
)

app.delete('/company/:id', async (req, res) => {
    const {id} = req.params

    await prisma.application.deleteMany({
        where: {
            businessId: id
        }
    })

    await prisma.business.delete({
        where: {
            id: id
        }
    })

    res.status(201).send('deleted')
})

app.delete('/company/:businessId/app/:appId', async (req, res) => {
    const {appId} = req.params

    await prisma.application.delete({
        where: {
            id: appId
        }
    })

    res.status(201).send('deleted')
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})