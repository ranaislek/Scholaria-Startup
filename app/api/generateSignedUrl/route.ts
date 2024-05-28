import { GetSignedUrlConfig, Storage } from "@google-cloud/storage";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import path from "path";

const storage = new Storage({
  keyFilename: path.join(
    process.cwd(),
    "possible-origin-422618-j0-0aa4557cb7b8.json"
  ),
  projectId: "possible-origin-422618-j0",
});

const bucketName = "scholaria-datalake";
export const bucket = storage.bucket(bucketName);

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
