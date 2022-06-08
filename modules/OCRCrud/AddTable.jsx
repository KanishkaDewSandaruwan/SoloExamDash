/* eslint-disable react/prop-types */
import { Button, notification, Table, Steps, Row } from 'antd';
import { ocr } from '../util/APIUtils';
import { useEffect, useState } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import { useRouter } from 'next/router';

const { Step } = Steps;

export default function AddTable(props) {

  const [examKey, setExamKey] = useState();
  const [ocrlist, setOCRList] = useState([]);
  const router = useRouter();

  const handleProcess = (examKey) => {
    router.push('/parallalcorpus/' + examKey);
  };

  useEffect(() => {
    let ocr1 = props.tableData.filter((ex) => ex.status === 'WATERMARKED');
    setOCRList(ocr1);
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
        disabled={record.status !== 'WATERMARKED'}
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
        dataSource={ocrlist}
        loading={props.loading && !examKey}
        hasData={ocrlist.length === 0 ? false : true}
      />
    </>
  );
}
