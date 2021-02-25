const Player = require('../classes/PlayerClass');
const FindPlayer = require('../HelperCommands/CheckRoster');

module.exports = {
    name: 'addplayer',
    description: 'Adds a character to the list of characters. Does not add to initiative.',
    execute(client, message, args){
        if(args.length == 4 && isNaN(args[1]) == false && isNaN(args[2]) == false && isNaN(args[3]) == false){
            if(FindPlayer(client.characters, args[0]) == false){
                const playerToAdd = new Player(args[0], args[1], args[2], args[3]);
                client.characters.push(playerToAdd);
                message.channel.send(`Added ${playerToAdd.Name} to the roster!`);
                return;
            }
            else{
                message.channel.send(`${args[0]} has already been added!`);
                return;
            }
        }
        message.channel.send('Argument should be in the following format: <Player To Add> <HP> <AC> <Dex Bonus>');
    }
}