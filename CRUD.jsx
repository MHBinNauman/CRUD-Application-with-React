/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
"use client";

import React, { useState, useRef } from "react";
import Navbar from "./navbar";
import {
  Divider,
  Flex,
  Row,
  Col,
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Typography,
  Table,
  Space,
} from "antd";

const boxStyle = {
  width: "100%",
  height: 120,
  borderRadius: 6,
  border: "1px transparent",
};

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const MyFormItemContext = React.createContext([]);

function toArr(str) {
  return Array.isArray(str) ? str : [str];
}
const MyFormItemGroup = ({ prefix, children }) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatPath = React.useMemo(
    () => [...prefixPath, ...toArr(prefix)],
    [prefixPath, prefix]
  );
  return (
    <MyFormItemContext.Provider value={concatPath}>
      {children}
    </MyFormItemContext.Provider>
  );
};

export default function CRUD() {
  const [list, setList] = useState([
    {
      key: "1",
      firstname: "John",
      lastname: "Brown",
      message: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      firstname: "Jim",
      lastname: "Green",
      message: "London No. 1 Lake Park",
    },
  ]);

  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const formRef = useRef(null);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...list];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setList(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setList(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  function handleDelete(key) {
    setList((prevList) => prevList.filter((item) => item.key !== key));
  }

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname",
      editable: true,
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "lastname",
      editable: true,
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
      editable: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginInlineEnd: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Space size="middle">
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
            <Typography.Link onClick={() => handleDelete(record.key)}>
              Delete
            </Typography.Link>
          </Space>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  function onFinish(values) {
    console.log(values);

    const newlist = {
      key: Date.now(),
      firstname: values.firstname,
      lastname: values.lastname,
      message: values.message,
    };

    setList([...list, newlist]);

    formRef.current.resetFields();
  }

  return (
    <div className="isolate bg-black">
      <Navbar />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div>
        <Flex gap="middle" align="start" vertical>
          <Flex style={boxStyle} justify="center" align="center">
            <h1 className="text-white text-6xl font-semibold">
              CRUD Operations
            </h1>
          </Flex>
        </Flex>
        <Divider orientation="center" />
        <Form
          name="form_item_path"
          layout="vertical"
          ref={formRef}
          onFinish={onFinish}
        >
          <Row gutter={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
            <MyFormItemGroup prefix={["name"]} className="p-10">
              <Col className="gutter-row" span={5} offset={5}>
                <Form.Item
                  name="firstname"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  label={
                    <span
                      style={{ display: "block", textAlign: "center" }}
                      className="block text-xl text-center font-semibold leading-6 text-white"
                      htmlFor="firstname"
                    >
                      First Name
                    </span>
                  }
                >
                  <Input
                    id="firstname"
                    name="firstname"
                    type="text"
                    placeholder="First name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={5} offset={4}>
                <Form.Item
                  name="lastname"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  label={
                    <span
                      style={{ display: "block", textAlign: "center" }}
                      className="block text-xl text-center font-semibold leading-6 text-white"
                      htmlFor="lastname"
                    >
                      Last Name
                    </span>
                  }
                >
                  <Input
                    id="lastname"
                    name="lastname"
                    type="text"
                    placeholder="Last name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </Form.Item>
              </Col>
            </MyFormItemGroup>
          </Row>
          <Row gutter={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
            <Col className="gutter-row" span={14} offset={5}>
              <Form.Item
                name="message"
                label={
                  <span
                    className="block text-xl text-center font-semibold leading-6 text-white"
                    htmlFor="message"
                  >
                    Message
                  </span>
                }
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.TextArea
                  rows={6}
                  id="message"
                  name="message"
                  placeholder="Type your message here"
                  className="text-black"
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider orientation="center" />
          <Row gutter={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
            <Col className="gutter-row" span={3} offset={10}>
              <Button
                type="primary"
                htmlType="submit"
                className=" block w-auto rounded-md bg-indigo-600 px-20 py-0 text-center text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
        <Divider orientation="center" />
      </div>
      <div>
        <Divider orientation="center" />
        <Row gutter={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
          <Col span={14} offset={5}>
            <Form form={form} component={false}>
              <Table
                className="m-5"
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                bordered
                dataSource={list}
                columns={mergedColumns}
                rowClassName="editable-row"
                virtual
                scroll={{
                  x: 200,
                  y: 200,
                }}
              />
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
}
