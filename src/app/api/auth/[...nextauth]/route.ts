
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongo } from "@/lib/db";
import { User, UserRole } from "@/models/User";
import bcrypt from "bcryptjs";

// Define auth options
export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                await connectMongo();

                const user = await User.findOne({ email: credentials.email });

                if (!user || !user.password) {
                    throw new Error("Invalid credentials");
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials");
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: `${user.firstName} ${user.lastName}`,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === "google") {
                if (!user.email) return false;

                await connectMongo();

                try {
                    const existingUser = await User.findOne({ email: user.email });

                    if (!existingUser) {
                        // Cast to any to access Google-specific fields safely or fall back to user.name
                        const googleProfile = profile as any;

                        const firstName = googleProfile?.given_name || user.name?.split(" ")[0] || "User";
                        const lastName = googleProfile?.family_name || user.name?.split(" ")[1] || "";

                        console.log("Creating new user via Google:", { email: user.email, firstName, lastName });

                        await User.create({
                            firstName,
                            lastName,
                            email: user.email,
                            role: UserRole.CLIENT,
                            walletBalance: 0,
                            // No password for Google users
                        });
                    }
                    return true;
                } catch (error) {
                    console.error("Error creating user from Google:", error);
                    return false;
                }
            }
            return true;
        },
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.role = (user as any).role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role;
                (session.user as any).id = token.id;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
        error: "/login", // Redirect to login page on error
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
