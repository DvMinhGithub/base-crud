import { Button, Form, Input, Modal, Space, Table } from "antd";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  User,
  addNewUser,
  deleteUserById,
  fetchUsers,
  selectAllUsers,
  updateUserById,
} from "./userSlice";

const UserPage = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);

  const [openModal, settOpenModal] = React.useState(false);
  const [form] = Form.useForm();
  const [mode, setMode] = React.useState<"add" | "edit">("add");
  const [editedUserId, setEditedUserId] = React.useState<string | null>(null);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      settOpenModal(false);
      if (mode === "add") {
        dispatch(addNewUser(values));
      } else {
        dispatch(
          updateUserById({
            _id: editedUserId,
            ...values,
          })
        );
        setEditedUserId(null);
      }
    });
  };

  useEffect(() => {
    document.title = "User"
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (userId: string) => {
    const user = users.find((user) => user._id === userId);
    if (user) {
      form.setFieldsValue(user);
      settOpenModal(true);
      setMode("edit");
      setEditedUserId(userId);
    }
  };

  const handleDelete = (userId: string) => {
    dispatch(deleteUserById(userId));
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_text: string, record: User) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record._id)}>Edit</Button>
          <Button onClick={() => handleDelete(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "960px",
        margin: "0 auto",
      }}
    >
      <Button
        onClick={() => settOpenModal(true)}
        type="primary"
        style={{ marginBottom: 16 }}
      >
        Add New User
      </Button>
      <Modal
        title={mode === "add" ? "Add New User" : "Edit User"}
        open={openModal}
        onCancel={() => {
          form.resetFields();
          settOpenModal(false);
        }}
        onOk={handleSubmit}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={users} rowKey={"_id"} />
    </div>
  );
};

export default UserPage;
