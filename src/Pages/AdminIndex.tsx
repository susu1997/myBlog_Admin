/*
 * @Author: shuyang
 * @Date: 2021-11-07 10:57:29
 * @LastEditTime: 2021-11-07 22:36:08
 * @FilePath: \nextJs_Blog\admin\src\Pages\AdminIndex.tsx
 */
import { Layout, Menu, Breadcrumb } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import "../static/css/AdminIndex.css";
import { Route, BrowserRouter as Router, useHistory, Switch } from "react-router-dom";
import AddArticle from "./AddArticle";
import ArticleList from "./ArticleList";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default function AdminIndex(prop:any) {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed: any) => {
    setCollapsed(collapsed);
  };
  const history = useHistory();
  const handleClickArticle = (e: any) => {
    console.log(e);
    debugger;
    if (e.key === "addArticle") {
      prop.history.push("/index/add/");
    } else {
      prop.history.push("/index/list/");
    }
  };
  return (
    // <Router>
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            工作台
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            添加文章
          </Menu.Item>
          <SubMenu
            key="sub1"
            icon={<UserOutlined />}
            title="文章管理"
            // onTitleClick={handleClickArticle}
          >
            <Menu.Item key="addArticle" onClick={handleClickArticle}>
              添加文章
            </Menu.Item>
            <Menu.Item key="articleList" onClick={handleClickArticle}>
              文章列表
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            留言管理
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {/* shuxxiaoxiao博客工作台 */}
              <Route path="/index/" exact component={AddArticle} />
              <Route path="/index/add/"  component={AddArticle} />
              <Route path="/index/add/:id" component={AddArticle} />
              <Route path="/index/list/"   component={ArticleList} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Shuxiaoxiao.com</Footer>
      </Layout>
      </Layout>
  );
}
