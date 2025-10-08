import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getProducts = async () => {
    const { data } = await axios.get('https://dummyjson.com/products?limit=6');
    return data.products;
};

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    });
};