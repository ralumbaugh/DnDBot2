const FindPlayer = require('../HelperCommands/CheckRoster');

module.exports = (client) = {
    name: 'display',
    description: 'Displays a character card for a character.',
    execute(client, message, args){
        if(args.length == 1){
            const DisplayCharacter = FindPlayer(client.characters, args[0]);
            if(DisplayCharacter != false){
                message.channel.send(DisplayCharacter.DisplayCard(DisplayCharacter));
                return;
            }
            message.channel.send(`${args[0]} hasn't been created yet!`);
            return;
        }
        message.channel.send('Argument should be in the following format: <Character to Display>');
    }
}