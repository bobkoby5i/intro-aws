import { S3Client, PutObjectCommand, CreateBucketCommand } from "@aws-sdk/client-s3";

const params = {
    Region: "eu-central-1",
    Bucket: "koby5itrainmarch07",
    Key: "plik.txt",
    Body:"Treść pliku"
};

const run = async () => {
    const s3Client = new S3Client({ region: params.Region });
    try {
    const data = await s3Client.send(new CreateBucketCommand({ Bucket: params.Bucket }));
    console.log(data);
    console.log("Pomyślnie utworzono bucket ", data.Location);
    const results = await s3Client.send(new PutObjectCommand(params));
    console.log(results);
    console.log("Pomyślnie utworzono obiekt " + params.Key +
                " i przesłałem go do " + params.Bucket +
                "/" + params.Key
                );
    } catch (err) {
        console.log("Error", err);
    }
};
run();