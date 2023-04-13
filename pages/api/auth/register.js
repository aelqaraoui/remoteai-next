// pages/api/auth/register.js
import bcrypt from "bcrypt";
import { createUser, createProfile } from "@/lib/mongo";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Add your user registration logic here
    let result = await createUser({ name, email, password: hashedPassword });

    if (result.error) {
        res.status(400).json({ error: result.error, flag: 'user registration failed' });
    } else {
        result = await createProfile({ email, applications: [], expands: [] });

        if (result.error) {
            res.status(400).json({ error: result.error, flag: 'profile creation failed' });
        } else {
            res.status(200).json({ success: true });
        }
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
