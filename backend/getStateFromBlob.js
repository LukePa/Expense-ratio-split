import { getBlobStorageContainer } from "./getBlobStorageContainer.js";
import getStatePath from "./getStatePath.js"

export async function getStateFromBlob() {
    const container = await getBlobStorageContainer();
    const blockBlobClient = container.getBlockBlobClient("state.json")
    const contentsResponse = await blockBlobClient.download(0);
    return JSON.parse(await streamToText(contentsResponse.readableStreamBody));
}

async function streamToText(readable) {
  readable.setEncoding('utf8');
  let data = '';
  for await (const chunk of readable) {
    data += chunk;
  }
  return data;
}