import axios from "axios";
import {IResponseData} from "../types/data";

export const getData = async (): Promise<IResponseData[]> => {
    try {
        const { data, status } = await axios.get('https://jsonplaceholder.typicode.com/posts');
        if (status === 200) return data;
        return [];
    } catch (e: unknown) {
        return [];
    }
}