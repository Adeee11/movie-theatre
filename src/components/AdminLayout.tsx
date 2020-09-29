import { Layout, Menu } from "antd"
import { CodepenOutlined, DesktopOutlined, IdcardOutlined, MobileOutlined, PieChartOutlined, ShopOutlined } from "@ant-design/icons"
import React, { useMemo, useState } from "react"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router"
import { Link, navigate } from "gatsby"
const { Header, Content, Sider } = Layout
export function AdminLayout({
  children,
  title,
}: {
  children: React.ReactNode
  title?: string
}) {
  const [collapsed, setCollapsed] = useState(false)

  const location = useLocation()

  const selectedKeys = useMemo(() => {
    console.log(location)
    return [location.pathname]
  }, [])

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
          crossOrigin="anonymous"
        />
      </Helmet>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={val => setCollapsed(val)}
      >
        <div className="logo" onClick={() => navigate("/")} />
        <Menu selectedKeys={selectedKeys} theme="dark" mode="inline">
          <Menu.Item key="/admin" icon={<CodepenOutlined />}>
            <Link className="text-decoration-none" to="/admin">Manage Screens</Link>
          </Menu.Item>

          <Menu.Item key="/admin/movies" icon={<MobileOutlined />}>
            <Link className="text-decoration-none" to="/admin/movies">Manage Movies</Link>
          </Menu.Item>

          <Menu.Item key="/admin/tickets" icon={<ShopOutlined />}>
            <Link className="text-decoration-none" to="/admin/tickets">Tickets Sold</Link>
          </Menu.Item>

          <Menu.Item key="/admin/staff" icon={<IdcardOutlined />}>
            <Link className="text-decoration-none" to="/admin/staff">Manage Staff</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background d-flex align-items-center">
          <h3>{title}</h3>
        </Header>
        <Content style={{ margin: "10px 16px" }}>{children}</Content>
      </Layout>
    </Layout>
  )
}
