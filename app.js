const containerDiv = document.querySelector(".container");
const searchBtn = document.querySelector("#search-btn");
const queryInput = document.querySelector(".query");

async function getNewsData(userQuery) {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/everything?q=${userQuery}&sortBy=popularity&apiKey=dce92b0fb4094b9581d681cb602d8650` //template-literal
    );
    const data = await res.json();
    containerDiv.innerText = "";
    data.articles.map((article) => handleArticles(article));
  } catch (error) {
    console.log(error);
  }
}

function handleArticles(article) {
  const div = document.createElement("div");
  const heading = document.createElement("h2");
  const img = document.createElement("img");
  const para = document.createElement("p");
  const link = document.createElement("a");

  const { author, title, urlToImage, url } = article;

  heading.innerText = title;
  para.innerText = author;
  link.innerText = "Read More";
  link.href = url;
  img.src = urlToImage;

  div.classList.add("article");
  heading.classList.add("title");
  link.classList.add("btn");

  div.append(heading, para, link, img);
  containerDiv.append(div);
}

searchBtn.addEventListener("click", handleClick);

function handleClick() {
  const query = queryInput.value;
  getNewsData(query);
}
