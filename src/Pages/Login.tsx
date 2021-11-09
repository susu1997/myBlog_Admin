/*
 * @Author: shuyang
 * @Date: 2021-11-06 23:56:26
 * @LastEditTime: 2021-11-07 19:43:55
 * @FilePath: \nextJs_Blog\admin\src\Pages\Login.tsx
 */
import React, { useState } from "react";
import "antd/dist/antd.css";
import { Input, Button, Spin, Card, message, Form, Checkbox } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../static/css/Login.css";
import servicePath from "../config/apiUrl";
import axios from "axios";
import { useHistory } from "react-router";
function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
//   const checkLogin = () => {
//     setIsLoading(true);

//     if (!userName) {
//       message.error("用户名不能为空");
//       return false;
//     } else if (!password) {
//       message.error("密码不能为空");
//       setTimeout(() => {
//         setIsLoading(false);
//       }, 500);
//       return false;
//     }
//     let dataProps = {
//       userName: userName,
//       password: password,
//     };
//     axios({
//       method: "post",
//       url: servicePath.checkLogin,
//       data: dataProps,
//       withCredentials: true, //前端后端共享sesscon
//     }).then((res) => {
//       setIsLoading(false);
//       if (res.data.data === "登录成功") {
//         localStorage.setItem("openId", res.data.openId);
//         history.push("/index");
//       } else {
//         message.error("用户名密码错误");
//       }
//     });

//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);
//   };

  const onFinish = (values: any) => {
      console.log("Success:", values);
      setUserName(values.username)
      setPassword(values.password)
      setIsLoading(true);
//   debugger
   
      let dataProps = {
        userName: values.username,
        password: values.password,
      };
      axios({
        method: "post",
        url: servicePath.checkLogin,
          data: dataProps,
          
        withCredentials: true, //前端后端共享sesscon
      }).then((res) => {
          setIsLoading(false);
          debugger
        if (res.data.data === "登录成功") {
          localStorage.setItem("openId", res.data.openId);
          history.push("/index");
        } else {
          message.error("用户名密码错误");
        }
      });
  
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      if (!values.username) {
        
        message.error("用户名不能为空");
        return false;
      } else if (!values.password) {
        message.error("密码不能为空");
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        return false;
      }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="login-div">
          <Spin tip="Loading..." spinning={isLoading}>
          <Card title="Shuxiaoxiao blog Systrm" bordered={true} style={{ width: 400 }}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
          </Form.Item>
        </Form>
        {/* <Card title="Shuxiaoxiao blog Systrm" bordered={true} style={{ width: 400 }}>
                    <Input id="username" size="large" placeholder="Enter your userName"
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }}
                            onChange={(e: any) => { console.log(e.target.value);setUserName(e.target.value); }}
                        />}
                    ></Input>
                    <br></br>
                    <br></br>
                    <Input.Password id="password" size="large" placeholder="Enter your password"
                        prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }}
                            onChange={(e: any) => { setPassword(e.target.value); console.log(e.target.value) }}
                        />}
                    ></Input.Password>
                    <br></br>
                    <br></br>
                    <Button type="primary" size="large" block onClick={ checkLogin}>Login</Button>
                </Card> */}
                  </Card>
      </Spin>
    </div>
  );
}

export default Login;
