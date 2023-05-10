const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const watchlistSchema = new Schema({
    user:{type: Schema.Types.ObjectId, ref: 'User'},
    tradeitem:{type: Schema.Types.ObjectId, ref: 'Trade'},
    tradeStatus: {type: String},
    watchListStatus:{type: Boolean}
},
{timestamps: true}
)

module.exports = mongoose.model('WatchListItem', watchlistSchema)