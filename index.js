
const request = require("request");

const { contextBridge, ipcRenderer } = require("electron");

const options = {
  url: 'https://api.api-ninjas.com/v1/quotes?category=knowledge',
  headers: {
    'X-Api-Key': 'QFZuesJM7gSNdHCOpWPptw==QPBXOi0XTrwEzAFw'
  }
};
setInterval(() => {
  request(options, function (error, response, body) {
    let bodyJson = JSON.parse(body);
    document.getElementById("author").innerHTML = bodyJson[0].author
    document.getElementById("category").innerHTML = bodyJson[0].category
    document.getElementById("root").innerHTML = bodyJson[0].quote
    let saveButton = document.getElementById('btn');
    saveButton.style.marginTop="10px"
    saveButton.disabled = false
  });
}, 5000);
var quoteData = [];
var info;

setInterval(() => {

}, 6000);
document.getElementById('btn').addEventListener('click', () => {
  let autherName = document.getElementById("author").innerHTML;
  let category = document.getElementById("category").innerHTML;
  let quote = document.getElementById("root").innerHTML;
  info = {
    "autherName": autherName,
    "category": category,
    "quote": quote
  }
  quoteData.push(info);
  const outerDiv = document.getElementById("outer");
  outerDiv.style.display = "flex"
  outerDiv.style.flexDirection = "row"
  outerDiv.style.gap = "20px"
  outerDiv.style.margin = "20px 30px";
  outerDiv.style.flexWrap = 'wrap'

  const newDiv = document.createElement("div");

  const h3 = document.createElement("h3");
  h3.innerHTML = info.autherName;

  const para = document.createElement("p");
  para.innerHTML = info.quote;

  newDiv.appendChild(h3);
  newDiv.appendChild(para);

  newDiv.style.backgroundColor = '#FC6C85';
  newDiv.style.color = '#FFFFFF';
  newDiv.style.border = '1px solid #ccc';
  newDiv.style.padding = '10px';
  newDiv.style.width = '200px';
  newDiv.style.textAlign = 'center';
  newDiv.style.fontSize = '16px';
  newDiv.style.marginBottom = '10px'; // Add some spacing between divs

  outerDiv.appendChild(newDiv);
})

ipcRenderer.on('message-from-main', (event, data) => {
  let reciveData = data.key; // { key: 'value' }
  console.log(reciveData);
  // Process the data received from the main process here
});