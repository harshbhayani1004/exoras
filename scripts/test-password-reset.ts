import { resetPassword } from "./auth";

async function testPasswordReset() {
  const email = "test@example.com"; // Replace with your test email
  console.log(`Sending password reset email to: ${email}`);

  const result = await resetPassword(email);

  if (result.success) {
    console.log("✅ Password reset email sent successfully!");
    console.log("Check your email for the reset link.");
  } else {
    console.error("❌ Failed to send password reset email:", result.error);
  }
}

// Uncomment to test:
// testPasswordReset();
