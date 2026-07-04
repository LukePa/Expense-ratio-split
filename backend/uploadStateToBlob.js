import fs from "fs"
import getStatePath from "./getStatePath.js";
import { getBlobStorageContainer } from "./getBlobStorageContainer.js";

export async function uploadStateToBlob(state) {
    const container = await getBlobStorageContainer();
    const file = typeof state === "string" ? state : JSON.stringify(state);

    const blockBlobClient = container.getBlockBlobClient("state.json");
    await blockBlobClient.upload(file, file.length);
}