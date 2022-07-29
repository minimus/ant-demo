export interface IResponseData {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export interface IResponseDataKey extends IResponseData {
    key: number;
}

export interface IColumns {
    title: string;
    dataIndex: string;
    key: string;
}

