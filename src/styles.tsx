import styled from 'styled-components'
import { Header, Content } from 'antd/es/layout/layout'

export const HeaderRoot = styled(Header)`
  display: flex;
  align-items: center;
  height: 50px;
  box-sizing: border-box;
  padding: 5px 10px;
  color: #c5e8f1;
  border-bottom: 1px solid #dedede;
`

export const ContentRoot = styled(Content)`
  padding: 10px;
`

export const RightAlignedColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 100%;
`