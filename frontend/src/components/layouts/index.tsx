import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Breadcrumb, Layout, Menu, theme } from "antd";
import { SetStateAction, useCallback, useState } from "react";

import { useAppSelector } from "../../app/hooks";
import { useAppDispatch } from "../../app/store";
import { logout, selectAuth } from "../../features/auth/login.slice";
import UserPage from "../../features/user/User.page";
import "./index.scss";
const { Content, Footer, Sider } = Layout;

function LayoutPage() {
  const dispatch = useAppDispatch();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { user } = useAppSelector(selectAuth);

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuItems = [
    { key: "1", label: "Users", icon: <UserOutlined />, content: <UserPage /> },
    {
      key: "2",
      label: "Settings",
      icon: <SettingOutlined />,
      content: "Content for Settings",
    },
  ];

  const [currentMenuItem, setCurrentMenuItem] = useState(menuItems[0]);
  const breadcumbItems = [
    { key: "home", title: "Home" },
    { key: "currentMenuItem", title: currentMenuItem.label },
  ];

  const handleMenuClick = useCallback(
    (
      item: SetStateAction<
        | {
            key: string;
            label: string;
            icon: JSX.Element;
            content: JSX.Element;
          }
        | { key: string; label: string; icon: JSX.Element; content: string }
      >
    ) => setCurrentMenuItem(item),
    [setCurrentMenuItem]
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={[
            ...menuItems.map((item) => ({
              key: item.key,
              label: item.label,
              icon: item.icon,
              onClick: () => handleMenuClick(item),
            })),
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: "Logout",
              onClick: handleLogout,
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <div style={{ display: "flex", alignItems: "center", padding: 0 }}>
            <Breadcrumb style={{ margin: "16px 0" }} items={breadcumbItems} />
            <div style={{ flex: 1 }} />
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ marginRight: 8 }}>
                {user?.email || "Tên người dùng"}
              </div>
              <div className="login-avatar">
                <Avatar src="" />
              </div>
            </div>
          </div>

          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <div className="site-layout-content">{currentMenuItem.content}</div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default LayoutPage;
