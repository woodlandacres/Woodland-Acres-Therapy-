import { Database } from "bun:sqlite";
import bcryptjs from "bcryptjs";

async function run() {
  try {
    const db = new Database("/home/team/shared/site/portal.db");
    const tempPassword = "Therapy2024!";
    const hash = bcryptjs.hashSync(tempPassword, 10);
    
    const email = "eweaver@woodlandacrestherapy.org";
    const res = db.query("UPDATE users SET password_hash = ? WHERE email = ?").run(hash, email);
    
    console.log(`Password reset successfully for ${email}.`);
    console.log(`Updated rows: ${res.changes}`);
    
    // Verify it
    const user = db.query("SELECT * FROM users WHERE email = ?").get(email);
    console.log("Verified User Object:", user);
  } catch (error) {
    console.error("Error updating password:", error);
  }
}

run();
