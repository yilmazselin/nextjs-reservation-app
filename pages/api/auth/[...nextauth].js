import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  // Configure one or more authentication providers
  session: {
    strategy: "jwt"
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials, req) {
        const { email, password, locale } = credentials

        if (email && password && locale) {
          return {
            id: 0,
            email,
            password,
            locale
          }
        }
        throw new Error("E-posta veya parola hatalı.")
      }
    })
  ],
  pages: {
    signIn: "/auth/signin",
    signUp: "/auth/signup"
  },

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        // Test
        token.id = user.id
        token.password = user.password
        token.locale = user.locale
      }

      return token
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id
        session.user.password = token.password
        session.user.locale = token.locale
      }

      return session
    }
  }
}

export default NextAuth(authOptions)
