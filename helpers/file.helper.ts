import { GetSignedUrlConfig, Storage } from "@google-cloud/storage";

import path from "path";
import { uuid } from "uuidv4";

const storage = new Storage({
  keyFilename: path.join(
    process.cwd(),
    "possible-origin-422618-j0-0aa4557cb7b8.json"
  ),
  projectId: "possible-origin-422618-j0",
});

const bucketName = "scholaria-datalake";
export const bucket = storage.bucket(bucketName);

export const uploadFile = async (path: string) => {
  const fileDestination = `files/${uuid()}`;
  const res = await bucket.upload(path, {
    destination: fileDestination,
  });

  const file = bucket.file(fileDestination);

  const options: GetSignedUrlConfig = {
    version: "v4",
    action: "write",
    expires: "1y",
  };

  const [url] = await file.getSignedUrl(options);

  return url;
};
