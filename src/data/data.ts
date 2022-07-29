import axios from "axios";
import { IResponseData, IResponseDataKey } from "../types/data";

export const getData = async (): Promise<IResponseDataKey[]> => {
    try {
        const { data, status } = await axios.get('https://jsonplaceholder.typicode.com/posts');
        if (status === 200) return data.map((item: IResponseData) => ({ key: item.id, ...item }));
        return [];
    } catch (e: unknown) {
        return [];
    }
}