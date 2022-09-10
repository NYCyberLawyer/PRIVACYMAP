import passport from "passport";
import handler from "../../../../server/api-route";
import prisma from "../../../../server/db/prisma";

export default handler()
  .use(passport.authenticate("magiclogin"))
  // @ts-ignore
  .use((req, res) => {
    prisma.token
      .findUnique({
        where: {
          token: req.query.token,
        },
      })
      .then((token) => {
        // @ts-ignore
        prisma.token
          .update({
            where: {
              id: token?.id,
            },
            data: {
              isUsed: true,
            },
          })
          .then((_) => {
            if (token?.isUsed) {
              res.redirect("/login?error=usedtoken");
            } else {
              res.redirect(req.user?.redirect || "/app");
            }
          });
      });
  });
