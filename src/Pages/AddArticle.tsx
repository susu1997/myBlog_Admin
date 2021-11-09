/*
 * @Author: shuyang
 * @Date: 2021-11-07 11:34:16
 * @LastEditTime: 2021-11-07 23:47:22
 * @FilePath: \nextJs_Blog\admin\src\Pages\AddArticle.tsx
 */
import React, { useEffect, useState } from "react";
//@ts-ignore
import marked from "marked";
import "../static/css/AddArticle.css";
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";
import { useHistory } from "react-router";
import { type } from "os";
const { Option } = Select;
const { TextArea } = Input;
function AddArticle(props: any) {
  const [articleId, setArticleId] = useState(0); // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState(""); //文章标题
  const [articleContent, setArticleContent] = useState(""); //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState("预览内容"); //html内容
  const [introducemd, setIntroducemd] = useState(); //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState("等待编辑"); //简介的html内容
  const [showDate, setShowDate] = useState(); //发布日期
  const [updateDate, setUpdateDate] = useState(); //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]); // 文章类别信息
  const [selectedType, setSelectType] = useState("请选择文章类型     "); //选择的文章类别
  const history = useHistory();
  const Renderer = new marked.Renderer();
  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    // tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });
  const changeContent = (e: any) => {
    setArticleContent(e.target.value);
    let html = marked(e.target.value);
    console.log("html", html);
    setMarkdownContent(html);
  };

  const changeIntroduce = (e: any) => {
    setIntroducemd(e.target.value);
    let html = marked(e.target.value);
    console.log("html", html);
    setIntroducehtml(html);
  };
  //从中台得到文章类别信息
  const getTypeInfo = () => {
    axios({
      method: "get",
      url: servicePath.getTypeInfo,
      // header:{ 'Access-Control-Allow-Origin':'*' },
      withCredentials: true,
    }).then((res) => {
      console.log("aa", res);
      if (res.data.data === "没有登录") {
        debugger;
        localStorage.removeItem("openId");
        history.push("/");
      } else {
        setTypeInfo(res.data.data);
      }
    });
  };
  useEffect(() => {
    getTypeInfo();
    //获得文章ID
    let tmpId = props.match.params.id;
    if (tmpId) {
      debugger;
      setArticleId(tmpId);
      getArticleById(tmpId);
    }
  }, []);
  //选择类别后的便哈
  const selectTypeHandler = (value: any) => {
    setSelectType(value);
  };

  const saveArticle = () => {
    // markedContent()  //先进行转换
    if (!selectedType) {
      message.error("必须选择文章类别");
      return false;
    } else if (!articleTitle) {
      message.error("文章名称不能为空");
      return false;
    } else if (!articleContent) {
      message.error("文章内容不能为空");
      return false;
    } else if (!introducemd) {
      message.error("简介不能为空");
      return false;
    } else if (!showDate) {
      message.error("发布日期不能为空");
      return false;
    }
    message.success("检验通过");

    let dataProps = {}; //传递到接口的参数
    //@ts-ignore
    dataProps.type_id = selectedType;
    //@ts-ignore
    dataProps.title = articleTitle;
    //@ts-ignore
    dataProps.article_content = articleContent;
    //@ts-ignore
    dataProps.introduce = introducemd;
    //@ts-ignore
    let datetext = showDate.replace("-", "/"); //把字符串转换成时间戳
    //@ts-ignore
    dataProps.addTime = new Date(datetext).getTime() / 1000;

    if (articleId == 0) {
      console.log("articleId=:" + articleId);
      //@ts-ignore
      dataProps.view_count = Math.ceil(Math.random() * 100) + 1000;
      axios({
        method: "post",
        url: servicePath.addArticle,
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        setArticleId(res.data.insertId);
        if (res.data.isScuccess) {
          message.success("文章添加成功");
        } else {
          message.error("文章添加失败");
        }
      });
    } else {
      // @ts-ignore
      dataProps.id = articleId;
      axios({
        method: "post",
        url: servicePath.updateArticle,
        // header:{ 'Access-Control-Allow-Origin':'*' },
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        if (res.data.isScuccess) {
          message.success("文章保存成功");
        } else {
          message.error("文章保存失败");
        }
      });
    }
  };
  const getArticleById = (id: string) => {
    axios(servicePath.getArticleById + id, {
      withCredentials: true,
    }).then((res) => {
      console.log("res", res);
      debugger;
      let articleInfo = res.data.data[0];
      console.log("articleInfo", articleInfo);
      setArticleTitle(articleInfo.title);
      setArticleContent(articleInfo.article_content);
      let html = marked(articleInfo.article_content);
      setMarkdownContent(html);
      setIntroducemd(() => { return articleInfo.introduce } );
      console.log("introducemd", introducemd);
      let tmpInt = marked(articleInfo.introduce);
      setIntroducehtml(tmpInt);
      setShowDate(articleInfo.addTime);
      setSelectType(articleInfo.typeId);
    });
  };
  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                value={articleTitle}
                placeholder="博客标题"
                size="large"
                onChange={(e) => {
                  setArticleTitle(e.target.value);
                }}
              ></Input>
            </Col>
            <Col span={4}>
              <Select
                defaultValue={selectedType}
                size="large"
                onChange={selectTypeHandler}
              >
                {typeInfo.map((item: any, index) => {
                  return (
                    <Option key={index} value={item.Id}>
                      {item.typeName}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <br></br>
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                value={articleContent}
                onChange={changeContent}
                onPressEnter={changeContent}
              ></TextArea>
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>&nbsp;
              <Button type="primary" size="large" onClick={saveArticle}>
                发布文章
              </Button>
              <br />
            </Col>
            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                placeholder="文章简介"
                value={introducemd}
                onChange={changeIntroduce}
                onPressEnter={changeIntroduce}
              />
              <br />
              <br />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{
                  __html: "文章简介：" + introducehtml,
                }}
              ></div>
            </Col>
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  onChange={(date, dateString: any) => setShowDate(dateString)}
                  placeholder="发布日期"
                  size="large"
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default AddArticle;
// 1.路由守护2.编辑没回显数据 3,取消git远程连接地址