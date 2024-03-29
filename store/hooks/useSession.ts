import { auth } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function getValue() {
      const session = await getServerSession(auth)
      return session
}