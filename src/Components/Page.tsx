import React, { useEffect, useState } from 'react'
import { getData } from '../data/data'
import { IResponseData, TColumnFilters } from '../types/data'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { RightAlignedColumn } from '../styles'

const Page = () => {
    const getColumns = (filters: TColumnFilters): ColumnsType<IResponseData> => [
        {
            title: 'Post ID',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            sorter: (a, b) => a.id - b.id,
            render: (text) => (<RightAlignedColumn>{text}</RightAlignedColumn>),
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            ellipsis: true,
            width: '30%',
            sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
            title: 'Body',
            dataIndex: 'body',
            key: 'body',
            ellipsis: true,
            sorter: (a, b) => a.body.localeCompare(b.body),
        },
        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
            width: 120,
            sorter: (a, b) => a.userId - b.userId,
            filters,
            filterSearch: true,
            onFilter: (value, record: IResponseData) => record.userId === value,
            render: (text) => (<RightAlignedColumn>{text}</RightAlignedColumn>),
        },
    ]

    const [dataSource, setDataSource] = useState<IResponseData[]>([])
    const [userFilters, setUserFilters] = useState<TColumnFilters>([])
    const [columns, setColumns] = useState<ColumnsType<IResponseData>>(getColumns([]))

    useEffect(() => {
        getData().then(data => setDataSource(data))
    }, [])

    useEffect(() => {
        if (dataSource.length) {
            const userIds: number[] = dataSource.reduce((acc: number[], curr) => acc.includes(curr.userId) ? acc : [...acc, curr.userId], [])
            setUserFilters(userIds.map(item => ({
                text: <span>{item}</span>,
                value: item,
            })))
        }
    }, [dataSource])

    useEffect(() => {
        if (userFilters.length) {
            setColumns(getColumns(userFilters))
        }
    }, [userFilters])

    return (
        <>
            <Table rowKey={record => record.id} dataSource={dataSource} columns={columns}/>
        </>
    )
}

export default Page
