import React, { useEffect, useState, useRef } from 'react'
import { getData } from '../data/data'
import { IResponseData, TColumnFilters, TDataIndex } from '../types/data'
import { InputRef, Table } from 'antd'
// @ts-ignore
import Highlighter from 'react-highlight-words'
import { RightAlignedColumn } from '../styles'
import Column from 'antd/es/table/Column'
import { FilterConfirmProps } from 'antd/es/table/interface'
import SearchPanel from './SearchPanel'
import { SearchOutlined } from '@ant-design/icons'

const Page = () => {
    const [dataSource, setDataSource] = useState<IResponseData[]>([])
    const [userFilters, setUserFilters] = useState<TColumnFilters>([])

    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef<InputRef>(null)

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: TDataIndex,
    ) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }

    const handleReset = (clearFilters: () => void) => {
        clearFilters()
        setSearchText('')
    }

    const raRenderer = (text: string): JSX.Element => (<RightAlignedColumn>{text}</RightAlignedColumn>)

    const filterIcon = (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }}/>
    )

    const onTitleFilter = (value: number | string | boolean, record: IResponseData) => record.title
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase())

    const onFilterDropdownVisibleChange = (visible: boolean) => {
        if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
        }
    }

    const titleRenderer = (text: string) =>
        searchedColumn === 'title' ? (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
            />
        ) : (
            text
        )

    const onUserFilter = (value: number | string | boolean, record: IResponseData) => record.userId === value

    useEffect(() => {
        getData().then(data => setDataSource(data))
    }, [])

    useEffect(() => {
        if (dataSource.length) {
            const userIds: number[] =
                dataSource.reduce((acc: number[], curr) => acc.includes(curr.userId) ? acc : [...acc, curr.userId], [])
            const currUserFilters = userIds.map(item => ({
                text: <span>{item}</span>,
                value: item,
            }))
            setUserFilters(currUserFilters)
        }
    }, [dataSource])

    return (
        <>
            <Table rowKey={record => record.id} dataSource={dataSource}>
                <Column
                    title="Post ID"
                    dataIndex="id"
                    key="id"
                    width={100}
                    sorter={(a: IResponseData, b: IResponseData) => a.id - b.id}
                    render={raRenderer}
                />
                <Column
                    title="Title"
                    dataIndex="title"
                    key="title"
                    ellipsis={true}
                    width="30%"
                    sorter={(a: IResponseData, b: IResponseData) => a.title.localeCompare(b.title)}
                    filterDropdown={({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                        <SearchPanel
                            ref={searchInput}
                            dataIndex={'title'}
                            setSelectedKeys={setSelectedKeys}
                            selectedKeys={selectedKeys}
                            confirm={confirm}
                            clearFilters={clearFilters}
                            handleSearch={handleSearch}
                            handleReset={handleReset}
                            setSearchText={setSearchText}
                            setSearchedColumn={setSearchedColumn}
                        />
                    )}
                    filterIcon={filterIcon}
                    onFilter={onTitleFilter}
                    onFilterDropdownVisibleChange={onFilterDropdownVisibleChange}
                    render={titleRenderer}
                />
                <Column
                    title="Body"
                    dataIndex="body"
                    key="body"
                    ellipsis={true}
                    sorter={(a: IResponseData, b: IResponseData) => a.body.localeCompare(b.body)}
                />
                <Column
                    title="User ID"
                    dataIndex="userId"
                    key="userId"
                    width={120}
                    sorter={(a: IResponseData, b: IResponseData) => a.userId - b.userId}
                    filters={userFilters}
                    filterSearch={true}
                    onFilter={onUserFilter}
                    render={raRenderer}
                />
            </Table>
        </>
    )
}

export default Page
