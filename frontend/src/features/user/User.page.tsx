import {
  Button,
  Form,
  Input,
  Modal,
  Popconfirm,
  Space,
  Spin,
  Table,
} from "antd";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  User,
  addNewUser,
  deleteUserById,
  fetchUsers,
  selectUsers,
  updateUserById,
} from "./user.slice";

const UserPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, users } = useAppSelector(selectUsers);

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
    document.title = "User";
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
      width: "30%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "40%",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "20%",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_text: string, record: User) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record._id)}>Edit</a>
          <Popconfirm
            placement="topLeft"
            title={"Delete user"}
            // description={description}
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
      width: "10%",
    },
  ];

  return (
    <div
      style={{
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => settOpenModal(true)}
          type="primary"
          style={{ marginBottom: 16 }}
        >
          Add New User
        </Button>
      </div>
      <Modal
        title={mode === "add" ? "Add New User" : "Edit User"}
        open={openModal}
        onCancel={() => {
          form.resetFields();
          settOpenModal(false);
        }}
        onOk={handleSubmit}
      >
        <Spin spinning={loading}>
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
        </Spin>
      </Modal>
      <Table columns={columns} dataSource={users} rowKey={"_id"} />
    </div>
  );
};

export default UserPage;
