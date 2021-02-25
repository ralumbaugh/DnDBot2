const FindPlayer = require('../HelperCommands/CheckRoster');

module.exports = {
    name: 'addtoinitiative',
    description: 'Adds a character to initiative.',
    execute(client, message, args) {
        if(args.length == 2 && isNaN(args[1]) == false){
            let CharacterToAdd = FindPlayer(client.characters, args[0]);

            if(CharacterToAdd != false)
            {
                if(FindPlayer(client.initiative, CharacterToAdd.Name) != false){
                    message.channel.send(`${CharacterToAdd.Name} is already in initiative!`);
                }
                else{
                    client.initiative.push([CharacterToAdd,args[1]]);
                    message.channel.send(`Added ${CharacterToAdd.Name} to initiative!`);
                    // Sorts character into initiative order
                    for(let i=client.initiative.length-1; i>0; i--){
                        if(Number(client.initiative[i][1]) > Number(client.initiative[i-1][1])){
                            [client.initiative[i],client.initiative[i-1]] = [client.initiative[i-1],client.initiative[i]];
                        }
                    }
                }
            }
            else{
                message.channel.send("This character doesn't exist yet! Feel free to add them with the AddPlayer command.");
            }
        }
        else{
            message.channel.send('Argument should be in the following format: <Character Name> <Initiative Roll>');
        }
    }
}