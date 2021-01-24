// change content after submitting how user feels 
let feeling;
$('#feelings').submit(function(e) {
    e.preventDefault();
    feeling = $('#feelings input[type=text]').val();
    let question = document.getElementById("question");
    // change question (MAKE SURE THAT USER ACTUALLY INPUTS SOMETHING AND THAT IT ANSWERS QUESTION)
    question.innerHTML = "do you want me to guide you, or do you want to seek your own adventures?";
    // change to options
    let options1 = `
        <div id="options">
            <button>guide me, please</button>
            <button id="self-guide">no, i'm fine by myself</button>
        </div>
    `;
    $("#feelings").replaceWith(options1);
});

// change content after choosing self-guide option
$(document).on("click", "#self-guide", function() {
    let options2 = `
        <div id="options-2">
            <button id="meditate-op">meditation/breathing</button>
            <button id="activites-op">fun/relaxing activites</button>
            <button id="journal-op">journal</button>
            <button id="wholesome-op">wholesome pictures</button>
            <button id="panic-op">panic button</button>
        </div>
    `;
    $('#options').replaceWith(options2); 
});

// go to jounral
$(document).on("click", "#journal-op", function() {
    let journal = `
        <form id="journal">
            <textarea placeholder="write about your day..."></textarea>
            <input class="submit" type="submit" value="submit">
        </form>
    `;
    $('#options-2').replaceWith(journal);
    let question = document.getElementById("question");
    // change question
    question.innerHTML = "journal";
});

// go to animal photos
$(document).on("click", "#wholesome-op", function() {
    get_animal();
    let animals = `
        <div id="animal">
            <div id="animal-img"></div>
            <button id="generate-animal">generate animal</button>
        </div>
    `;
    $('#options-2').replaceWith(animals);
    let question = document.getElementById("question");
    // change question
    question.innerHTML = "animals";
});

$(document).on("click", "#generate-animal", function() {
    get_animal();
})

function ajax_get(url, callback) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        console.log('responseText:' + xmlhttp.responseText);
        try {
          var data = JSON.parse(xmlhttp.responseText);
        } catch (err) {
          console.log(err.message + " in " + xmlhttp.responseText);
          return;
        }
        callback(data);
      }
    };
  
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function get_animal() {
    ajax_get('https://api.thecatapi.com/v1/images/search?size=full', function(data) {
        // document.getElementById("id").innerHTML = data[0]["id"];
        // document.getElementById("url").innerHTML = data[0]["url"];

        var html = '<img src="' + data[0]["url"] + '">';
        document.getElementById("animal-img").innerHTML = html;
    });
}

// panic button
$(document).on("click", "#panic-op", function() {
    let journal = `
        <button id="panic">panic</button><br>
        <button id="panic-reset">reset</button>
    `;
    $('#options-2').replaceWith(journal);
    let question = document.getElementById("question");
    // change question
    question.innerHTML = "here's a panic button for you!";
});

// heart pop
$(document).on("click", "#panic", function () {
    insertHeart();
})

function insertHeart() {
    var imgDestination = document.body;
    var heart = document.createElement("img");
    heart.className = "heart";
    heart.src = "/images/heart.png";
    imgDestination.appendChild(heart);
    randomPosition(heart);
}


function randomPosition(img) {
    var left = Math.floor((Math.random() * 95) + 1)+"vw";
    var top = Math.floor((Math.random() * 95) + 1)+"vh";
    var imagestyle = img.style;
    imagestyle.position = "absolute";
    imagestyle.top = top;
    imagestyle.left = left;
}

// reset hearts
$(document).on("click", "#panic-reset", function() {
    let heart = document.getElementsByClassName("heart");
    while (heart[0]) {
        heart[0].parentNode.removeChild(heart[0]);
    }
})