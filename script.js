window.addEventListener('DOMContentLoaded', (event) => {

    document.getElementById("wordSubmit").addEventListener("click", function (event) {
        event.preventDefault();

        let val = document.getElementById("wordInput").value
    
        const word = val
        const language = "en"

        const url = "https://rhymebrain.com/talk?function=getRhymes&word=" + word + "&lang=" + language + "&maxResults=250";
        fetch(url)
            .then(function (response) {
                return response.json();
            }).then(function (json) {

                let noResults = "NONE"
                document.getElementById("results1").innerHTML = noResults
                document.getElementById("results2").innerHTML = noResults
                document.getElementById("results3").innerHTML = noResults
                document.getElementById("results4").innerHTML = noResults

                // Filter results for only clean, perfect rhymes
                const hunnets = json.filter(getOnly300)
                const nexts = hunnets.filter(cleaning);
                const finals = nexts.filter(getFreq16);
                
                console.log(json)
                console.log(finals)

                // Organize results into categories based on syllables (1, 2, 3, more)
                const ones = finals.filter(oneSyllable)
                const twos = finals.filter(twoSyllables)
                const threes = finals.filter(threeSyllables)
                const mores = finals.filter(moreSyllables)

                // String the arrays together
                let oneSyllableString = ""
                let twoSyllableString = ""
                let threeSyllableString = ""
                let moreSyllableString = ""
                for (let i = 0; i < ones.length; ++i)   oneSyllableString += "<div class=\"w-contained\">" + capitalize(ones[i].word) + "</div>"
                for (let i = 0; i < twos.length; ++i)   twoSyllableString += "<div class=\"w-contained\">" + capitalize(twos[i].word) + "</div>"
                for (let i = 0; i < threes.length; ++i) threeSyllableString += "<div class=\"w-contained\">" + capitalize(threes[i].word) + "</div>"
                for (let i = 0; i < mores.length; ++i)  moreSyllableString += "<div class=\"w-contained\">" + capitalize(mores[i].word) + "</div>"

                // Output strings to DOM
                if (oneSyllableString != "") document.getElementById("results1").innerHTML = oneSyllableString
                if (twoSyllableString != "") document.getElementById("results2").innerHTML = twoSyllableString
                if (threeSyllableString != "") document.getElementById("results3").innerHTML = threeSyllableString
                if (moreSyllableString != "") document.getElementById("results4").innerHTML = moreSyllableString
            });

    });
});

function oneSyllable(item)
{
    return item.syllables == "1"
}
function twoSyllables(item)
{
    return item.syllables == "2"
}
function threeSyllables(item)
{
    return item.syllables == "3"
}
function moreSyllables(item)
{
    return parseInt(item.syllables) > 3
}


function cleaning(abject)
{
    return abject.flags == "bc"
}
function getOnly300(bbject)
{
    return bbject.score == 300
}
function getFreq16(ccject)
{
    return ccject.freq > 15
}

function capitalize(word)
{
    let newWord =  word.toUpperCase().charAt(0) + word.substring(1, word.length);
    return newWord
}