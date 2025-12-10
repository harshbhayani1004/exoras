import { supabase } from "./supabase";

const STORAGE_BUCKET = "Exora";
const STORAGE_URL =
  "https://ysrdptrgpxpdohzgcniy.supabase.co/storage/v1/object/public";
const S3_URL = "https://ysrdptrgpxpdohzgcniy.storage.supabase.co/storage/v1/s3";

/**
 * Get public URL for an image in storage
 */
export function getImageUrl(path: string, useS3 = false): string {
  if (!path) return "";

  // If path is already a full URL, return it
  if (path.startsWith("http")) return path;

  // Remove leading slash if present
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  if (useS3) {
    return `${S3_URL}/${STORAGE_BUCKET}/${cleanPath}`;
  }

  return `${STORAGE_URL}/${STORAGE_BUCKET}/${cleanPath}`;
}

/**
 * Upload an image to storage
 */
export async function uploadImage(
  file: File,
  path?: string
): Promise<{ url: string; path: string } | null> {
  try {
    const fileName = path || `${Date.now()}-${file.name}`;

    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Error uploading image:", error);
      return null;
    }

    return {
      path: data.path,
      url: getImageUrl(data.path),
    };
  } catch (err) {
    console.error("Unexpected error uploading image:", err);
    return null;
  }
}

/**
 * Delete an image from storage
 */
export async function deleteImage(path: string): Promise<boolean> {
  try {
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([path]);

    if (error) {
      console.error("Error deleting image:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Unexpected error deleting image:", err);
    return false;
  }
}

/**
 * List all images in storage
 */
export async function listImages(folder = ""): Promise<string[]> {
  try {
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .list(folder);

    if (error) {
      console.error("Error listing images:", error);
      return [];
    }

    return data.map((file) => file.name);
  } catch (err) {
    console.error("Unexpected error listing images:", err);
    return [];
  }
}
