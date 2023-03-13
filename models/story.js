
const {DateTime} = require("luxon");
const {v4: uuidv4} = require('uuid');
const stories = [
    {
        id: '1',
        title:'Story 1',
        content: 'Content regarding story 1',
        author: 'Author 1',
        createdAt: DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)

    },
    {   id: '2',
        title:'Story 2',
        content: 'Content regarding story 2',
        author: 'Author 2',
        createdAt:  DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {   id: '3',
        title:'Story 3',
        content: 'Content regarding story 3',
        author: 'Author 3',
        createdAt:  DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    }
];

// console.log(stories[0])

exports.find = () => {
    return stories;
};

exports.findById = (id) =>{
    return stories.find(story => story.id === id);
}

exports.save = (story) => {
    
    let uuid = uuidv4();
    story["id"] = uuid;
    story["createdAt"] =  DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    stories.push(story);
    console.log("New story added");
    // stories.push(story);
}

exports.updateById = (id, newStory) => {
    let story = stories.find(story => story.id === id);

    if(story){
        story.title = newStory.title;
        story.content = newStory.content;
        return true;
    }else{
        return false;
    }
};

exports.deleteById = (id) => {
    let index = stories.findIndex(story=> story.id === id);
    if (index != -1){
        stories.splice(index,1);
        return true;
    }else{
        return false;
    }
}