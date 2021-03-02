const FindPlayer = require('../HelperCommands/CheckRoster');
const Remove = require('../BotCommands/RemoveFromInitiative');

module.exports = {
    name: 'damage',
    description: 'Apply damage to a character.',
    execute(client, message, args){
        const DamageTarget = FindPlayer(client.characters, args[0]);
        if(args.length == 2 && isNaN(args[1]) == false){
            if(DamageTarget == false){
                message.channel.send(`${args[0]} hasn't been added yet. You can't hurt them!`);
                return;
            }
            DamageTarget.TakeDamage(message, args[1]);
            if(DamageTarget.IsAlive == false){
                Remove.execute(client, message, [DamageTarget.Name]);
            }
            return;
        }
        message.channel.send('Argument should be in the following format: <Character to Damage> <Amount of Damage>');
    }
}