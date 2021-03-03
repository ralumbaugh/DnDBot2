const Display = require('./DisplayInitiative');

module.exports = (client) = {
    name: 'next',
    description: 'Moves to the next character in initiative.',
    execute(client, message){
        try {
            client.initiative[Number(client.initiativePosition)].UpdateConditions();
        } catch (error) {
            client.initiative[Number(client.initiativePosition-1)].UpdateConditions();
        }
        if(client.initiativePosition < client.initiative.length-1){
            client.initiativePosition++;
        }
        else{
            client.initiativePosition = 0;
        }
        Display.execute(client, message);
    }
}