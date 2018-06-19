const RES_CONFIG = require('../config/res_config');
var Response = require('../utils/Response');
var CustomerDao = require('../dao/customerDao');
var customerDao = new CustomerDao();

//解除手机号绑定
async function unbindMobile(req,res) {
    var mobile = req.body.mobile;

    var result =await customerDao.unbindOpenid(mobile);
    if(!!result){
        return res.json(new Response(RES_CONFIG.success,'',"解除绑定成功"));    
    }
    return res.json(new Response(RES_CONFIG.fail,"","解除绑定失败"));
}
//加载用户信息
async function loadPersonalInformation(req,res){
    var mobile = req.body.mobile;

    var result = await customerDao.loadPersonalInformation(mobile);
    if(!!result){
        return res.json(new Response(RES_CONFIG.success,result,""));
    }
    return res.json(new Response(RES_CONFIG.fail,'',"未获取到用户信息"));
}


module.exports = {
    unbindMobile:unbindMobile,
    loadPersonalInformation:loadPersonalInformation
}