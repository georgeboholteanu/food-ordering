import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, User, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../utils/connectPrisma"; //prisma client
import bcrypt from 'bcrypt';

//modify the session object
declare module "next-auth" {
  interface Session {
    user: User & {
      isAdmin: Boolean;
    };
  }
}

//modify the JWT object
declare module "next-auth" {
  interface JWT {
    isAdmin: Boolean;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // Session expiration time in seconds, e.g., 30 days
    updateAge: 24 * 60 * 60, // How frequently to update the session, e.g., every 24 hours
  },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_ID!,
      clientSecret: process.env.NEXT_GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "your-email@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials, req) {
        if (credentials) {
          // Retrieve user data from the database to verify with credentials
          const user = await prisma.employees.findUnique({
            where: { email: credentials.email },
          });

          // Compare hashed password stored in the database
          if (user && await bcrypt.compare(credentials.password, user.password)) {
            // Authentication successful
            return user;
          }
        }
        // Return null if user authentication fails
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // token.isAdmin = user.role ?? "BASIC";
      }
      return token;
    },
    async session({ token, session }) {
      session.user.isAdmin = token.isAdmin as boolean;
      return session;
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions); // Pass the Google provider to the server
