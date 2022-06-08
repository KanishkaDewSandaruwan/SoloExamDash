/* eslint-disable react/jsx-key */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import {
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  notification,
  Modal,
  DatePicker,
  AutoComplete,
  Space,
  Upload,
} from 'antd';
import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import { add, edit, getMaxId, uniqueCheck, remove_key, getAll } from '../util/APIUtils';
import 'react-phone-input-2/lib/style.css';
import countries from './country.json';
import moment from 'moment';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import deepEqual from '../util/Utils';
import { file_upload } from '../../@jumbo/constants/Endpoints';

const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const normFile = (e) => {
  console.log('Upload event:', e && e.fileList);
  if (e.fileList.filter((f) => f.name === e.file.name).length > 1) {
    let fileList = e.fileList.filter((f) => f.name !== e.file.name);
    fileList.push(e.file);
    e.fileList = fileList;
  }
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

export default function AddForm(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  // const [maxId, setMaxId] = useState(null);
  const [optionList, setOptionList] = useState({});
  const [form1List, setForm1List] = useState({});

  const showModal = () => {
    if (props.formData.optionData) {
      let optionData = {};
      let allPromises = props.formData.optionData.map(
        (option) =>
          new Promise((resolve, reject) => {
            getAll(option)
              .then((data) => {
                optionData[option] = data;
                resolve('done');
              })
              .catch((error) => {
                reject();
                return notification['error']({ message: error.message });
              });
          }),
      );

      Promise.all(allPromises).then(() => {
        setOptionList(optionData);
        setIsModalVisible(true);
        if (props.formValues) {
          form.setFieldsValue(props.formValues);
        }
      });
    } else {
      setIsModalVisible(true);
      if (props.formValues) {
        form.setFieldsValue(props.formValues);
      }
    }
  };

  const handleCancel = () => {
    form.resetFields();
    // if (!props.formValues) {
    //   remove_key(props.formData.entityName, maxId);
    // }

    setIsModalVisible(false);
  };
  // const loadKeys = () => {
  //   getMaxId(props.formData.entityName)
  //     .then((max) => {
  //       setMaxId(max);
  //       form.setFieldsValue(getInitialValues(max));
  //     })
  //     .catch((error) =>
  //       notification["error"]({
  //         message: error.message,
  //       })
  //     );
  // };

  const onFinishAdd = (values) => {
    console.log(values);
    props.formData.formItemList.forEach((fi) => {
      if (fi.type === 'file') {
        console.log(fi.name);
        console.log(form1List);
        values[fi.name] = form1List[fi.name];
      }
    });
    setLoading(true);
    // values.key = maxId;
    add(values, props.formData.entityName)
      .then(() => {
        props.loadData();
        setLoading(false);
        setIsModalVisible(false);
        form.resetFields();
        notification['success']({
          message: 'Added Successfully',
        });
      })
      .catch((error) => {
        remove_key(props.formData.entityName, maxId);
        console.log(error);
        setLoading(false);
        notification['error']({
          message: error.message,
        });
      });
  };
  const onFinishEdit = (values) => {
    values.key = props.formValues.key;
    if (deepEqual(values, props.formValues)) {
      notification['warning']({
        message: 'No Changes Made',
      });
    } else {
      setLoading(true);
      edit(values, props.formData.entityName, values.key)
        .then(() => {
          props.loadData();
          setLoading(false);
          form.resetFields();
          setIsModalVisible(false);

          notification['success']({
            message: 'Updated Successfully',
          });
        })
        .catch((error) => {
          setLoading(false);
          notification['error']({
            message: error,
          });
        });
    }
  };

  const getInitialValues = (max) => {
    let initialValue = {};
    props.formData.formItemList.forEach((fd) => {
      initialValue[fd.name] = fd.name + max;
      if (fd.type === 'inputNumber') {
        initialValue[fd.name] = max;
      } else if (fd.type === 'select') {
        initialValue[fd.name] = fd.optionList[0];
      } else if (fd.type === 'email') {
        initialValue[fd.name] = fd.name + max + '@email.com';
      } else if (fd.type === 'phone') {
        initialValue[fd.name] = '+94' + max + '77777';
      } else if (fd.type === 'date') {
        initialValue[fd.name] = moment('2015/01/01', 'YYYY/MM/DD');
      } else if (fd.type === 'country') {
        initialValue[fd.name] = countries[max % countries.length].name;
      } else if (fd.type === 'url') {
        initialValue[fd.name] = 'https://webaddress' + max + '.com';
      }
    });
    return initialValue;
  };

  const getDynamicFormSelect = (childData) => {
    let inputType = (
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder={'Select ' + childData.name}
        optionFilterProp="children"
        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
        {optionList[childData.entityName].map((v) => (
          <Option key={v.key} value={v[childData.valueField]}>
            {v[childData.valueField]}
          </Option>
        ))}
      </Select>
    );
    return inputType;
  };

  const getDynamicFormList = (entityName, children) => {
    console.log('children', children);
    let inputType = (
      <Form.List
        name={entityName}
        rules={[
          {
            validator: async (_, vendors) => {
              if (!vendors || vendors.length < 1) {
                return Promise.reject(new Error('Add least 1' + entityName));
              }
            },
          },
        ]}>
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field) => (
              <Space key={field.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                {children.map((child) => (
                  <Form.Item
                    //   {...formItemLayout}
                    {...field}
                    name={[field.name, child.name]}
                    fieldKey={[field.fieldKey, child.name]}
                    rules={[
                      { required: true, message: 'Missing ' + child.name },
                      {
                        type: child.dataType,
                        message: 'Missing ' + child.name,
                      },
                    ]}>
                    {child.type === 'select' ? getDynamicFormSelect(child) : getFormElement(child.type).inputType}
                  </Form.Item>
                ))}
                <MinusCircleOutlined onClick={() => remove(field.name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ width: 200 }}>
                Add {' ' + entityName}
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
    );
    return inputType;
  };
  const getFormSelect = (entity, value) => {
    return (
      <Select>
        {optionList[entity].map((ops) => (
          <Option key={ops[value].toString()} value={ops[value].toString()}>
            {ops[value]}
          </Option>
        ))}
      </Select>
    );
  };

  function onRemoveFile(type, file) {
    let fl = { ...form1List };
    delete fl[type];
    setForm1List(fl);
  }

  function handleUpload(type, file) {
    const formData = new FormData();
    formData.append('file', file);
    let options = {
      method: 'POST',
      body: formData,
    };
    fetch(file_upload, options)
      .then((response) =>
        response.json().then((json) => {
          let fl = { ...form1List };
          fl[type] = json;
          setForm1List(fl);
        }),
      )
      .catch((error) => console.error(error));

    return false;
  }

  const getFormSelect1 = (options) => {
    return (
      <Select>
        {options.map((ops) => (
          <Option key={ops} value={ops}>
            {ops}
          </Option>
        ))}
      </Select>
    );
  };

  const getUploadFD = (fieldName) => {
    return (
      <Form.Item
        label={fieldName.toUpperCase()}
        name={fieldName}
        valuePropName="fileList"
        getValueFromEvent={normFile}
        rules={[{ required: false }]}>
        <Upload onRemove={(file) => onRemoveFile(fieldName, file)} beforeUpload={(file) => handleUpload(fieldName, file)}>
          <Button icon={<UploadOutlined />}>{'Upload ' + fieldName}</Button>
        </Upload>
      </Form.Item>
    );
  };

  const getFormElement = (type) => {
    let inputType = '';
    let dataType = 'string';

    if (type === 'input') {
      inputType = <Input />;
    } else if (type === 'inputNumber') {
      inputType = <InputNumber />;
      dataType = 'number';
    } else if (type === 'password') {
      inputType = <Input.Password />;
      dataType = 'string';
    } else if (type === 'email') {
      inputType = <Input />;
      dataType = 'email';
    } else if (type === 'phone') {
      inputType = <PhoneInput enableSearch />;
    } else if (type === 'date') {
      inputType = <DatePicker />;
      dataType = 'date';
    } else if (type === 'country') {
      inputType = (
        <Select
          showSearch
          placeholder="Select a country"
          optionFilterProp="children"
          autoComplete="off"
          filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
          {countries.map((country) => (
            <Option key={country.name} value={country.name}>
              {country.name}
            </Option>
          ))}
        </Select>
      );
    } else if (type === 'url') {
      inputType = <Input />;
      dataType = 'url';
    }

    return { inputType, dataType };
  };

  const getFormItems = () => {
    let formItemList = props.formData.formItemList.map((fd) => {
      let name = '';
      let inputType = '';
      let dataType = 'string';
      if (fd.type === 'dynamic') {
        inputType = getDynamicFormList(fd.name, fd.children);
        dataType = 'objet';
      } else if (fd.type === 'select1') {
        inputType = getFormSelect1(fd.options);
      } else if (fd.type === 'select') {
        inputType = getFormSelect(fd.name, fd.value);
      } else if (fd.type === 'file') {
        inputType = getUploadFD(fd.name);
        return inputType;
      } else {
        inputType = getFormElement(fd.type).inputType;
        dataType = getFormElement(fd.type).dataType;
      }

      fd.name.split('_').forEach((nm) => (name = name + ' ' + nm));
      name = name.trim().toUpperCase();

      let rulesList = [
        {
          required: fd.required,
          message: 'Please input ' + name + '!',
        },
        {
          type: dataType,
          message: 'Wrong data type!',
        },
      ];
      if (fd.type === 'dynamic') {
        rulesList = [];
      }
      if (props.formData.uniqueColumns.includes(fd.name) && !props.formValues) {
        rulesList.push(() => ({
          async validator(rule, value) {
            let valueObject = {};
            valueObject[fd.name] = value;
            let status = null;
            if (value) {
              status = await uniqueCheck(valueObject, props.formData.entityName, fd.name);
            }

            if (!value || status) {
              return Promise.resolve();
            }
            return Promise.reject(fd.name + ' Already Exist');
          },
        }));
      } else if (props.formData.uniqueColumns.includes(fd.name) && props.formValues) {
        rulesList.push(() => ({
          async validator(rule, value) {
            let valueObject = {};
            valueObject[fd.name] = value;
            let status = await uniqueCheck(valueObject, props.formData.entityName, fd.name);

            if (props.formValues[fd.name] === value) {
              return Promise.resolve();
            } else if (!value || status) {
              return Promise.resolve();
            }
            return Promise.reject(fd.name + ' Already Exist');
          },
        }));
      }

      let obj = (
        <Form.Item label={name} name={fd.name} rules={rulesList}>
          {inputType}
        </Form.Item>
      );
      return obj;
    });
    return formItemList;
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {props.formValues ? 'Edit' : 'Add'}
      </Button>
      <Modal
        title={props.formValues ? 'Edit ' : 'Add ' + props.formData.formName}
        visible={isModalVisible}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}>
        {isModalVisible ? (
          <Form
            {...layout}
            name={props.formData.formName}
            onFinish={props.formValues ? onFinishEdit : onFinishAdd}
            form={form}>
            {getFormItems()}
            <Form.Item {...tailLayout}>
              <Button loading={loading} type="primary" htmlType="submit">
                {props.formValues ? 'Edit' : 'Add'}
              </Button>
            </Form.Item>
          </Form>
        ) : null}
      </Modal>
    </>
  );
}
