import { Container } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import UploadFile from '../src/components/UploadFile';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Challlenge 03 - Início</title>
            </Head>
            <Container maxW="1120px" my={6}>
                <UploadFile />
            </Container>
        </>
    );
};

export default Home;
