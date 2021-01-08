/**
 * Gestion de l'Embed de raid
 */
module.exports = {
    name: 'raid',
    description: 'Embed',
    execute(message, args, raidParams) {
        if(args.length > 0) { //Tentative de set
            const subCommand = args.shift().toLocaleLowerCase();
            console.log('subcommand:' + subCommand);
            if(subCommand === 'set') {
                const param = args.shift().toLocaleLowerCase();
                console.log('param 13: ' + param);
                foundIndex = raidParams.findIndex(raidParam => raidParam.name === param); 
                console.log('foundIndex: ' + foundIndex);
                if(foundIndex > -1) {
                    const value = args.join(' ');
                    if(raidParams[foundIndex].name === 'date') {
                        raidParams[foundIndex].value = Date.parse(value);
                    } else {
                        raidParams[foundIndex].value = value;
                    }
                    console.log('Raid param edited! ' + raidParams[foundIndex].name + ' has new value (' + raidParams[foundIndex].value + ').');
                } else {
                    console.log('Aucun paramètre n\'a été fourni à la commande set');
                }
            }
        } else { //Pas de paramètre, envoi de l'Embed
            //On vérifie que tous les paramètres sont définis avant d'écrire l'Embed
            let index = raidParams.findIndex(raidParam => raidParam.value === '')
            if(index < 0) {
                console.log('Envoi de l\'embed!');
            } else {
                console.log('Le paramètre ' + raidParams[index].name + ' n\'est pas défini');
            }
        }
    }
}