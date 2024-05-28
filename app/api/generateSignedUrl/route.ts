import { GetSignedUrlConfig, Storage } from "@google-cloud/storage";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  credentials: {
    client_email: process.env.GCLOUD_CLIENT_EMAIL,
    private_key: process.env.GCLOUD_PRIVATE_KEY,
  },
});

const bucketName = "scholaria-datalake";

export async function POST(request: Request) {
  const { fileType } = await request.json();
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(uuidv4());

  const options: GetSignedUrlConfig = {
    version: "v4",
    action: "write",
    expires: Date.now() + 15 * 60 * 1000,
    contentType: fileType,
  };
  const [url] = await file.getSignedUrl(options);
  const publicUrl = file.publicUrl();
  const response = NextResponse.json({ url, publicUrl, fileName: file.name });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return response;
}
