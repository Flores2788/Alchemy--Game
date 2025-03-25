import axios from "axios";
import fs from "fs";
import readline from "readline-sync";
import open from "open";

const playerName = "your_uia_email@uia.no";  
const baseUrl = "https://alchemy-kd0l.onrender.com";  
const solutionsFile = "solutions.json";  
const skeletonKeyFile = "skeletonKey.txt";  


async function startGame() {
    try {
        const response = await axios.get(`${baseUrl}/start?player=${playerName}`);
        console.log("New Challenge:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error starting game:", error.message);
    }
}
function loadSolutions() {
  try {
    return JSON.parse(fs.readFileSync(solutionsFile));
  } catch (error) {
    return {};
  }
    }
  
    function saveSolution(challenge, answer) {
        const solutions = loadSolutions();
        solutions[challenge] = answer;
        fs.writeFileSync(solutionsFile, JSON.stringify(solutions, null, 2));
    }

    async function getChallenge() {
        try {
        const response = await axios.get(`${baseUrl}/challenge/${playerName}`);
        console.log("Challenge:", response.data);
        return response.data;
    }   catch (error) {
        console.error("Failed to get challenge:", error);
        process.exit(1);
    }
    }

    async function submitAnswer(challenge, answer) {
        try {
            const response = await axios.post(`${baseUrl}/answer`, {
                player: playerName,
                answer: answer
            });
    
            if (response.data.correct) {
                console.log("Correct! Next challenge:", response.data.next);
                saveSolution(challenge, answer);
    
                if (response.data.finalKey) {
                    fs.writeFileSync(skeletonKeyFile, response.data.finalKey);
                    console.log("Final Key saved in skeletonKey.txt!");
                }
    
                return response.data.next;
            } else {
                console.log("Incorrect! Try again.");
            }
        } catch (error) {
            console.error("Error submitting answer:", error.message);
        }
    }

    async function getClue() {
        try {
            const response = await axios.get(`${baseUrl}/clue?player=${playerName}`);
            console.log("Clue URL:", response.data);
            open(response.data);
        } catch (error) {
            console.error("Error getting clue:", error.message);
        }
    }

    async function main() {
        let challenge = await startGame();
        const solutions = loadSolutions();
    
        while (challenge) {
            if (solutions[challenge]) {
                console.log("Using saved answer:", solutions[challenge]);
                challenge = await submitAnswer(challenge, solutions[challenge]);
            } else {
                let action = readline.question("Type answer, 'clue' to get a hint, or 'exit' to quit");
    
                if (action.toLowerCase() === "clue") {
                    await getClue();
                } else if (action.toLowerCase() === "exit") {
                    console.log("Exiting. Ciao!");
                    break;
                } else {
                    challenge = await submitAnswer(challenge, action);
                }
            }
        }
    }
    

    main();
