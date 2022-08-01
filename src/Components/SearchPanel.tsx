import React, { forwardRef, ForwardedRef } from 'react'
import { Button, Input, InputRef, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { ISearchPanel } from '../types/data'

const SearchPanel = forwardRef((props: ISearchPanel, ref: ForwardedRef<InputRef>) => {
        const {
            dataIndex,
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            handleSearch,
            handleReset,
            setSearchText,
            setSearchedColumn,
        } = props
        return (<div style={{ padding: 8 }}>
            <Input
                ref={ref}
                placeholder={`Search ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                style={{ marginBottom: 8, display: 'block' }}
            />
            <Space>
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    icon={<SearchOutlined/>}
                    size="small"
                    style={{ width: 90 }}
                >
                    Search
                </Button>
                <Button
                    onClick={() => clearFilters && handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    Reset
                </Button>
                <Button
                    type="link"
                    size="small"
                    onClick={() => {
                        confirm({ closeDropdown: false })
                        setSearchText((selectedKeys as string[])[0])
                        setSearchedColumn(dataIndex)
                    }}
                >
                    Filter
                </Button>
            </Space>
        </div>)

    },
)

export default SearchPanel