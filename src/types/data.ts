export interface IResponseData {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export type TColumnFilters = Array<{ text: JSX.Element, value: number | string | boolean }>

