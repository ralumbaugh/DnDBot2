const Discord = require('discord.js');
const PlayerCard = require('./Display');

module.exports = (client) = {
    name: 'displayinitiative',
    description: 'Displays the current initiative order.',
    execute(client, message){
        const InitiativeCard = new Discord.MessageEmbed();
        InitiativeCard.setColor('#ff0000');
        InitiativeCard.setTitle('Initiative Order');
        for(let i=client.initiativePosition; i<client.initiative.length; i++){
            const Character = client.initiative[i];
            PlayerCard.execute(client, message, [`${Character.Name}`]);
        }
        message.channel.send('~~~~~~~~~~ New Round ~~~~~~~~~~');
        for(let i=0; i<client.initiativePosition; i++){
            const Character = client.initiative[i];
            PlayerCard.execute(client, message, [`${Character.Name}`]);
        }
        return;
    }
}