module.exports = {
    name: 'delete',
    description: 'Deletes messages',
    execute(client, message, args) {
        if(args.length == 1 && isNaN(args[0]) == false && args[0] > 1 && args[0] <= 100){
            message.channel.bulkDelete(args[0]);
            return;
        }
        message.channel.send('Argument should be in the following format: <Number of message to delete, between 2 and 100>');
    }
}