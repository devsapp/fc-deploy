export const CONTEXT = 'FC-DEPLOY';

export const useFcBackend = process.env.BUILD_IMAGE_ENV === 'fc-backend';

export const useBaseUploadCodeSize = 50 * 1024 * 1024;
