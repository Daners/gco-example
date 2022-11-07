/* function main(bucketName = "my-bucket") {

  const { Storage } = require("@google-cloud/storage");

  const storage = new Storage();

  async function listFiles() {
    const [files] = await storage.bucket(bucketName).getFiles();

    console.log("Files:");
    files.forEach((file) => {
      console.log(file.name);
    });
  }

  listFiles().catch(console.error);
}
main(...process.argv.slice(2));
 */

const path = require("path");
const cwd = path.join(__dirname);
const { Storage } = require("@google-cloud/storage");
const storage = new Storage();

const express = require("express");
const app = express();
const port = 4000;

app.get("/:doc", async (req, res) => {
  const doc = req.params.doc;

  await storage
    .bucket("cf-chatbot-pre")
    .file(doc)
    .createReadStream() //stream is created
    .pipe(res)
    .on("finish", () => {
      // The file download is complete
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/* function main(
  bucketName = "my-bucket",
  fileName = "test.txt",
  destFileName = path.join(cwd, fileName)
) {
  const { Storage } = require("@google-cloud/storage");

  const storage = new Storage();

  async function downloadFile() {
    const options = {
      destination: destFileName,
    };

    await storage.bucket(bucketName).file(fileName).download(options);

    console.log(
      `gs://${bucketName}/${fileName} downloaded to ${destFileName}.`
    );
  }

  downloadFile().catch(console.error);
}
main(...process.argv.slice(2)); */
