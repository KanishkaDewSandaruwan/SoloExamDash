import React, { useState, useEffect } from 'react';
import { getOcr } from '../util/APIUtils';
// import { ContentState, EditorState } from 'draft-js';
import { ContentState, EditorState } from "draft-js";
import { convertFromRaw, convertToRaw } from 'draft-js';
// import { Editor } from "react-draft-wysiwyg";
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import dynamic from 'next/dynamic';
import "./ParallalCorpus.module.css"

import { Layout, Row, Button, Steps, Spin, Typography } from 'antd';
import { LoadingOutlined, SaveOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Step } = Steps;

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)

export default function ParallalCorpus(props) {

  const [examKey, setexamKey] = useState();
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState()
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    setexamKey(props.id);
  }, [props.id]);

  useEffect(() => {
    setLoading(true)
    loadData()
  }, [])



  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
  }


  const loadData = () => {
    getOcr(props.id)
      .then(res => {
        setData(res);
        setLoading(false)
        const content = ContentState.createFromText(res.responses[0].fullTextAnnotation.text);
        setEditorState(EditorState.createWithContent(content))
      })

  }


  useEffect(() => {
    if (page !== 0) {
      const content = ContentState.createFromText(data.responses[page].fullTextAnnotation.text);
      setEditorState(EditorState.createWithContent(content))

    }
  }, [page])





  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
  if (loading) {
    return <div style={{ marginTop: '40px' }}><h3>Loading OCR Data ...</h3></div>
  }

  return (
    <>
      <Layout style={{ marginTop: '50px', padding: '1%' }}>

        <Row>
          <Steps current={page}>
            {data.responses.map(d => <Step title={d.context.pageNumber} description={d.context.pageNumber} />)}
          </Steps>


        </Row>
        <Row justify="space-around"><Button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</Button> <Button onClick={() => setPage(page + 1)} disabled={page === data.responses.length - 1}>Next</Button> </Row>
        <Row>
          <Title style={{ padding: '1%', marginTop: '20px' }} level={2}>Solo Exam OCR Editor</Title>
        </Row>
        <Row>
          <div style={{backgroundColor:"white"}}>
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="soloexam-editor"

            // wrapperClassName="wrapper-class"
            // editorClassName="editor-class"
            // toolbarClassName="toolbar-class"
            // wrapperStyle={<wrapperStyleObject/>}
            // editorStyle={<editorStyleObject/>}
            // toolbarStyle={<toolbarStyleObject/>}

          />
          </div>


        </Row>

        <Row style={{ marginTop: '30px' }}>
          <Button type="primary">
            Save
            {<SaveOutlined />}
          </Button>
        </Row>
      </Layout>
    </>
  );
}