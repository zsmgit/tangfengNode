const knex = require('../config/knex');

var MemberCartDao = function(){}

/**
 * 根据openid 查询会员卡列表
 */
MemberCartDao.prototype.findListByMobileAndOpenid = async function(mobile,wxOpenId){
    try{
        let result = await knex.select('*').from('tf_customer as c').leftJoin('tf_member_card as d','c.id','d.customer').leftJoin('tf_member_card_type as t','d.membercardtype','t.id').where({'c.tel':mobile,'c.wxOpenId':wxOpenId});
        if(result.length >0){
            return result;
        } 
    }catch(err){
        return false;
    }
    return false;       
}

/**
 * 根据id查询会员卡信息
 */
MemberCartDao.prototype.getCardById = async function(id){
	try {
        let cardDetail = await knex.select('*').from('tf_member_card').where('id',id);
        if(cardDetail.length > 0 ){
            return cardDetail[0];
        }
        
    } catch (error) {
        return false;        
    }
    return false;
}

module.exports = MemberCartDao;