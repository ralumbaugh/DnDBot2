module.exports = {
    name: 'smack',
    description: 'Offends the bot',
    execute(message, args) {
        message.channel.send('Heard you were talking smack!');
    }
}