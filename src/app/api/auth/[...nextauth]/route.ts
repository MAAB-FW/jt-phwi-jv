import { compare } from "bcrypt";
import NextAuth, { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "../../../../lib/connectDB";

interface Credentials {
  email: string;
  password: string;
}

const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 30,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(
        credentials: Credentials | undefined
      ): Promise<User | null> {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }
          const { email, password } = credentials;
          const db = await connectDB();
          const user = await db.collection("users").findOne({ email });
          if (!user) {
            throw new Error("Invalid credentials");
          }
          const isPasswordValid = await compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error("Invalid credentials");
          }
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            image: user.photoUrl,
          };
        } catch (error) {
          console.log(error);
          throw new Error((error as Error).message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
