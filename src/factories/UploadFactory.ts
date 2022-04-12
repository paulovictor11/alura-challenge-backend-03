const UploadFactory = () => {
    const handle = async (file: File): Promise<void> => {
        console.log('filename', file.name);
        console.log('filesize', file.size);
    }

    return {
        handle
    }
}

export default UploadFactory;