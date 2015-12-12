DNA = (function(target, rate){
    var genes = [];

    for(var i in target){
        genes.push(~~(Math.random() * (127 - 32) + 32));
    }

    return {
        genes: genes,
        changeGene: function(index, to){
            genes[index] = to;
        },
        fitness: function(){
            var score = 0, divBy = 0;
            for(var i in genes){
                if(String.fromCharCode(genes[i]) == target[i]) score++;
                else if(String.fromCharCode(genes[i]).toLowerCase() == target[i].toLowerCase()) score += 0.5;
            }

            return Math.pow(score / (target.length + (target.length * 0.5)), 2);
        },
        crossover: function(partner){
            var child = new DNA(target, rate),
                midpoint = ~~(Math.random() * target.length);

            for(var i = 0; i < target.length; i++){
                if(i < midpoint) child.changeGene(i, genes[i]);
                else child.changeGene(i, partner.genes[i]);
            }

            return child;
        },
        mutate: function(){
            for(var i = 0; i < target.length; i++){
                if(Math.random() < rate && String.fromCharCode(genes[i]) != target[i]){
                    genes[i] = ~~(Math.random() * (127 - 32) + 32);
                }
            }
        },
        phrase: function(){
            var phrase = "";
            for(var i in genes) phrase += String.fromCharCode(genes[i]);

            return phrase;
        }
    }
});
