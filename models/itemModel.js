
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tradeSchema = new Schema({
    category_id: {type: String, required:[true]},
    name: {type: Schema.Types.ObjectId, ref:'User'},
    category: {type: String, required:[true]},
    status: {type: String, required:[true]},
    price: {type: String, required:[true]},
    image: {type: String, required:[true]},
    details: {type: String, required:[true],
        minLength: [10]}
    }, 
    {timestamps: true}
);

//collection name is stories in database 
module.exports = mongoose.model('Trade', tradeSchema);

exports.getAllItems = () => {
    return tradeItems;
};

exports.getItemByCategoryId = (id) =>{
    let itemArr = [];
    console.log("In models id is = ",id);
    reqItem = tradeItems.find(item => item.category_id === id);
    itemArr.push(reqItem);
    console.log("In getItemByCategoryId ",itemArr);
    return itemArr;
};

exports.getAllCategories = () =>{

    return getCategoryDict();
}

getCategoryDict =  ()=>{
    categoryInfo = [];
    var i = 0;
    tradeItems.forEach(item =>{
        tempCategory = {};
        tempCategory["category"] = item.category;
        tempCategory["category_id"] = item.category_id;
        categoryInfo.push(tempCategory);
        i++;
    });
    console.log(categoryInfo);
    console.log(categoryInfo.length);
    return categoryInfo;
}

exports.getItemDetailsByItemId = (id) =>{
    console.log("In models id is = ",id);
    return tradeItems.find(item => item.id === id);
};

exports.deleteById = (id) =>{
    let index = tradeItems.findIndex(item => item.id === id);
    if(index != -1 ){
        tradeItems.splice(index,1);
        return true;
    }else{
        return false;
    }
}

exports.updateById = (id, newItem) => {
    let item = tradeItems.find(eachItem => eachItem.id === id);

    if(item){
        item.name = newItem.name;
        item.category = newItem.category;
        item.details = newItem.details;
        item.price = newItem.price;
        return true;
    }else{
        return false;
    }
}