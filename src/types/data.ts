import { FilterConfirmProps } from 'antd/es/table/interface'
import { Key } from 'react'

export interface IResponseData {
    id: number;
    title: string;
    body: string;
    userId: number;
}

export type TColumnFilters = Array<{ text: JSX.Element, value: number | string | boolean }>

export type TDataIndex = keyof IResponseData

export interface ISearchPanel {
    dataIndex: TDataIndex
    setSelectedKeys: (keys: string[]) => void
    selectedKeys: Key[]
    confirm: (param?: FilterConfirmProps) => void
    clearFilters?: () => void
    handleSearch: (selectedKeys: string[], confirm: (param?: FilterConfirmProps) => void, dataIndex: TDataIndex) => void
    handleReset: (cleaFilters: () => void) => void
    setSearchText: (text: string) => void
    setSearchedColumn: (column: TDataIndex) => void
}

