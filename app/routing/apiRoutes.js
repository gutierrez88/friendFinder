var friends = require('../data/friends.js');

module.exports = function (app){

    app.get("/api/friends", function(req, res){
        return res.json(friends);
    });

    app.post("/api/friends", function(req, res){
        var newFriend = req.body;
        var newAnswers = newFriend.scores;
        var match = 30;
        var matchScore = 1000000;
        
        for (var i = 0; i < friends.length; i++){
            var total = 0;
            for (var j = 0; j < 10; j++){
                var number = (friends[i].scores[j] - newAnswers[j])
                total += Math.abs(number);
            };

            if (total < matchScore) {
                matchScore = total;
                match = [i];
            };
            
        };

        friends.push(newFriend);
        return res.send({Name: friends[match].name, picture: friends[match].pic, matchScore: matchScore});
    });
};
