/* eslint-disable react/prop-types */
import { Button, notification, Table } from 'antd';
import { removeWaterMark } from '../util/APIUtils';
import { useEffect, useState } from 'react';

export default function AddTable(props) {
  const [examKey, setExamKey] = useState();
  const [waterMarkList, setWaterMarkList] = useState([]);

  const handleProcess = (examKey) => {
    // setLoading(true);
    props.setLoading(true);
    setExamKey(examKey);
    removeWaterMark(examKey).then(() => {
      // setLoading(false);
      props.loadData();
      setExamKey();
      notification.open({
        message: 'success',
      });
    });
  };

  useEffect(() => {
    let waterMarkList1 = props.tableData.filter((ex) => ex.status === 'EXAM');
    setWaterMarkList(waterMarkList1);
  }, [props.loading, props.tableData]);


  let columns = [];
  if (props.tableData.length > 0) {
    columns = props.formData.formItemList.map((k) => {
      let name = '';
      k.name.split('_').forEach((nm) => (name += ' ' + nm));
      name = name.trim().toUpperCase();
      let rowData = {
        title: name,
        dataIndex: k.name,
        key: k.name,
        sorter: (a, b) => (k.type === 'inputNumber' ? a[k.name] - b[k.name] : a[k.name].localeCompare(b[k.name])),
        sortDirections: ['descend', 'ascend'],
      };
      if (k.type === 'file') {
        rowData.render = (text) => <a href={text}>Download</a>;
      }
      return rowData;
    });
  }
  columns.push({
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  });

  columns.push({
    title: 'PROCESS',
    dataIndex: 'key',
    key: 'key',
    render: (text, record) => (
      <Button
        disabled={record.status !== 'EXAM'}
        loading={props.loading && examKey === text}
        type="primary"
        onClick={() => handleProcess(text)}>
        PROCESS
      </Button>
    ),
  });

  return (
    <>
      <Table
        style={{ width: '100%' }}
        columns={columns}
        dataSource={waterMarkList}
        loading={props.loading && !examKey}
        hasData={waterMarkList.length === 0 ? false : true}
      />
    </>
  );
}
