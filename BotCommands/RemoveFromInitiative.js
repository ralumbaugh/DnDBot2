const FindPlayer = require('../HelperCommands/CheckRoster');

module.exports = (client) = {
    name: 'removefrominitiative',
    description: 'Removes the character from initiative.',
    execute(client, message, args){
        const CharacterToRemove = FindPlayer(client.initiative, args[0]);
        if(CharacterToRemove != false){
            for(let i=0; i<client.initiative.length; i++){
                if(CharacterToRemove == client.initiative[i]){
                    client.initiative.splice(i, 1);
                    message.channel.send(`${CharacterToRemove.Name} has been removed from initiative`);
                    return;
                }
            }
        }
        message.channel.send(`${args[0]} isn't in initiative!`);
//    if(args.length == 2 && isNaN(args[1]) == false){
//             let CharacterToAdd = FindPlayer(client.characters, args[0]);

//             if(CharacterToAdd != false)
//             {
//                 if(FindPlayer(client.initiative, CharacterToAdd.Name) != false){
//                     message.channel.send(`${CharacterToAdd.Name} is already in initiative!`);
//                 }
//                 else{
//                     CharacterToAdd.Initiative = args[1];
//                     client.initiative.push(CharacterToAdd);
//                     message.channel.send(`Added ${CharacterToAdd.Name} to initiative!`);
//                     // Sorts character into initiative order
//                     for(let i=client.initiative.length-1; i>0; i--){
//                         if(Number(client.initiative[i].Initiative) > Number(client.initiative[i-1].Initiative)){
//                             [client.initiative[i],client.initiative[i-1]] = [client.initiative[i-1],client.initiative[i]];
//                         }
//                     }
//                 }
//             }
//             else{
//                 message.channel.send("This character doesn't exist yet! Feel free to add them with the AddPlayer command.");
//             }
//         }
//         else{
//             message.channel.send('Argument should be in the following format: <Character Name> <Initiative Roll>');
//         }
    }
}

// module.exports = class RemoveFromInitiativeCommand extends BaseCommand {
//     constructor() {
//         super('RemoveFromInitiative', 'fun', []);
//     }


//     async run(client, message, args) {
//         if(args.length == 1){
//             let CharacterToAdd = client.CheckForCharacter(args[0]);
//             let FoundInInitiative = false;

//             if(CharacterToAdd != false)
//             {
//                 for(let i=0; i<client.initiative.length; i++){
//                     if(CharacterToAdd == client.initiative[i][0]){
//                         client.initiative.splice(i, 1);
//                         FoundInInitiative = true;
//                     }
//                 }
//                 if(FoundInInitiative == true){
//                     message.channel.send(`${CharacterToAdd.Name} has been removed from initiative!`);
//                 }
//                 else{
//                     message.channel.send(`${CharacterToAdd.Name} isn't in initiative. You can't remove them!`);
//                 }
//             }
//             else{
//                 message.channel.send("This character doesn't exist yet!!");
//             }
//         }
//         else{
//             message.channel.send("Please input your query in the following format: CharacterName");
//         }
//     }
// }