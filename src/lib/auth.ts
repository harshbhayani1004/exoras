import { supabase } from "./supabase";

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  error?: string;
}

// Google OAuth Sign In
export async function signInWithGoogle(): Promise<AuthResponse> {
  try {
    // Use HTTPS for production, keep HTTP for localhost dev
    const origin = window.location.origin;
    const isLocalhost =
      origin.includes("localhost") || origin.includes("127.0.0.1");
    const redirectUrl = isLocalhost
      ? origin
      : origin.replace(/^http:/, "https:");

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl, // HTTP for localhost, HTTPS for production
        skipBrowserRedirect: false,
      },
    });

    if (error) {
      console.error("Google sign in error:", error);
      return { success: false, error: "Failed to sign in with Google" };
    }

    return { success: true };
  } catch (error) {
    console.error("Google auth error:", error);
    return { success: false, error: "Google authentication failed" };
  }
}

// Check if user is authenticated via Supabase Auth
export async function checkSupabaseAuth(): Promise<User | null> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      return {
        id: parseInt(user.id) || 0,
        email: user.email || "",
        name: user.user_metadata?.name || user.email?.split("@")[0] || "User",
      };
    }
    return null;
  } catch {
    return null;
  }
}

// Simple hash function for demo (in production, use proper server-side hashing)
async function simpleHash(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function registerUser(
  email: string,
  password: string,
  name: string
): Promise<AuthResponse> {
  try {
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return { success: false, error: "Email already registered" };
    }

    // Hash password
    const passwordHash = await simpleHash(password);

    // Insert new user
    const { data, error } = await supabase
      .from("users")
      .insert([{ email, name, password_hash: passwordHash }])
      .select("id, email, name")
      .single();

    if (error) {
      console.error("Insert error:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      return {
        success: false,
        error:
          error.message ||
          "Failed to create account. Please check if Row Level Security policies allow inserts.",
      };
    }

    // Create session
    await createSession(data.id);

    return { success: true, user: data };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "Registration failed" };
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    // Hash the provided password
    const passwordHash = await simpleHash(password);

    // Get user by email and password hash
    const { data: user, error } = await supabase
      .from("users")
      .select("id, email, name")
      .eq("email", email)
      .eq("password_hash", passwordHash)
      .single();

    if (error || !user) {
      return { success: false, error: "Invalid email or password" };
    }

    // Create session
    await createSession(user.id);

    return {
      success: true,
      user: { id: user.id, email: user.email, name: user.name },
    };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, error: "Login failed" };
  }
}

async function createSession(userId: number): Promise<void> {
  const sessionToken = generateSessionToken();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30); // 30 days

  await supabase.from("user_sessions").insert([
    {
      user_id: userId,
      session_token: sessionToken,
      expires_at: expiresAt.toISOString(),
    },
  ]);

  // Store session token in localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem("sessionToken", sessionToken);
  }
}

function generateSessionToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export async function getCurrentUser(): Promise<User | null> {
  if (typeof window === "undefined") return null;

  const sessionToken = localStorage.getItem("sessionToken");
  if (!sessionToken) return null;

  try {
    const { data: session } = await supabase
      .from("user_sessions")
      .select("user_id, expires_at")
      .eq("session_token", sessionToken)
      .single();

    if (!session || new Date(session.expires_at) < new Date()) {
      localStorage.removeItem("sessionToken");
      return null;
    }

    const { data: user } = await supabase
      .from("users")
      .select("id, email, name")
      .eq("id", session.user_id)
      .single();

    return user;
  } catch {
    return null;
  }
}

export async function logoutUser(): Promise<void> {
  if (typeof window === "undefined") return;

  try {
    // Sign out from Supabase Auth (for Google login users)
    await supabase.auth.signOut();

    // Remove custom session data
    const sessionToken = localStorage.getItem("sessionToken");
    if (sessionToken) {
      await supabase
        .from("user_sessions")
        .delete()
        .eq("session_token", sessionToken);
    }
  } catch (error) {
    console.error("Logout error:", error);
  }

  // Clear all auth-related data from localStorage
  localStorage.removeItem("sessionToken");
  localStorage.removeItem("user");
  localStorage.removeItem("cart-storage"); // Clear cart data

  // Clear all localStorage to ensure complete logout
  localStorage.clear();
}

export async function resetPassword(
  email: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Use HTTPS for production, keep HTTP for localhost dev
    const origin = window.location.origin;
    const isLocalhost =
      origin.includes("localhost") || origin.includes("127.0.0.1");
    const secureOrigin = isLocalhost
      ? origin
      : origin.replace(/^http:/, "https:");
    const redirectUrl = `${secureOrigin}/reset-password`;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl, // HTTP for localhost, HTTPS for production
    });

    if (error) {
      console.error("Password reset error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Password reset error:", error);
    return { success: false, error: "Failed to send reset email" };
  }
}

export async function updatePassword(
  newPassword: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error("Password update error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Password update error:", error);
    return { success: false, error: "Failed to update password" };
  }
}
