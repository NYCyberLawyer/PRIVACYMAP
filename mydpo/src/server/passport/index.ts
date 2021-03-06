import passport from "passport";
import magicLink from "./magicLink";
import prisma from "../db/prisma";

passport.use(magicLink);

// This types passport.(de)serializeUser!
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface User {
            id: string;
            email: string;
            provider: string;
            redirect?: string;
        }
    }
}

passport.serializeUser(async (u: Express.User, done) => {
    const {email} = u;

    const user = await prisma.user.findFirst({
        where: {
            email,
        }
    });

    done(null, {
        ...u,
        id: user?.id,
    });
});

passport.deserializeUser(async (user: Express.User, done) => {
    done(null, user);
});

export default passport;
