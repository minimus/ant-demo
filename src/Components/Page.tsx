import React, {useEffect, useState} from "react";
import {getData} from "../data/data";
import {IResponseData} from "../types/data";
import {Table} from "antd";
import type {ColumnsType} from 'antd/es/table'
import {RightAlignedColumn} from "../styles";

const columns: ColumnsType<IResponseData> = [
    {
        title: 'Post ID',
        dataIndex: 'id',
        key: 'id',
        width: 100,
        render: (text, record, index) => (<RightAlignedColumn>{text}</RightAlignedColumn>),
    },
    {title: 'Title', dataIndex: 'title', key: 'title', ellipsis: true, width: '30%'},
    {title: 'Body', dataIndex: 'body', key: 'body', ellipsis: true},
    {
        title: 'User ID',
        dataIndex: 'userId',
        key: 'userId',
        width: 100,
        render: (text, record, index) => (<RightAlignedColumn>{text}</RightAlignedColumn>),
    },
];

const Page = () => {
    const [dataSource, setDataSource] = useState<IResponseData[]>([])

    useEffect(() => {
        getData().then(data => setDataSource(data))
    }, []);

    return (
        <>
            <Table dataSource={dataSource} columns={columns}/>
        </>
    )
}

export default Page;
