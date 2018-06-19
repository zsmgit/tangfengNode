var knex = require('./config/knex');
var MemberCardDao = require('./dao/memberCartDao');
var Response = require('./utils/Response');
var PayRecordDao = require('./dao/payRecordDao');
var ServiceProjectDao = require('./dao/serviceProjectDao');
var PageBean = require('./utils/pageBean');
var CustomerDao = require('./dao/customerDao');
var UUID = require('uuid');
var smsUtils = require('./utils/smsUtils');
var wangYiYunSmsDao = require('./dao/wangYiYunSmsDao');


var MessageRecordDao = require('./dao/messageRecordDao');
var messageRecordDao = new MessageRecordDao();
var memberCardDao = new MemberCardDao();
var payRecordDao = new PayRecordDao();
var customerDao = new CustomerDao();


//async function testArguments(openid){
//  var page = arguments[1];
//  var pageSize = arguments[2];
//  if(page && pageSize){
//      console.log(page +" "+pageSize);
//  }else{
//      console.log('not page');
//  }
//  
//}
//function testCallBack(callback){
//  var data = 'data';
//  return callback(data);
//}
//async function test(){
//  var result =  testCallBack(function callback(data){
//      return data;
//  })
////  console.log(result);
//  
//}

async function updateTest(){
   // console.log(UUID.v1());
   // const curTime =smsUtils.getCurTime();
    //console.log(curTime);
    //console.log(smsUtils.getCheckSum(curTime));
    //var result =await messageRecordDao.deleteByMobile('174');
    //var result1 = await messageRecordDao.add({id:'2',sendid:'2',mobile:'123',code:'123'});
    //console.log(result1);
//  var result2 = await customerDao.bindOpenid('1888888888','22');
//  // console.log(result2);
//  var mobile = '1888888888';
//  console.log(await customerDao.loadPersonalInfomation(mobile));
    //curl 'http://localhost:8081/card/findPayRecordList?id='1''
    //curl 'http://localhost:8081/card/serviceProject?id='338d0f7884a64d7cb1163a848f902b9c''
    //curl 'http://localhost:8081/card/findCardList?openid=22' 
    // curl -d "mobile=1888888888"  'http://localhost:8081/unbindOpenid'
    // 'curl -d "mobile=1888888888&code=123&openid=12" 'http://localhost:8081/bindOpenid'

    // curl -d "mobile=1888888888" 'http://localhost:8081/getCode'      
//	var code = await messageRecordDao.getByMobile('17607553501');
//	console.log(code);
	var customer = await knex('tf_customer').where('wxopenid','=','2');
	var customer1 = await customerDao.getCustomerByMobileAndOpenid('17607553501','2');
//	var result = await memberCardDao.findListByMobileAndOpenid('17607553501','2');
	console.log(customer1);
	console.log(customer1.wxOpenId);
//	let result = await knex.select('*').from('tf_customer as c').leftJoin('tf_member_card as d','c.id','d.customer').leftJoin('tf_member_card_type as t','d.membercardtype','t.id').where({'c.tel':'17607553501','c.wxOpenId':'2'});
//	console.log(result);
}
//test();
updateTest();
// testArguments(12,null,2);

