import MagicLoginStrategy from "passport-magic-login";
import { getRequestOrigin } from "../get-request-origin";
import { sendEmail } from "../send-email";
import prisma from "../db/prisma";

if (!process.env.MAGIC_LINK_SECRET)
  throw new Error(
    `Please add process.env.MAGIC_LINK_SECRET to your .env file!`
  );

const magicLink = new MagicLoginStrategy({
  secret: process.env.MAGIC_LINK_SECRET,
  callbackUrl: "/api/auth/magiclink/callback",
  sendMagicLink: async (destination, href, code, req) => {
    const link = `${getRequestOrigin(req)}${href}`;

    const user = await prisma.user.findUnique({
      where: {
        email: destination
      }
    })

    if (user == null) throw new Error('User not found!')

    await prisma.token.create({
      data: {
        token: href.split('=')[1],
      }
    })

    await sendEmail({
      to: destination,
      subject: `[MyDPO] Login link`,
      url: link,
      verificationCode: code,
    });
  },
  verify: (payload, callback) => {
    callback(undefined, {
      ...payload,
      email: payload.destination,
      provider: "mail",
    });
  },
});

export default magicLink;
