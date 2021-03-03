const FindPlayer = require('../HelperCommands/CheckRoster');

module.exports = (client) = {
    name: 'removefrominitiative',
    description: 'Removes the character from initiative.',
    execute(client, message, args){
        const CharacterToRemove = FindPlayer(client.initiative, args[0]);
        if(CharacterToRemove != false){
            for(let i=0; i<client.initiative.length; i++){
                if(CharacterToRemove == client.initiative[i]){
                    if(Number(i) < Number(client.initiativePosition)){
                        client.initiativePosition--;
                    }
                    client.initiative.splice(i, 1);
                    message.channel.send(`${CharacterToRemove.Name} has been removed from initiative`);
                    return;
                }
            }
        }
        message.channel.send(`${args[0]} isn't in initiative!`);
    }
}