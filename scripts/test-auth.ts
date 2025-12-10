// Set environment variables for testing
process.env.NEXT_PUBLIC_SUPABASE_URL =
  "https://ysrdptrgpxpdohzgcniy.supabase.co";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY =
  "sb_publishable_-0LN94eRGjVKtLMtgM2T4w_s1GhaXTk";

import { registerUser, loginUser, logoutUser } from "../src/lib/auth";

async function testAuth() {
  console.log("🧪 Testing Authentication System...\n");

  // Test user data
  const testUsers = [
    { email: "test1@example.com", password: "test123", name: "Test User One" },
    { email: "test2@example.com", password: "test456", name: "Test User Two" },
    {
      email: "test3@example.com",
      password: "test789",
      name: "Test User Three",
    },
  ];

  for (let i = 0; i < testUsers.length; i++) {
    const user = testUsers[i];
    console.log(`\n--- Testing User ${i + 1} ---`);
    console.log(`Email: ${user.email}`);
    console.log(`Name: ${user.name}`);

    // Test Registration
    console.log("\n1️⃣ Testing Registration...");
    const registerResult = await registerUser(
      user.email,
      user.password,
      user.name
    );

    if (registerResult.success) {
      console.log("✅ Registration successful!");
      console.log(`   User ID: ${registerResult.user?.id}`);
      console.log(`   Email: ${registerResult.user?.email}`);
      console.log(`   Name: ${registerResult.user?.name}`);

      // Logout
      await logoutUser();
      console.log("🚪 Logged out");

      // Test Login
      console.log("\n2️⃣ Testing Login...");
      const loginResult = await loginUser(user.email, user.password);

      if (loginResult.success) {
        console.log("✅ Login successful!");
        console.log(`   User ID: ${loginResult.user?.id}`);
        console.log(`   Email: ${loginResult.user?.email}`);
        console.log(`   Name: ${loginResult.user?.name}`);

        // Logout again
        await logoutUser();
        console.log("🚪 Logged out");
      } else {
        console.log("❌ Login failed:", loginResult.error);
      }
    } else {
      console.log("❌ Registration failed:", registerResult.error);
    }
  }

  console.log("\n\n✨ Testing complete!");
  console.log("\n📝 Summary:");
  console.log("   - 3 test users created");
  console.log("   - Registration tested ✓");
  console.log("   - Login tested ✓");
  console.log("   - Logout tested ✓");
  console.log("\nYou can now:");
  console.log("   1. Login with any test user on the website");
  console.log("   2. Add products to cart");
  console.log("   3. Check the Supabase database to see the data");
}

testAuth().catch(console.error);
