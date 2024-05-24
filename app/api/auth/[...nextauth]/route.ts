import NextAuth, { Session } from "next-auth"
import Google, { GoogleProfile } from "@node_modules/next-auth/providers/google"
import { connectToDB } from "@utilities/database"
import UserModel from "@models/userModel"

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      await connectToDB()
      const existingUser = await UserModel.findOne({
        email: session.user?.email
      })

      if (existingUser) {
        user = existingUser as any
        session.user = user
      } else {
        session.user = undefined
      }

      return session
    },
    async signIn({ profile }) {
      try {
         await connectToDB()

        let user = await UserModel.findOne({
          email: profile?.email,
        })

        if (!user) {
          user = await UserModel.create({
            email: profile?.email,
            image: (profile as any)?.picture,
            username: profile?.name?.replace(" ", "").toLowerCase(),
          })
        }

        return true
      } catch (e) {
        console.error(e)
        return false
      }
    },
  },
})

export { handler as GET, handler as POST }
