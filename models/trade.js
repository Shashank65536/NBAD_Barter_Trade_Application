const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userTradeSchema = new Schema({
    user:{type: Schema.Types.ObjectId, ref: 'User'},
    userItem:{type: Schema.Types.ObjectId, ref: 'Trade'},
    tradeItem:{type: Schema.Types.ObjectId, ref: 'Trade'},
    tradeStatus: {type: String}
},
{timestamps: true}
)

module.exports = mongoose.model('UserTrade', userTradeSchema);