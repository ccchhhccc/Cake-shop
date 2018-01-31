# Cake-shop
使用H5+C3+jQuery粗略模仿了法颂蛋糕官网，使用nodejs模拟后台

## 目录
server服务器

|__public静态资源(html等网页资源)

|__routes路由

|__package.json包管理

## 安装

进入server目录
```
npm install
```

## 进入server/routes/message.js填写阿里云短信服务的秘钥
```js
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'youKeyId'
const secretAccessKey = 'youAccessKey'
```

## 运行程序
在server目录下运行server.js文件
```
node server
```

## 浏览器打开地址
http://localhost:1234/
