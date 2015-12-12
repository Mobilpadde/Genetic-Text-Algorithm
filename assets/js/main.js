$(document).ready(function(){
    if(!/#!\/.+/gi.test(window.location.hash)){
        window.location.hash = "#!/Kitteh is Cat";
        window.location.reload();
    }else{
        var phrase = window.location.hash.replace("#!/", "");
            population = [],
            rate = 0.25,
            generation = 0,
            interval = null,
            mutate = function(){
                var a = [0, 0], b = [0, 0],
                    overall = 0;

                for(var i in population){
                    if(a[0] < population[i].fitness()) a = [population[i].fitness(), i];
                    overall += population[i].fitness();
                }

                for(var i in population){
                    if(i != a[1] && b[0] < population[i].fitness()) b = [population[i].fitness(), i];
                }

                a = population[a[1]];
                b = population[b[1]];

                var child = a.crossover(b);
                child.mutate();

                population.push(child);
                $("#overall").text((overall / population.length).toFixed(5));
                $("#best").text(a.phrase());
                if(a.phrase() == $("#original").text()) clearInterval(interval);
                generation++;
            },
            putLatestPhrase = function(){
                var latest = population[population.length - 1].phrase();

                $("#generation").text(generation);
                $("<li>").text(latest).prependTo("#phrases");
            }

        $("#rate").text((rate * 100) + "%");
        $("#original").text(phrase);

        population.push(new DNA(phrase, rate));
        putLatestPhrase();

        population.push(new DNA(phrase, rate));
        putLatestPhrase();

        interval = setInterval(function(){
            mutate();
            putLatestPhrase();
        }, 250);

        new HashChange(250);
    }
});
