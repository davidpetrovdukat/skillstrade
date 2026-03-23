export const MONGO_FILE_PREFIX = 'mongo-file:';

export function isAbsoluteUrl(value: string) {
    return /^https?:\/\//i.test(value);
}

export function buildMongoFileReference(fileId: string, filename?: string) {
    return `${MONGO_FILE_PREFIX}${fileId}${filename ? `/${encodeURIComponent(filename)}` : ''}`;
}

export function parseMongoFileReference(value: string) {
    if (!value.startsWith(MONGO_FILE_PREFIX)) {
        return null;
    }

    const raw = value.slice(MONGO_FILE_PREFIX.length);
    const [fileId, encodedFilename] = raw.split('/', 2);

    if (!fileId) {
        return null;
    }

    return {
        fileId,
        filename: encodedFilename ? decodeURIComponent(encodedFilename) : undefined,
    };
}

export function getOrderFileDownloadPath(storedPath: string) {
    const mongoFile = parseMongoFileReference(storedPath);
    if (mongoFile) {
        return `/api/order-files/${mongoFile.fileId}`;
    }

    return storedPath;
}
