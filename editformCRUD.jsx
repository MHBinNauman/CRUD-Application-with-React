import {
    Row,
    Col,
    Button,
    Form,
    Input,
    Card,
  } from "antd";

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
  

export default EditForm () {
    return (
        <>
        <Card style={{ width: 230 }}>
        <Form
          name="form_item_path_edit"
          layout="vertical"
          form={form}
          onFinish={(values) => save(record.key, values)}
        >
          <Row>
            <MyFormItemGroup prefix={["name"]} className="p-10">
              <Col className="gutter-row align-middle">
                <Form.Item
                  name="editFirstname"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  label={
                    <span
                      style={{
                        display: "block",
                        textAlign: "center",
                      }}
                      className="block text-lg text-center font-semibold leading-6 text-black"
                    >
                      First Name
                    </span>
                  }
                >
                  <Input
                    id="editFirstname"
                    name="editFirstname"
                    type="text"
                    placeholder="First name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </Form.Item>
              </Col>
              <Col className="gutter-row align-middle">
                <Form.Item
                  name="editLastname"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  label={
                    <span
                      style={{
                        display: "block",
                        textAlign: "center",
                      }}
                      className="block text-lg text-center font-semibold leading-6 text-black"
                    >
                      Last Name
                    </span>
                  }
                >
                  <Input
                    id="editLastname"
                    name="editLastname"
                    type="text"
                    placeholder="Last name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </Form.Item>
              </Col>
            </MyFormItemGroup>
          </Row>
          <Row>
            <Col className="gutter-row align-middle">
              <Form.Item
                name="editMessage"
                label={
                  <span className="block text-lg text-center font-semibold leading-6 text-black">
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
                  rows={2}
                  id="editMessage"
                  name="editMessage"
                  placeholder="Type your message here"
                  className="text-black"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col className="gutter-row align-middle m-5">
              <Button
                type="primary"
                htmlType="submit"
                className="block w-30 rounded-md bg-indigo-600 px-10 py-0 text-center text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
        </>
    );
}