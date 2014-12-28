var addIdeaElement = document.getElementById('appIdea'),
ideasRem = document.getElementById('ideasRem'),
appIdeaDesc = document.getElementById('appIdeaDesc');

function getJSON(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        resolve(xhr.response);
      } else {
        reject(status);
      }
    };
    xhr.send();
  });
};

// Convert the number of ideas to word
var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

function inWords(num) {
  if ((num = num.toString()).length > 9) return 'overflow';
  n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return; var str = '';

  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]): 'zero';
  return str;
}

// Generate random idea from ideas.json file
var uniqueRandoms = [];
function generateIdea() {

  getJSON('ideas.json').then(function(data) {
    if (!uniqueRandoms.length) {
      for(var i = 0; i < data.ideas.length; i++) {
        uniqueRandoms.push(i);
      }
    }
    var index = Math.floor(Math.random()*uniqueRandoms.length);
    var randomIdea = uniqueRandoms[index];

    ideasRem.innerHTML = inWords(uniqueRandoms.length - 1);

    uniqueRandoms.splice(index, 1);
    if(uniqueRandoms.length < 1){
      addIdeaElement.innerHTML = "Sorry, I'm out of ideas."
    } else {
      addIdeaElement.innerHTML = data.ideas[randomIdea].idea;
      if(data.ideas[randomIdea].description) {
        appIdeaDesc.innerHTML = data.ideas[randomIdea].description;
      } else {
        appIdeaDesc.innerHTML = '<br/>';
      }
    }
  });
}

window.onload = generateIdea();
