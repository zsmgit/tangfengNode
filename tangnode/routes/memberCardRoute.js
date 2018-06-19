var MemberCardDao = require('../dao/memberCartDao');
const RES_CONFIG = require('../config/res_config');
var Response = require('../utils/Response');
var CustomerDao = require('../dao/customerDao');
                         

var memberCardDao = new MemberCardDao();
var customerDao = new CustomerDao();

//获取用户会员卡列表
async function findCardList(req,res){
	var mobile = req.body.mobile;
    var wxOpenId = req.body.wxOpenId;
    //先判断是否已经绑定
    var customer = await customerDao.getCustomerByMobileAndOpenid(mobile,wxOpenId);
    if(!!customer){
        var cardList = await memberCardDao.findListByMobileAndOpenid(mobile,wxOpenId);
        
        if(!!cardList){
            return res.json(new Response(RES_CONFIG.success,cardList,""));
        }
        return res.json(new Response(RES_CONFIG.fail,"","用户没有会员卡"));
    }
    return res.json(new Response(RES_CONFIG.fail,"","手机号不正确或未绑定"));
}
//获取会员卡详情
async function getMemberCardDetail(req,res){
	var id = req.body.id;
	
	var card = await memberCardDao.getCardById(id);
	if(!!card){
		return res.json(new Response(RES_CONFIG.success,card,""));
	}
	return res.json(new Response(RES_CONFIG.fail,"","没有查询到会员卡信息"));
}

module.exports = {
    findCardList:findCardList,
    getMemberCardDetail:getMemberCardDetail
}
