var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var weiXin = require('./routes/weixin');
var memberCardRoute = require('./routes/memberCardRoute');
var payRecordRoute = require('./routes/payRecordRoute');
var serviceProjectRoute = require('./routes/serviceProjectRoute');
var customerRoute = require('./routes/customerRoute');
var wangYiYunSmsRoute = require('./routes/wangYiYunSmsRoute');


var app = express();

app.use(bodyParser.urlencoded({extended:false})); //post
app.use(bodyParser.json());                       //ajax post 
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/** 接入验证 */
app.get('/auth',weiXin.auth);

/**获取验证码 查询参数mobile */
app.post('/getVerifyCode',wangYiYunSmsRoute.sendMessage);

/**获取openid 查询参数wxCode*/
app.post('/login',weiXin.getOpenid);

/**用户信息 mobile*/
app.post('/loadPersonalInformation',customerRoute.loadPersonalInformation);

/**手机号绑定 查询参数 mobile,verfyCode,wxOpenId*/
app.post('/bindMobile',wangYiYunSmsRoute.checkCodeAndBindMobile);

/**解除手机号绑定 查询参数mobile */
app.post('/unBindMobile',customerRoute.unbindMobile);

/** 会员卡列表  查询参数mobile,wxOpenid*/
app.post('/loadMemberCardList',memberCardRoute.findCardList);

/**会员卡详情 id*/
app.post('/getMemberCardDetail',memberCardRoute.getMemberCardDetail);

/**查看会员卡的服务项目 查询参数cardId */
app.post('/getMemberCardDetail1',serviceProjectRoute.findServiceProject);

/**获取会员卡交易流水 查询参数cardId */
app.post('/getMemberCardDetail2',payRecordRoute.findPayRecordList);



app.get('*',(req,res) =>{
      res.end('not found');
})

app.listen('8081',function(){
      console.log('8081');
})

