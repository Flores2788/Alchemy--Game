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