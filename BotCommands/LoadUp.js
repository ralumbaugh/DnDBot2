// Loadup is a command designed to make designing commands quicker to test.
const AddPlayer = require('./AddPlayer');
const AddInitiative = require('./AddToInitiative');
const AddCondition = require('./AddCondition');

module.exports = {
    name: 'loadup',
    description: 'Loads two players into the game and into initiative.',
    execute(client, message){
        AddPlayer.execute(client, message, ['Quest', '57', '18', '3']);
        AddPlayer.execute(client, message, ['Box', '57', '18', '3']);
        AddPlayer.execute(client, message, ['Bob', '25', '15', '2']);
        AddInitiative.execute(client, message, ['Quest', '20']);
        AddInitiative.execute(client, message, ['Bob', '30']);
        AddInitiative.execute(client, message, ['Box', '25']);
        AddCondition.execute(client, message, ['Quest', 'Blinded', 5]);
        AddCondition.execute(client, message, ['Box', 'Blinded', 5]);
        AddCondition.execute(client, message, ['Bob', 'Blinded', 5]);
    }
}