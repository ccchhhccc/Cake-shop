# Cake-shop
使用H5+C3+jQuery粗略模仿了法颂蛋糕官网，使用nodejs模拟后台

# 线上地址(暂时关闭用户注册登录模块功能)
http://118.24.4.133:1234/

## 目录
server服务器

|__public静态资源(html等网页资源)

|__routes路由

|__package.json包管理

|__server.js后台

## 安装

进入server目录
```
npm install
```

## 申请阿里云短信服务
https://dayu.aliyun.com/product/sms?spm=a3142.7791109.0.0.4eff69290s9sbZ

## 进入server/routes/message.js填写阿里云短信服务的秘钥
```js
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'youKeyId'
const secretAccessKey = 'youAccessKey'
```

## 进入server/routes/send.js填写阿里云短信签名和使用的模板
```js
 //发送短信
smsClient.sendSMS({
    PhoneNumbers: req.body.phone,
    SignName: '阿里云短信签名',
    TemplateCode: '阿里云短信模板',
    TemplateParam: `{"code":"${num}"}`
})
```

## 运行程序
在server目录下运行server.js文件
```
node server
```

## 浏览器打开地址
http://localhost:1234/
