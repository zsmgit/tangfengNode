var knex = require('../config/knex');

var CustomerDao = function(){}
/**
 * 根据手机号绑定用户和openid
 * @param {*} mobile 
 * @param {*} openid 
 */
CustomerDao.prototype.bindOpenid =async function(mobile,wxOpenId){
    
    try{
        var result = await knex('tf_customer').where('tel','=',mobile).update({'wxOpenId':wxOpenId});
        if(result > 0){
            return result;
        }      
    }catch(err){
        return false;
    }
    return false;  
}
/**
 * 查询用户是否已经绑定
 * @param {*} openid 
 */
CustomerDao.prototype.getCustomerByMobileAndOpenid = async function(mobile,wxOpenId){
    try{
        var result = await knex('tf_customer').where({
        	tel:mobile,
        	wxOpenId:wxOpenId
        });
        if(result.length > 0){
            return result[0];
        }      
    }catch(err){
        return false;
    }
    return false;  
}
/**
 * 解除绑定
 * @param {*} mobile 
 */
CustomerDao.prototype.unbindOpenid = async function(mobile){
    try{
        var result = await knex('tf_customer').where('tel','=',mobile).update({'wxOpenId':null});
        return result;   
    }catch(err){
        return false;
    }
}

CustomerDao.prototype.loadPersonalInformation = async function(mobile){
    try{
        var result = await knex('tf_customer').where('tel','=',mobile).select('*');
        if(result.length>0){
            return result[0];
        }
    }catch(err){
        return false;
    }
    return false;   
}


module.exports = CustomerDao;