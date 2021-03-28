
// Search demo by @AndrewMayne

function blurKey(){
    apiKeyInput.setAttribute("style", "width:100%;filter: blur(4px)");
}

var selectedEngine = "davinci";

var engines = ["davinci", "curie", "babbage", "ada"]


var classExamples = [
    {   
        title: "Load a preset example...",
        query: "",
        documents: ""
    },
    {
        title: "Tweet sentiment",
        query: "My day has been 👍",
        documents: `This tweet is positive\n###\nThis tweet is negative\n###\nThis tweet is neutral`

    },

    {
        title: "Industry category",
        query: "Uber",
        documents: `Social media
### 
Technology
###
Enterprise
###
Job placement
###
Transportation
###
Marketplace
###
Conglomerate
###
Consumer Goods
###
Food
###
Logistics
###
Restaurants`

    },
    {
        title: "Seven basic plots",
        query: "Jaws",
        documents: `Rags to Riches: 
The poor protagonist acquires power, wealth, and/or a mate, loses it all and gains it back, growing as a person as a result.
###
The Quest: 
The protagonist and companions set out to acquire an important object or to get to a location. They face temptations and other obstacles along the way.
###
Overcoming the Monster:
The protagonist sets out to defeat an antagonistic force (often evil) which threatens the protagonist and/or protagonist's homeland.
###
Voyage and Return:
The protagonist goes to a strange land and, after overcoming the threats it poses or learning important lessons unique to that location, they return with experience.
###
Comedy:
Light and humorous character with a happy or cheerful ending; a dramatic work in which the central motif is the triumph over adverse circumstance, resulting in a successful or happy conclusion.[3] Booker stresses that comedy is more than humor. It refers to a pattern where the conflict becomes more and more confusing, but is at last made plain in a single clarifying event. The majority of romance films fall into this category.
###
Tragedy:
The protagonist is a hero with a major character flaw or great mistake which is ultimately their undoing. Their unfortunate end evokes pity at their folly and the fall of a fundamentally good character.
###
Rebirth: An event forces the main character to change their ways and often become a better individual.`

    },

    {
        title: "Text content",
        query: "The raccoons were in my garbage again last night.",
        documents: `animal\n###\nfood\n###\n###\nobject\n###\nperson`

    },
    { 
        title: "Directors and movies",
        query: "The director of Wayne's World",
        documents: `James Cameron 
###
Penelope Spheeris
###
George Lucas 
###
Sophia Coppola
###
Steven Spielberg 
###
Ridley Scott
###
Christopher Nolan`
    },
    {
        title: "Movie review sentiment",
        query: "The script of this movie was probably found in a hair-ball coughed up by an old cat. Totally lame visual effects.",
        documents: `The overall sentiment of the review is negative.
###
The overall sentiment of the review is positive.
                    `
    }



]


function addEngines(){

    var drop = document.createElement('select');
    drop.classList.add("drop_list");
    drop.onchange = function(){
        selectedEngine = this.value;
    }

    var i = 0;
    engines.forEach((item)=>{
        var opt = document.createElement('option');
        opt.value = item;
        opt.innerHTML = item;
        drop.appendChild(opt);
        i ++;
    });

    engineSelect.appendChild(drop);

}

addEngines();

// apiKeyInput is the API key
// docDrop is a textarea with text (documents) separated by "###"
// textDrop is a textarea with a search query
// bestResponse is an HTML div for displaying the top most response
// reportSection is an HTML div for displaying a table of results



function addSamples(){

    var drop = document.createElement('select');
    drop.classList.add("drop_list");
    drop.onchange = function(){
        textDrop.value = classExamples[this.value].query;
        docDrop.value = classExamples[this.value].documents;
        reportSection.innerHTML = "";
    }

    var i = 0;
    classExamples.forEach((item)=>{
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = item.title;
        drop.appendChild(opt);
        i ++;
    });

    sampleSection.appendChild(drop);
}

 

addSamples();

function apiSearch(){

    if(apiKeyInput.value == ""){
        alert("Please add your API key")
    } else {
    
     

    var documents = docDrop.value.split("###").map(Function.prototype.call, String.prototype.trim);
    console.log(documents);
    reportSection.innerHTML = "";
    var _data = {
                    "documents": documents,
                    "query": textDrop.value
                };
    
    var _headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${apiKeyInput.value}`
    };

    $.ajax({
    type:'POST',
    url: `https://api.openai.com/v1/engines/${selectedEngine }/search`,
    dataType:'JSON',
    headers: _headers,
    data: JSON.stringify(_data),
        success:function(result){
       
        
        var resultData = document.createElement("div");
        resultData.setAttribute("style", "margin-top: 40px;padding:20px;background-color:#edf5fa");
        
        
        result.data.sort(function (x, y) {
            return y.score - x.score;
        });
                

        var firstResponse = "";
        var topScore = 0;
        var secondTopScore = 0;
         
        result.data.forEach((item) => {
            var rowData = documents[item.document];
            var score = item.score

            if(firstResponse == ""){
                firstResponse = rowData;
            }
            
            var div = document.createElement("div");
            div.setAttribute("style", "border-bottom: solid .5px grey;margin-bottom:14px;");
            div.innerHTML = score + " " + rowData;
            resultData.appendChild(div);


            if(topScore != 0 && secondTopScore == 0){
                secondTopScore = score;
            }

            if(topScore == 0){
                topScore = score;
            }


        });
        
        var bestResponse = document.createElement("div");
        bestResponse.id = "bestResponse";
        bestResponse.innerHTML = firstResponse.split(":")[0]

        reportSection.appendChild(bestResponse);
        reportSection.appendChild(resultData);

        function scoring(){
            var _score = document.createElement('div');
            _score.id = "scoreData";
            _score.innerHTML = `
            Top score difference: ${ (topScore - secondTopScore) / topScore * 100}%`;
            reportSection.appendChild(_score);
        }

    
        }
    });

    }


}



