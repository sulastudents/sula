Students = new Mongo.Collection("students");

Students.allow({
    insert: function(){
        return true;
    },
    // update: function(){
    //     return true;
    // },
    remove: function(){
        return true;
    }
});
