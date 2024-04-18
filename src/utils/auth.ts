import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, User, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./connectPrisma";

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
	},
	providers: [
		GoogleProvider({
			clientId: process.env.NEXT_GOOGLE_ID as string,
			clientSecret: process.env.NEXT_GOOGLE_SECRET as string,
		}),
	],
	callbacks: {
		async session({ token, session }) {
			if (token) {
				session.user.isAdmin = token.isAdmin as boolean;
			}
			return session;
		},
		async jwt({ token }) {
			try {
				// Ensure the model name matches what's defined in your Prisma schema
				const userInDb = await prisma.users.findUnique({
					where: {
						email: token.email!,
					},
				});
				token.isAdmin = userInDb?.isAdmin ?? false;
			} catch (error) {
				console.error("Error in JWT callback:", error);
				// Handle error appropriately
			}
			return token;
		},
	},
};

export const getAuthSession = () => getServerSession(authOptions); // pass the google provider to the server
