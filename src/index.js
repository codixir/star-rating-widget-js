import "./styles.css";

class Stars {
  constructor(
    className = "",
    numOfStars = 0,
    styleOptions = { margin: "5px" }
  ) {
    this.isValid = false;
    this.numOfStars = numOfStars;
    this.stars = [];
    this.styleOptions = styleOptions;
    this.starsContainer = document.querySelector(className);

    try {
      if (this.starsContainer) {
        this.className = className;
        this.isValid = true;
      } else {
        this.isValid = false;
        throw new Error(`${className} does not exist.`);
      }
    } catch (e) {
      console.log(e.message);
    }

    if (this.isValid && this.numOfStars > 0) {
      this.init();
    }
  }

  init() {
    const ul = document.createElement("ul");

    for (let i = 0; i < this.numOfStars; i++) {
      this.stars.push({ id: i + 1 });
    }

    ul.style.listStyleType = "none";
    ul.style.display = "flex";

    const stars = this.stars.map((star) => {
      const li = document.createElement("li");
      const a = document.createElement("a");

      li.style.margin = this.styleOptions.margin;
      a.style.cursor = "pointer";

      a.innerHTML = "&#9733";
      a.id = star.id;

      a.addEventListener("click", (e) => {
        this.setRating(ul, e);
      });

      li.appendChild(a);
      return li;
    });

    const fragment = document.createDocumentFragment();

    for (const star of stars) {
      fragment.appendChild(star);
    }

    ul.appendChild(fragment);
    this.starsContainer.appendChild(ul);
  }

  setRating(ul, e) {
    const listItems = ul.querySelectorAll("li");
    const currentId = Number(e.target.id);

    for (const item of listItems) {
      const a = item.querySelector("a");
      a.style.color = "";
      if (a.id <= currentId) {
        a.style.color = "#ccac00";
      } else {
        a.style.color = "";
      }
    }
  }
}

// Usage
const stars1 = new Stars(".stars-container1", 11);
