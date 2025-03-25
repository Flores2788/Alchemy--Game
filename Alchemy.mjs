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