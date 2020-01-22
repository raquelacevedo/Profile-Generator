const inquirer = require("inquirer");
const createHTML = require('./template.js');

// set global variables so values can be set and used in different promises
let color_bkgd = "yellow";
let color_card = "yellow";
let userName = "yellow";

// prompt user for input about which portfolio they would like to pull
inquirer.prompt([
  {
    type: "input",
    name: "username",
    message: "what user name would like to generate a profile for?"
  },
  {
    type: "list",
    message: "What color scheme would you like?",
    name: "color",
    choices: [
      "red",
      "yellow",
      "orange",
      "green",
      "blue",
      "indigo",
      "hot pink"
    ]
  }
]).then( response => {
  // console.log("Got user response", response);
  // reach out to GITHUB api to pull user data
  const axios = require("axios");
  const userid = response.username;
  userName = userid;

  // set color scheme based on user input

  switch (response.color) {
    case "red":
      color_bkgd = "#C21611"; 
      color_card = "#FF1F17"; 
      break;
    case "orange":
      color_bkgd = "#FF9D07"; 
      color_card = "#C77A06"; 
      break;
    case "yellow":
      color_bkgd = "#FFE72E"; 
      color_card = "#C7B424"; 
      break;
    case "green":
      color_bkgd = "#418054"; 
      color_card = "#83FFA8";
      break;
    case "blue":
      color_bkgd = "#80A8FF"; 
      color_card = "#6383C7"; 
      break;
    case "indigo":
      color_bkgd = "#8523C7"; 
      color_card = "#AB2EFF"; 
      break;
    case "hot pink":
      color_bkgd = "#FF40CC"; 
      color_card = "#FECAF8"; 
      break;
  }

  const config = { headers: { accept: "application/json" } };
  // call axios to get starred and portfolio data back
  axios.all ([
    axios.get(`https://api.github.com/users/${userid}`, config),
    axios.get(`https://api.github.com/users/${userid}/starred`, config)
  ]).then( responseArr => buildGitResults(responseArr[0].data,responseArr[1].data.length) ) // tidy up data returned from github
  .then( response => createHTML(response) ) // build HTML using template (populates values)
  .then( response => generatePdf(response) ) // call function to create pdf with electron-html-to
});

function buildGitResults(res,stars) {
  // console.log("Got gitHub response", res);
  // console.log("Got gitHub stars", stars);
  // tidy up results from git  merge stars query results with portfolio results
  const results = {
    color_bkgd: color_bkgd,
    color_card: color_card,
    imageLink: res.avatar_url, 
    userName: res.name,
    location: `https://google.com/maps/place/${res.location}`,
    gitHubProf: res.html_url,
    gitHubBlog: res.blog,
    bio: res.bio,
    numPubRepos: res.public_repos,
    numFollowers: res.followers,
    numStars: stars,
    numFollowing: res.following
  }
  // console.log("consolidated results",results);

  return(results);
}

// generates PDF without the navbar and background color (although it does color the cards)
function generatePdf(html) {
  // function to use electron-html-to to generate pdf from html
  console.log("generatePdf",html);
  var fs = require('fs'), convertFactory = require('electron-html-to');
  
  var conversion = convertFactory({ converterPath: convertFactory.converters.PDF });
  
  conversion({ html: html }, function(err, result) {
    if (err) {
      return console.error(err);
    }
  
    result.stream.pipe(fs.createWriteStream(`portfolio_${userName}.pdf`));
    conversion.kill(); // shuts down the stream once the file is finished wrting since we are not going to append to it
    console.log(`Your pdf file ./portfolio_${userName}.pdf is available in your current directory`);
  });

}

//funciton not called. This is an attempt to use a different package for pdf conversion. 
// it only generates the image and the header, but the background color
function generatePdf2(html) {
  let pdf = require('html-pdf');
  let options = { format: 'letter', orientation: "portrait" };

  // console.log("generatePdf2",html);
 
  // pdf.create(html, options).toFile('./businesscard.pdf', function(err, res) {
  pdf.create(html, options).toFile(`./portfolio_${userName}.pdf`, function(err, res) {
    if (err) return console.log(err);
    // console.log(res);
    console.log(`Your pdf file ./portfolio_${userName}.pdf is available in your current directory`);
  });
}