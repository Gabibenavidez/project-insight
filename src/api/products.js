import axios from 'axios';

export const getProducts = async () => {
    const { data } = await axios.get("https://dummyjson.com/products?limit=5");
    return data.products;
}