import {info} from "next/dist/build/output/log";
import {Client} from "postmark";

const FROM_EMAIL = process.env.POSTMARK_FROM_EMAIL;
const API_TOKEN = process.env.POSTMARK_API_TOKEN || "fake";

const client = new Client(API_TOKEN);

interface SendEmailInput {
    to: string;
    subject: string;
    url: string;
    verificationCode: string | number;
}

/**
 * Send an email with Postmark
 *
 * @example
 * ```ts
 * sendEmail({
 *   to: user.email,
 *   subject: `Welcome to ${appName}!`,
 *   text: `We're happy to have you...`
 * })
 * ```
 */
export const sendEmail = (input: SendEmailInput) => {
    if (process.env.NODE_ENV === `development`) {
        info(`not sending email in development:`);
        console.log(`not sending email in development:`);
        console.log();
        console.log(`To: ${input.to}`);
        console.log(`Subject: ${input.subject}`);
        console.log();
        console.log(input.url);
        console.log();
        // return;
    }

    if (API_TOKEN === "fake" || !FROM_EMAIL) {
        console.error(
            `Please specify the POSTMARK_FROM_EMAIL and POSTMARK_API_TOKEN env variables.`
        );
        return;
    }

    return client.sendEmailWithTemplate({
        "From": FROM_EMAIL,
        "To": input.to,
        "TemplateAlias": "welcome",
        "TemplateModel": {
            "verification_code": input.verificationCode,
            "action_url": input.url
        }
    });
};
