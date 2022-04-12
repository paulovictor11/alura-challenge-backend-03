import {
    Button,
    Input,
    InputGroup,
    InputLeftAddon,
    Text,
    useToast,
} from '@chakra-ui/react';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useMutation } from 'react-query';
import UploadFactory from '../../factories/UploadFactory';

const UploadFile = () => {
    const toast = useToast();
    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);

    const { handle } = UploadFactory();
    const { mutate, isLoading } = useMutation(handle, {
        onSuccess: () => {
            toast({
                title: 'Transações importadas com sucesso',
                status: 'success',
                isClosable: true,
                position: 'top-right',
                variant: 'left-accent',
            });
        },
        onError: () => {
            toast({
                title: 'Erro ao importar transações',
                status: 'error',
                isClosable: true,
                position: 'top-right',
                variant: 'left-accent',
            });
        }
    })

    const handleClick = () => {
        hiddenFileInput.current?.click();
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const fileUploaded = event.target.files![0] as File;
        setFile(fileUploaded);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!file) {
            toast({
                title: 'Por favor, selecione um arquivo',
                status: 'info',
                isClosable: true,
                position: 'top-right',
                variant: 'left-accent',
            });
            return;
        }

        mutate(file);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="file"
                style={{ display: 'none' }}
                ref={hiddenFileInput}
                onChange={handleChange}
            />
            <Text textAlign="center" fontSize="4xl" fontWeight="bold" mb={2}>
                IMPORTAR TRANSAÇÕES
            </Text>
            <InputGroup>
                <InputLeftAddon>
                    <Button
                        colorScheme="gray"
                        variant="link"
                        onClick={handleClick}>
                        Selecione
                    </Button>
                </InputLeftAddon>
                <Input placeholder={file?.name ?? "No file chosen"} isReadOnly />
            </InputGroup>
            <Text color="gray" fontSize="sm" fontWeight="semibold">
                Selecione o arquivo para realizar o upload
            </Text>
            <Button colorScheme="blue" mt={5} type="submit" isLoading={isLoading}>
                Importar
            </Button>
        </form>
    );
};

export default UploadFile;
