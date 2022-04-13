import baseUrl from "../lib/axios";

const UploadFactory = () => {
    const handle = async (file: File): Promise<void> => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            await baseUrl.post('/upload-file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
        } catch (err: any) {
            throw new Error(err.response.data.message);
        }
    }

    return {
        handle
    }
}

export default UploadFactory;