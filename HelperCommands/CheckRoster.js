module.exports = (characters, player) => {
    for(let i=0; i<characters.length; i++){
        try {
            if(characters[i][0].Name == player){
                return characters[i];
            }
        } catch (error) {
            if(characters[i].Name == player){
                return characters[i];
            }
        }
    }
    return false;
}