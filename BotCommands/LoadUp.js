// Loadup is a command designed to make designing commands quicker to test.
const AddPlayer = require('./AddPlayer');
const AddInitiative = require('./AddToInitiative');

module.exports = {
    name: 'loadup',
    description: 'Loads two players into the game and into initiative.',
    execute(client, message){
        AddPlayer.execute(client, message, ['Quest', '57', '18', '3']);
        AddPlayer.execute(client, message, ['Bob', '25', '15', '2']);
        AddInitiative.execute(client, message, ['Quest', '20']);
        AddInitiative.execute(client, message, ['Bob', '25']);
        message.channel.send('Quest and Bob have been created and added to initiative.');
    }
}