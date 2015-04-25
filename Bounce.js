//didn't use "var" so we could create a global variable
PlayersList = new Mongo.Collection('players');

if(Meteor.isClient){
    
Meteor.subscribe('thePlayers');
    
   Template.leaderboard.helpers({ 
       
       'player': function(){
           var currentUserId = Meteor.userId();
           return PlayersList.find({}, {sort: {score: -1, name: 1}});

},

   'otherHelper': function(){
     return PlayersList.find().count()
    },
    
  
    'selectedClass': function(){
        var playerId = this._id;
        var selectedPlayer = Session.get('selectedPlayer'); 
        if(playerId == selectedPlayer){
            return "selected" }
},
    'showSelectedPlayer': function(){
        var selectedPlayer = Session.get('selectedPlayer'); 
        return PlayersList.findOne(selectedPlayer)
},
                                                                 
    'click .remove': function(){
        var selectedPlayer = Session.get('selectedPlayer');         
        PlayersList.remove(selectedPlayer);
}
});
    
    Template.leaderboard.events({
    'click .player': function(){
                var playerId = this._id;
                Session.set('selectedPlayer', playerId);
                var aa = playerId.name;
            console.log(aa);
              

        },        
       'click .increment': function(){
            var selectedPlayer = Session.get('selectedPlayer'); 
           Meteor.call('modifyPlayerScore', selectedPlayer, 5);
       },

        'click .decrement': function(){
           var selectedPlayer = Session.get('selectedPlayer');      
            Meteor.call('modifyPlayerScore', selectedPlayer, -5);
        },
       'submit form': function(event){ 
           event.preventDefault();
           var playerNameVar = event.target.playerName.value; 
           Meteor.call('insertPlayerData', playerNameVar);
        },
        
         'click .remove': function(){
            var selectedPlayer = Session.get('selectedPlayer');        
            Meteor.call('removePlayerData', selectedPlayer);
        }
                                });

}
                                
                                


if(Meteor.isServer){ 
   
    Meteor.publish('thePlayers', function(){
        var currentUserId = this.userId;
        return PlayersList.find({createdBy: currentUserId})
                });
    
    Meteor.methods({
            'insertPlayerData': function(playerNameVar){ 
                var currentUserId = Meteor.userId(); 
                PlayersList.insert({
                    name: playerNameVar,
                    score: 0,
                    createdBy: currentUserId
                }); 
            },
            
            'removePlayerData': function(selectedPlayer){ 
                PlayersList.remove(selectedPlayer);
            },
        
            'modifyPlayerScore': function(selectedPlayer, scoreValue){ 
                PlayersList.update(selectedPlayer, {$inc: {score: scoreValue} });
            }
                });

}
        



//if (Meteor.isClient) {
//  // counter starts at 0
//  Session.setDefault('counter', 0);
//
//  Template.hello.helpers({
//    counter: function () {
//      return Session.get('counter');
//    }
//  });
//
//  Template.hello.events({
//    'click button': function () {
//      // increment the counter when button is clicked
//      Session.set('counter', Session.get('counter') + 1);
//    }
//  });
//}
//
//if (Meteor.isServer) {
//  Meteor.startup(function () {
//    // code to run on server at startup
//  });
//}
