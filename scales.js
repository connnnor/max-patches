/// scales.js
//
// Returns notes in a specified key
//
// input is key (e.g. C,Db,D, etc.) 
// output is message with notes
//
// inlets and outlets
inlets = 1;
outlets = 2;
// global variables
//
// Convert between note names and midi numbers
var keyToNote = {}; // C8  == 108
var noteToKey = {}; // 108 ==  C8
function initDicts() {
    var A0 = 0x15; // first note
    var C8 = 0x6C; // last note
    var number2key = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    for (var n = A0; n <= C8; n++) {
        var octave = (n - 12) / 12 >> 0;
        var name = number2key[n % 12] + octave;
        keyToNote[name] = n;
        noteToKey[n] = name;
    }
}
// Notes in each key
var notesInKey = {
"C" : ["C", "D", "E", "F", "G", "A", "B"],
"Db": ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
"D" : ["D", "E", "Gb", "G", "A", "B", "Db"],
"Eb": ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
"E":  ["E", "Gb", "Ab", "A", "B", "Db", "Eb"],
"F":  ["F", "G", "A", "Bb", "C", "D", "E"],
"Gb": ["Gb", "Ab", "Bb", "B", "Db", "Eb", "F"],
"G":  ["G", "A", "B", "C", "D", "E", "Gb"],
"Ab": ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
"A":  ["A", "B", "Db", "D", "E", "Gb", "Ab"],
"Bb": ["Bb", "C", "D", "Eb", "F", "G", "A"],
"B":  ["B", "Db", "Eb", "E", "Gb", "Ab", "Bb"],
};
initDicts();
// helper methods
//
// max methods
//
var state = {"octave" : 4, "key" : "C"};
function octave(oct)
{
  if(arguments.length==1) {
  // no movie specified, so open a dialog
    state["octave"] = oct;
  }
}

function key(k)
{
  if(arguments.length==1) {
    state["key"] = k;
  }
}
function bang()
{
   var notes = [];
   var notesStr = [];
    k = state["key"];
    oct = state["octave"];
    prevN = "";
    for(i = 0; i < 7; i++) {
        n = notesInKey[k][i];
        if ((prevN == "B" || prevN == "Bb") && 
            (n == "C" || n == "Db")) {
            oct += 1;
        }
        notesStr[i] =  n + oct;
        notes[i] = keyToNote[notesStr[i]];
        prevN = n;
    }
    outlet(0, notes);
    outlet(1, notesStr);
   post("key: " + state["key"]);
   post("octave: " + state["octave"]);
   post();
}

