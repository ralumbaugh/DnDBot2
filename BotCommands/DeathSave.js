const FindPlayer = require('../HelperCommands/CheckRoster');
const Remove = require('./RemoveFromInitiative');

module.exports = {
    name: 'deathsave',
    description: 'Performs a deathsave.',
    execute(client, message, args){
        if(args.length == 2 && isNaN(args[1]) == false ){
            const DyingPlayer = FindPlayer(client.characters,args[0]);
            let ErrorList = [];
            if(DyingPlayer == false){
                ErrorList.push(`${args[0]} hasn't been added to the list of charcters yet!`);
            }
            else if(DyingPlayer.Conditions['Unconscious'] != true){
                ErrorList.push(`A little quick on the draw there! ${args[0]} isn't unconscious yet!`);
            }
            else if(DyingPlayer.Stable == true){
                ErrorList.push(`${args[0]} has already stabilized!`);
            }
            else if(DyingPlayer.isAlive == false){
                ErrorList.push(`It's a little late there. ${args[0]} is already dead`);
            }
            for(let i=0; i<ErrorList.length; i++){
                message.channel.send(ErrorList[i]);
            }
            if(ErrorList.length == 0){
                if(args[1] == 20){
                    DyingPlayer.DeathSaves['Success'] = 0;
                    DyingPlayer.DeathSaves['Failure'] = 0;
                    DyingPlayer.Conditions['Unconscious'] = 0;
                    DyingPlayer.Stable = true;
                    DyingPlayer.HP = 1;
                    message.channel.send(`${DyingPlayer.Name} gets a second wind and recovers 1 HP!`);
                }
                else if(args[1] >= 10){
                    DyingPlayer.DeathSaves['Success'] += 1;
                    message.channel.send(`${DyingPlayer.Name} stabilizes a little.`);
                    if(DyingPlayer.DeathSaves['Success'] >= Number(3)){
                        DyingPlayer.Stable = true;
                        DyingPlayer.DeathSaves['Success'] = 0;
                        DyingPlayer.DeathSaves['Failure'] = 0;
                        message.channel.send(`${DyingPlayer.Name} has fully stabilized`);
                    }
                }
                else if(args[1] == Number(1)){
                    DyingPlayer.DeathSaves['Failure'] += 2;
                    message.channel.send(`${DyingPlayer.Name} is looking really bad!`);
                }
                else{
                    DyingPlayer.DeathSaves['Failure'] += 1;
                    message.channel.send(`${DyingPlayer.Name} takes a turn for the worse.`);
                }
                if(DyingPlayer.DeathSaves['Failure'] >= Number(3)){
                    message.channel.send(`${DyingPlayer.Name} has died!`);
                    DyingPlayer.Die();
                    Remove.execute(client, message, [DyingPlayer.Name]);
                }
            }
        }
        else{
            message.channel.send('Argument should be in the following format: <Character to Perform Save> <Death Save Value>');
        }
    }
}