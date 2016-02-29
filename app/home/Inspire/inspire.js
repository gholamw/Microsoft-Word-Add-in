//var json = require('/Users/SamGholam/Desktop/cheerio-example/animals.json'); //(with path)
//var request = require('request');
//var txtFile = require('file');
//var json = /Users/SamGholam/Desktop/cheerio-example/animals.json;
//console.log("THE WORD IS" , json);

var word1 = 3;
var word2 = 4;
var word3 = 23; 
var animals = ["cat", "dog", "bird", "penguin", "camel" , "sheep", "cow" , "Abyssinian","Adelie Penguin","Affenpinscher","Afghan Hound","African Bush Elephant","African Civet","African Clawed Frog","African Forest Elephant","African Palm Civet","African Penguin","African Tree Toad","African Wild Dog","Ainu Dog","Airedale Terrier ","Akbash","Akita","Alaskan Malamute","Albatross","Aldabra Giant Tortoise","Alligator","Alpine Dachsbracke","American Bulldog","American Cocker Spaniel","American Coonhound","American Eskimo Dog","American Foxhound","American Pit Bull Terrier","American Staffordshire Terrier","American Water Spaniel","Anatolian Shepherd Dog","Angelfish","Ant","Anteater","Antelope","Appenzeller Dog","Arctic Fox","Arctic Hare","Arctic Wolf","Armadillo","Asian Elephant","Asian Giant Hornet","Asian Palm Civet","Asiatic Black Bear","Australian Cattle Dog","Australian Kelpie Dog","Australian Mist","Australian Shepherd","Australian Terrier","Avocet","Axolotl","Aye Aye ","Baboon","Bactrian Camel","Badger","Balinese","Banded Palm Civet","Bandicoot","Barb","Barn Owl","Barnacle","Barracuda","Basenji Dog","Basking Shark","Basset Hound","Bat","Bavarian Mountain Hound","Beagle","Bear","Bearded Collie","Bearded Dragon","Beaver","Bedlington Terrier","Beetle","Bengal Tiger","Bernese Mountain Dog","Bichon Frise","Binturong","Bird","Birds Of Paradise","Birman","Bison","Black Bear","Black Rhinoceros","Black Russian Terrier","Black Widow Spider","Bloodhound","Blue Lacy Dog","Blue Whale","Bluetick Coonhound","Bobcat","Bolognese Dog","Bombay","Bongo","Bonobo","Booby","Border Collie","Border Terrier","Bornean Orang-utan","Borneo Elephant","Boston Terrier","Bottle Nosed Dolphin","Boxer Dog","Boykin Spaniel","Brazilian Terrier","Brown Bear","Budgerigar","Buffalo","Bull Mastiff","Bull Shark","Bull Terrier","Bulldog","Bullfrog","Bumble Bee","Burmese","Burrowing Frog","Butterfly","Butterfly Fish","Caiman","Caiman Lizard","Cairn Terrier","Camel","Canaan Dog","Capybara","Caracal","Carolina Dog","Cassowary","Cat","Caterpillar","Catfish","Cavalier King Charles Spaniel","Centipede","Cesky Fousek","Chameleon","Chamois","Cheetah"];
getRandomWords();


  function getRandomWords(){
  	

  	//var randomInt = parseInt((Math.random() * 50), 10);
  	 //var random Math.random() * (max - min) + min;
  	 var random1 = Math.floor(Math.random() * ((animals.length -2)+1) + 2);
  	 var random2 = Math.floor(Math.random() * ((animals.length -2)+1) + 2);
  	 var random3 = Math.floor(Math.random() * ((animals.length -2)+1) + 2);




//for(var i = 0; i<json.length; i++){


//}//for


// var mydata = JSON.parse(json[5]);

 var word1el = document.getElementById("word1");
 var word2el = document.getElementById("word2");
 var word3el = document.getElementById("word3");
//console.log(mydata[0

//word1el.innerHTML = mydata;
word1el.innerHTML = animals[random1];
word2el.innerHTML = animals[random2];
word3el.innerHTML = animals[random3];

  }//getRandomWords
