var PayRecordDao = require('../dao/payRecordDao');
var Response = require('../utils/Response');
var RES_CONFIG = require('../config/res_config');

//会员卡交易记录查询
async function findPayRecordList(req,res) {
    var cardId = req.body.cardId;
    
    var payRecordDao = new PayRecordDao();
    let result = await payRecordDao.findAllByCardId(cardId);
    if(!!result){
        return res.json(new Response(RES_CONFIG.success,result));
    }
    return res.json(new Response(RES_CONFIG.fail,result,'没有交易记录'));
}

module.exports = {
    findPayRecordList:findPayRecordList
}
