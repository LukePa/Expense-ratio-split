import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from '@azure/identity';

export async function getBlobStorageContainer() {
    try {
        const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
        if (!accountName) throw Error('Azure Storage accountName not found');

        const credential = new DefaultAzureCredential();
        const blobServiceClient = new BlobServiceClient(
            `https://${accountName}.blob.core.windows.net`,
            credential
        );

        const containerClient = blobServiceClient.getContainerClient("data");
        return containerClient;
    }
    catch (e) {
        throw e;
    }
}