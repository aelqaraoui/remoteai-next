import bcrypt from "bcrypt";
import { userExists, getProfile } from "@/lib/mongo";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;

    let user_exists = await userExists(email)

    if (!user_exists) {
        res.status(404).json({ error: "User not found" });
    } else {
        // Add your user registration logic here
        let result = await getProfile(email);

        if (result.error) {
            res.status(400).json({ error: result.error });
        } else {
            res.status(200).json({ success: true, result: result });
        }
    }

  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
