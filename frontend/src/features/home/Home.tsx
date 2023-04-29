import { Layout, Menu, Breadcrumb } from "antd";

const { Header, Content, Footer } = Layout;

function AdminPage() {
  const menuItems = [
    { key: "1", title: "Users" },
    { key: "2", title: "Settings" },
  ];

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          {menuItems.map((item) => (
            <Menu.Item key={item.key}>{item.title}</Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Users</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">Content goes here.</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default AdminPage;
