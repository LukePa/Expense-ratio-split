import fs from "fs"
import getStatePath from "./getStatePath.js";
import { getBlobStorageContainer } from "./getBlobStorageContainer.js";

export async function uploadStateToBlob(state) {
    const container = await getBlobStorageContainer();
    const file = Buffer.from(typeof state === "string" ? state : JSON.stringify(state), "utf8");

    const blockBlobClient = container.getBlockBlobClient("state.json");
    await blockBlobClient.upload(file, file.byteLength);
}