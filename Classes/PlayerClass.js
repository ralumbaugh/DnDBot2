const Discord = require('discord.js');

module.exports = class Player {
    constructor(Name, HP, AC, Dex){
        this.Name = Name;
        this.HP = HP;
        this.MaxHP = HP;
        this.AC = AC;
        this.Dex = Dex;
        this.Initiative = false;
        this.IsAlive = true;
        this.DeathSaves = {'Success':0, 'Failure':0};
        this.Stable = true;
        this.Conditions = {
            "Blinded" : 0,
            "Charmed" : 0,
            "Deafened" : 0,
            "Exhaustion" : 0,
            "Frightened" : 0,
            "Grappled" : 0,
            "Incapacitated" : 0,
            "Invisible" : 0,
            "Paralyzed" : 0,
            "Petrified" : 0,
            "Poisoned" : 0,
            "Prone" : 0,
            "Restrained" : 0,
            "Stable" : true,
            "Stunned" : 0,
        }
        this.DodgeMessage = [
          `${this.Name} dodges out of the way just in the nick of time!`,
          `${this.Name} is just too fast!`
        ]
        this.BlockMessage = [
          `The hit connects, but ${this.Name}'s armor absorbs the impact.`,
          `${this.Name} parries the strike away, avoiding all damage.`
        ]
    }

    ShowStats(){
    return `${this.Name} has the following stats: HP=${this.HP}, Max HP=${this.MaxHP}, AC=${this.AC}, Dex bonus=${this.Dex}`;
    }

    ResetConditions(){
        this.Conditions = {
            "Blinded" : 0,
            "Charmed" : 0,
            "Deafened" : 0,
            "Exhaustion" : 0,
            "Frightened" : 0,
            "Grappled" : 0,
            "Incapacitated" : 0,
            "Invisible" : 0,
            "Paralyzed" : 0,
            "Petrified" : 0,
            "Poisoned" : 0,
            "Prone" : 0,
            "Restrained" : 0,
            "Stunned" : 0,
            "Unconscious" : 0,
        }
    }
    
    BeAttacked(toHit) {
        if(isNaN(toHit)){
            return `Please input a number for your to hit bonus.`
        }
        let DexDifference = this.AC - this.Dex;
        if(Number(toHit) >= Number(this.AC))
        {
            // Attacker hit defender
            return `${this.Name} got hit.`
        }
        else if(Number(toHit) >= Number(DexDifference))
        {
            // Defender only blocked due to combination of Dex + AC. Dex itself wasn't enough, therefor no dodge.
            return this.BlockMessage[Math.floor(Math.random() * this.BlockMessage.length)];
        }
        else
        {
            // Defender could have avoided with dexterity only.
            return this.DodgeMessage[Math.floor(Math.random() * this.DodgeMessage.length)];
        }
    }

    Attack(target, toHit) {
        return target.BeAttacked(toHit);
    }

    Die() {
        this.Conditions['Unconscious'] = true;
        this.IsAlive = false;
    }

    TakeDamage(message, amount) {
        if(Number(this.HP) > 0){
            message.channel.send(`${this.Name} takes ${amount} damage.`);
            this.HP -= amount;
            if(Number(this.HP) > 0){
                message.channel.send(`${this.Name} has ${this.HP} HP left!`);
                return;
            }
            else if(Number(this.HP) > (0-Number(this.MaxHP))){
                this.HP = 0;
                this.Conditions['Unconscious'] = true;
                this.Stable = false;
                message.channel.send(`${this.Name} has fallen unconscious!`);
                return;
            }
            this.Die();
            message.channel.send(`That much damage kills ${this.Name} outright.`);
            return;
        }
        else if(this.IsAlive){
            if(Number(amount) >= Number(this.MaxHP)){
                this.Die();
                message.channel.send(`${this.Name} takes the hit. ${this.Name} has died`);
                return;
            }
            this.Stable = false;
            message.channel.send(`${this.Name}'s unconscious body takes the hit.`);
        }
    }

    UpdateConditions() {
        for(let [key, value] of Object.entries(this.Conditions)){
            if(value != 0 && value !== true){
                this.Conditions[key] = value-=1;
            }
        }
    }

    DisplayCard() {
        const CharacterCard = new Discord.MessageEmbed();
        CharacterCard.setTitle(this.Name);
        if(this.Initiative != false){
            CharacterCard.addField('Initiative', this.Initiative);
        }
        if(this.Conditions['Unconscious'] == true){
            CharacterCard.setColor('#ff0000');
            let DeathSaveSuccessMessage = '';
            let DeathSaveFailureMessage = '';
            for(let i=0; i< 3; i++){
                if(this.DeathSaves.Success <= i){
                    DeathSaveSuccessMessage += ' [ ] ';
                }
                else{
                    DeathSaveSuccessMessage += ' [X] ';
                }
                if(this.DeathSaves.Failure <= i){
                    DeathSaveFailureMessage += ' [ ] ';
                }
                else{
                    DeathSaveFailureMessage += ' [X] ';
                }
            }
            CharacterCard.addField('Death Saves', `Successes: ${DeathSaveSuccessMessage} \n Failures: ${DeathSaveFailureMessage}`);
        }
        else{
            CharacterCard.setColor('#0099ff');
            CharacterCard.addField('HP', `${this.HP}/${this.MaxHP}`);
            CharacterCard.addField('AC', this.AC);
            let ConditionsToDisplay = '';
            for(let [key, value] of Object.entries(this.Conditions)){
                if(value != 0 && ConditionsToDisplay.length == 0){
                    if(value === true){
                        ConditionsToDisplay = `${key}: Until Treated`;
                    }
                    else{
                        ConditionsToDisplay = `${key}: ${value} turns`;
                    }
                }
                else if(value!=0){
                    if(value === true){
                        ConditionsToDisplay += `, ${key}: Until Treated`;
                    }
                    else{
                        ConditionsToDisplay += `, ${key}: ${value} turns`;
                    }
                }
            }
            if(ConditionsToDisplay.length != 0){
                CharacterCard.addField('Conditions', ConditionsToDisplay);
            }
        }
        return CharacterCard;
    }
}