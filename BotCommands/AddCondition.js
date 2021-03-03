const FindPlayer = require('../HelperCommands/CheckRoster');

module.exports = {
    name: 'addcondition',
    description: 'Adds a condition to a character.',
    execute(client, message, args){
        const Character = FindPlayer(client.characters, args[0]);
        const Errors = [];
        if(Character == false){
            Errors.push(`${args[0]} has not been added yet!`);
        }
        if(Character != false && !(args[1] in Character.Conditions)){
            Errors.push(`${args[1]} is not a condition that ${Character.Name} can be affected by.`);
        }
        else if(Character.Conditions[args[1]] == true){
            Errors.push(`${Character.Name} is already suffering from the ${args[1]} condition`);
        }
        if(args.length == 2){
            if(Errors.length == 0){
                Character.Conditions[args[1]] = true;
                message.channel.send(`${Character.Name} is now suffering from the ${args[1]} condition until it has been treated.`);
            }
        }
        else if(args.length == 3 && isNaN(args[2]) == false){
            if(isNaN(Character.Conditions[args[1]]) == false && Number(Character.Conditions[args[1]]) > Number(args[2])){
                Errors.push(`${Character.Name} is already suffering from the ${args[1]} condition for ${Character.Conditions[args[1]]} more turns.`);
            }
            if(Errors.length == 0){
                Character.Conditions[args[1]] = args[2];
                message.channel.send(`${Character.Name} is now suffering from the ${args[1]} condition for ${args[2]} turns.`);
            }
            else{
                for(let i=0; i<Errors.length; i++){
                    message.channel.send(Errors[i]);
                }
            }
        }
    }
}