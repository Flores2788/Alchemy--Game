//CHALLENGE 1
const symbolTable = {
    '☉': 'Gold',    
    '☿': 'Quicksilver',  
    '☽': 'Silver',   
    '♂': 'Iron',     
};


function decodeSymbols(symbolString) {
    let decoded = '';
    
 
    for (let symbol of symbolString) {
        if (symbolTable[symbol]) {
            decoded += symbolTable[symbol]; 
        } else {
            decoded += '?'; 
        }
    }
    
    return decoded;
}

const symbolString = "☉☿☽♂☉";
const decodedCode = decodeSymbols(symbolString);

console.log("Decoded Code:", decodedCode);

//CHALLENGE 2
function solveAcrostic(poem) {
    let acrostic = '';
    for (let char of poem) {
        if (char === char.toUpperCase() && char !== ' ') {
            acrostic += char;
        }
    }
    return acrostic;
}

const poem = `
Still flows the Icy Lethe Veiling all neath Eldritch Rime
`;

const solution = solveAcrostic(poem);

console.log("Acrostic Solution:", solution);
