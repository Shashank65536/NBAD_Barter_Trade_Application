const {DateTime} = require("luxon");
const {v4: uuidv4} = require('uuid');

const tradeItems = [
    {
        id: '1',
        category_id:'1',
        name:'Vincent Chase',
        category: 'Round',
        details: 'Author 1',
        status:'New',
        price: '20',
        image:'data:image/png;base64,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',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)

    },
    {   
        id: '2',
        category_id:'2',
        name:'Titan Eye wear',
        category: 'Oval',
        details: 'Author 1',
        status:'New',
        price: '20',
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ7Q8BQHDT8SWf_uR3v_lcoVmY8Yu9DgO33w&usqp=CAU',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {  
        id: '3',
        category_id:'3',
        name:'RayBan',
        category: 'Aviator',
        details: 'Author 1',
        status:'New',
        price: '20',
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjPx_dTaxadOIn3QEIltzdm6LE7chEfxcElQ&usqp=CAU',        
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {  
        id: '4',
        category_id:'4',
        name:'RayBan',
        category: 'Cat Eye',
        details: 'Author 1',
        status:'New',
        price: '20',
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjPx_dTaxadOIn3QEIltzdm6LE7chEfxcElQ&usqp=CAU',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    }
];

exports.getAllTradeItems = ()=>{
    return tradeItems;
}