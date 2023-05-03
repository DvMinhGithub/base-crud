import { Button, Col, Form, Input, Row, Spin } from "antd";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./Login.scss";
import { login, selectAuth } from "./login.slice";

const LoginForm = () => {
  const { loading } = useAppSelector(selectAuth);

  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = "Login ";
  }, []);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      dispatch(login(values));
    });
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col xs={24} sm={16} md={12} lg={8}>
        <Spin spinning={loading}>
          <Form
            form={form}
            name="basic"
            initialValues={{ remember: true }}
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            style={{ backgroundColor: "#fff", padding: 24 }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Col>
    </Row>
  );
};

export default LoginForm;
