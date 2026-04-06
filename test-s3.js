import { S3Client, CreateBucketCommand, ListBucketsCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    endpoint: 'http://127.0.0.1:4566',
    region: 'us-east-1',
   credentials: { 
    accessKeyId: "test", 
    secretAccessKey: "test" 
  },
    forcePathStyle: true,
});

async function run() {
    try {
        await s3Client.send(new CreateBucketCommand({Bucket: 'janitha-bucket'}));
        console.log("Bucket Successfully Created...");

        const data = await s3Client.send(new ListBucketsCommand({}));
        console.log("📁 Your Buckets:", data.Buckets.map(b => b.Name));
    }catch (error) {
        console.log('error: ', error);
    }
}

run();