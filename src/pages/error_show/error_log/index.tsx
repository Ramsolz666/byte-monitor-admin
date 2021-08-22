import React, { useEffect, useState } from 'react'
import './index.less'
import { Table,Select } from 'antd';
import api from '@/api';

const New: React.FC = React.memo(() => {
    const { Option } = Select;
    const [tableData, setTableData] = useState([])
    const [ItemList,setItem]=useState([])
    function onChange(value) {
        api.getItems(
        {"app_id":value,
        "skip": 0,
        "limit": 2
        }).then(res=>
          setItem(res.data.ItemList)).catch(e=>console.log(e))
      }
      

      const getAllApp = () => {
        api.getAllApp({ admin_name: 'admin' }).then(res => {
            if (res.status === 200) {
              setTableData(res.data.map(item => {
                return {
                  ...item,
                  key: item._id
                }
              }))
            }
          }
        ).catch(err => {
          console.error(err)
        })
      }

      function onSearch(val) {
        console.log(val)
      }
      
      useEffect(()=>getAllApp()
    , [])

      
      function NestedTable() {
        const expandedRowRender = (record, index, indent, expanded) => {
          console.log(index)
          const columns = [
            { title: '_id', dataIndex: '_id', key: '_id' },
            { title: 'error_row', dataIndex: 'error_row', key: 'error_row' },
            { title: 'error_col', dataIndex: 'error_col', key: 'error_col' },
          ];
          return <Table columns={columns} pagination={false} />;
        };
          const columns = [
            { title: 'app_id', dataIndex: 'app_id', key: 'app_id' },
            { title: 'type', dataIndex: 'type', key: 'type' },
            { title: 'error_info', dataIndex: 'error_info', key: 'error_info' },
            { title: "error_url", dataIndex: "error_url", key: "error_url" },
            { title: "amount", dataIndex: "amount", key: "amount" },
            { title: "time", dataIndex: "time", key: "time" },
          ];
        return (
          <Table
            className="components-table-demo-nested"
            columns={columns}
            dataSource={ItemList}
            expandable={{ expandedRowRender }}
          />
        );
      }
  return (
      <div>
        <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}>
            {tableData.map(item=>{
              return (<Option value={item['app_id']}>{item['app_id']}</Option>)
                })}        
        </Select>
          <NestedTable />
      </div>
    
    
  )
})
 
export default New
