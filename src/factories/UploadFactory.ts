import baseUrl from "../lib/axios";

export type UploadFileResponse = {
    message: string;
}

const UploadFactory = () => {
    const handle = async (file: File): Promise<UploadFileResponse> => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const { data } = await baseUrl.post<UploadFileResponse>('/upload-file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return data;
        } catch (err: any) {
            throw new Error(err.response.data.message);
        }
    }

    return {
        handle
    }
}

export default UploadFactory;