import axios from "axios";
import fs from "fs";
import readline from "readline-sync";
import open from "open";

const playerName = "your_uia_email@uia.no";  // Replace with your UiA email
const baseUrl = "https://alchemy-kd0l.onrender.com";  // API base URL
const solutionsFile = "solutions.json";  // Stores previous answers
const skeletonKeyFile = "skeletonKey.txt";  // Stores final puzzle key

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
        const response = await axios.get(`${baseUrl}/challenge/${playerName}`);
        console.log("Challenge:", response.data);
        return response.data;
    }   catch (error) {
        console.error("Failed to get challenge:", error);
        process.exit(1);
    }