import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/documents.readonly'
    })
  ],
  callbacks: {
    session: async (session, user) => {
      return Promise.resolve({
        ...session,
        ...user
      })
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      if (account && account.accessToken) {
        token = {
          ...token,
          ...account
        }
      }
      return Promise.resolve(token)
    }
  }
}

export default (req, res) => NextAuth(req, res, options)