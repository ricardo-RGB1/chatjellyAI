'use client';
import { useEffect, useState } from 'react';
import ProModal from './pro-modal';

// ModalProvider is used to avoid SSR issues and to make sure that the modal is mounted
const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) return null;

    return ( 
        <ProModal />
     );
}
 
export default ModalProvider;