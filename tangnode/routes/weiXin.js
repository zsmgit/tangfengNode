var crypto = require('crypto');
var url = require('url');
var https = require('https');
var CustomerDao = require('../dao/customerDao');

const config = require('../config/wx_config');

var wx_config = require('../config/wx_config');

var customerDao = new CustomerDao();
//公众号接入验证
auth = function(req, res) {
	var query = url.parse(req.url, true).query;
	var signature = query.signature;
	var timestamp = query.timestamp;
	var nonce = query.nonce;
	var echostr = query.echostr;
	/**token  */
	if(check(timestamp, nonce, signature, wx_config.token)) {
		res.end(echostr);
	} else {
		res.end("It is not from weixin");
	}
};

function check(timestamp, nonce, signature, token) {
	var currSign, tmp;
	tmp = [token, timestamp, nonce].sort().join("");
	currSign = crypto.createHash("sha1").update(tmp).digest("hex");
	return(currSign === signature);
};

function getResource(url) {
	return new Promise((resolve, reject) => {
		https.get(url, (res) => {
			let rawData = '';
			res.on('data', (chunk) => {
				rawData += chunk;
			});
			res.on('end', () => {
				resolve(rawData);
			});
			res.on('error', () => {
				reject(error)
			});
		})
	})
}
/*
 * 向微信服务器发送code 获取openid并向客户端响应wxOpenId 和手机号。如果未绑定手机号：null
 * 
 */
async function getOpenid(req, res) {
	var code = req.body.wxCode;
	//todo
	var url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=" + code + "E+&grant_type=authorization_code";
	let data = await getResource(url);
	var wxOpenId = data.openid;

	var resData;
	var customer = await customerDao.getCustomerByOpenid(wxOpenId);
	if(!!customer) {
		resData = {
			mobile: customer.tel,
			wxOpenId: wxOpenId
		};
	}
	resData = {
		mobile: null,
		wxOpenId: wxOpenId
	}
	return res.json(new Response(RES_CONFIG.success, resData, ""));
}

module.exports = {
	auth: auth,
	getOpenid: getOpenid
}