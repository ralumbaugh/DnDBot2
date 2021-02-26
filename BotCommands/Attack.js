const FindPlayer = require('../HelperCommands/CheckRoster');

module.exports = {
    name: 'attack',
    description: 'Performs an attack roll on another character.',
    execute(client, message, args){
        if(args.length == 3){
            const Attacker = FindPlayer(client.characters, args[0]);
            const Defender = FindPlayer(client.characters, args[1]);
            if(Attacker != false && Defender != false && isNaN(args[2]) == false){
                message.channel.send(`${Attacker.Name} swings at ${Defender.Name}...`);
                message.channel.send(Attacker.Attack(Defender, args[2]));
                return;
            }
        }
        else if(args.length == 2){
            const Defender = FindPlayer(client.characters, args[0]);
            if(Defender != false && isNaN(args[1]) == false){
                message.channel.send(Defender.BeAttacked(args[1]));
                return;
            }

        }
        message.channel.send('Argument should be in one of the following formats: \n<Attacking Player> <Defending Player> <To Hit> \n or \n <Defending Player> <To Hit>');
    }
}