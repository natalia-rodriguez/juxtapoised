var faveQuotes = [
    '"Style is optimisim made visual"',
    '"Inspiration exists, it just has to find you working. -Pablo Picasso"',
    '"Oy with the poodles already" -Lorelai Gilmore',
    '"Anything is possible if you\'ve got enough nerve" -JK Rowling',
    '"Listen to the mustn\'ts, child. Listen to the don\'ts. Listen to the shouldn\'ts, the impossibles, the won\'ts. Listen to the never haves, then listen close to me... Anything can happen, child. Anything can be." -Shel Silverstein',
    '"Never let go of that fiery sadness called desire." -Patti Smith',
    '"Pies, para qué los quiero, si tengo alas para volar." -Frida Khalo'
];
var randomNumber = Math.floor(Math.random()*faveQuotes.length);
var quote = document.getElementById("quote");

document.getElementById("quote").innerHTML = faveQuotes[randomNumber];
quote.setAttribute('src', faveQuotes[randomNumber]);