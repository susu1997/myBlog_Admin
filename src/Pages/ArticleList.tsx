/*
 * @Author: shuyang
 * @Date: 2021-11-07 21:16:36
 * @LastEditTime: 2021-11-07 22:52:38
 * @FilePath: \nextJs_Blog\admin\src\Pages\ArticleList.tsx
 */

import React, { useState, useEffect } from "react";
import "../static/css/ArticleList.css";
import { List, Row, Col, Modal, message, Button, Switch } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";
const { confirm } = Modal;
function ArticleList(props: any) {
  const [list, setList] = useState([]);
  useEffect(() => {
    getList();
  }, []);
  //得到文章列表
  const getList = () => {
    axios({
      method: "get",
      url: servicePath.getArticleList,
      withCredentials: true,
      // header:{ 'Access-Control-Allow-Origin':'*' }
    }).then((res) => {
      setList(res.data.list);
    });
    };
    
//删除文章的方法
const delArticle = (id:number)=>{
    confirm({
        title: '确定要删除这篇博客文章吗?',
        content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
        onOk() {
            axios(servicePath.delArticle+id,{ withCredentials: true}).then(
                res=>{ 
                    message.success('文章删除成功')
                    getList()
                    }
                )
        },
        onCancel() {
            message.success('没有任何改变')
        },
     });

    }
    //修改文章
const updateArticle = (id:number,checked:boolean)=>{
    props.history.push('/index/add/' + id)
}

  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={3}>
              <b>类别</b>
            </Col>
            <Col span={3}>
              <b>发布时间</b>
            </Col>
            <Col span={3}>
              <b>集数</b>
            </Col>
            <Col span={3}>
              <b>浏览量</b>
            </Col>

            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={(item: any) => (
          <List.Item>
            <Row className="list-div">
              <Col span={8}>{item.title}</Col>
              <Col span={3}>{item.typeName}</Col>
              <Col span={3}>{item.addTime}</Col>
              <Col span={3}>
                共<span>{item.part_count}</span>集
              </Col>
              <Col span={3}>{item.view_count}</Col>

              <Col span={4}>
                <Button type="primary" onClick={()=>{updateArticle(item.id,true)}} >修改</Button>&nbsp;
                <Button onClick={()=>{delArticle(item.id)}}>删除 </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
}

export default ArticleList;
