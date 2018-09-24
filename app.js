document.getElementById("btn1").addEventListener("click", getJokes);
number = document.getElementById("number");
fN = document.getElementById("fn");
lN = document.getElementById("ln");
lista = document.getElementById("jokes");
document.getElementById("ca").style.display = "none";

class chuckNorris {
  constructor(firstName, lastName, number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.number = number;
  }
}

function getJokes(e) {
  e.preventDefault();
  cN = new chuckNorris(fN.value, lN.value, number.value);
  ui = new UI();
  ui.getValues(cN);
}

class UI {
  getValues(chuckNorris) {
    const xhr = new XMLHttpRequest();
    //api.icndb.com/jokes/random?firstName=John&amp;lastName=Doe
    let url =
      "https://api.icndb.com/jokes/random/" +
      chuckNorris.number +
      "?firstName=" +
      chuckNorris.firstName +
      "&amp;lastName=" +
      chuckNorris.lastName;
    console.log(url);
    xhr.open("GET", `${url}`, true);
    xhr.onload = function() {
      if (this.status == 200) {
        const joke = JSON.parse(this.responseText);
        console.log(joke);
        let jokes = joke.value;
        jokes.forEach(function(element) {
          const row = document.createElement("tr");
          row.innerHTML = `
              <li><b> Joke: </b>${element.id} ${element.joke}</li>
              <br>
                        `;
          lista.appendChild(row);
        });
      }
    };
    document.getElementById("ca").style.display = "block";
    xhr.send();
  }
}
