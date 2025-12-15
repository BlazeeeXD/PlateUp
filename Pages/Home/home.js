/**
 * Represents a single Category.
 */
class Category {
  constructor(name, image, gradientClass) {
    this.name = name;
    this.image = image;
    this.gradientClass = gradientClass;
  }

  /**
   * Renders the HTML for a single category item.
   */
  render() {
    return `
      <div class="category-item">
        <div class="category-image-wrapper ${this.gradientClass}">
          <img src="${this.image}" alt="${this.name}" class="category-image">
          <p class="category-name">${this.name}</p>
        </div>
      </div>`;
  }
}

/**
 * Represents a single Recipe Card.
 */
class RecipeCard {
  constructor(title, image, time, type) {
    this.title = title;
    this.image = image;
    this.time = time;
    this.type = type;
  }

  /**
   * Renders the HTML for a single recipe card.
   */
  render() {
    return `
      <div class="recipe-card">
        <div class="recipe-image-frame">
          <img src="${this.image}" alt="${this.title}" class="recipe-image">
        </div>
        <h3 class="recipe-title">${this.title}</h3>
        <div class="recipe-meta">
          <div class="recipe-author">
            <img src="assessts/Clock timer.png" alt="Time" class="author-avatar">
            <span>${this.time}</span>
            <img src="assessts/ForkKnife.png" alt="Type" class="type-timer">
            <span>${this.type}</span>
          </div>
        </div>
      </div>`;
  }
}

// --- Main execution ---

document.addEventListener("DOMContentLoaded", () => {
  const categoryGrid = document.querySelector(".category-grid");
  const recipeGrid = document.querySelector(".recipe-grid");
  const newsletterButton = document.querySelector(".newsletter-button");
  const newsletterInput = document.querySelector(".newsletter-input");
  const newsletterMessage = document.querySelector(".newsletter-message");

  /**
   * Fetches and displays the categories.
   */
  function loadCategories() {
    fetch("category.json")
      .then(res => res.json())
      .then(data => {
        const categories = data.map(
          item => new Category(item.name, item.image, item.gradientClass)
        );
        displayItems(categoryGrid, categories);
      })
      .catch(err => console.error("Error loading categories:", err));
  }

  /**
   * Fetches and displays the recipes.
   * Loads only the first 9 recipes.
   */
  function loadRecipes() {
    fetch("recipe.json")
      .then(res => res.json())
      .then(data => {
        // Only take the first 9 recipes for the home page grid
        const recipes = data.slice(0, 9).map(
          item => new RecipeCard(item.title, item.image, item.time, item.type)
        );
        displayItems(recipeGrid, recipes);
      })
      .catch(err => console.error("Error loading recipes:", err));
  }

  /**
   * Helper function to render items into a container.
   * @param {HTMLElement} container - The grid container.
   * @param {Array} items - An array of objects with a render() method.
   */
  function displayItems(container, items) {
    if (!container) return; // Exit if container not found
    
    container.innerHTML =
      items.length > 0
        ? items.map(item => item.render()).join("")
        : "<p>No items found.</p>";
  }

  /**
   * Handles the newsletter form submission.
   */
  function handleNewsletterSubmit(event) {
    event.preventDefault(); // Stop the form from submitting
    const email = newsletterInput.value.trim();
    
    // Basic email validation
    if (email && email.includes("@")) {
      newsletterMessage.textContent = "Thanks for subscribing!";
      newsletterMessage.style.color = "green";
      newsletterInput.value = ""; // Clear the input
    } else {
      newsletterMessage.textContent = "Please enter a valid e-mail.";
      newsletterMessage.style.color = "red";
    }
    
    // Clear message after 3 seconds
    setTimeout(() => {
      newsletterMessage.textContent = "";
    }, 3000);
  }

  // --- Initialize Page ---
  loadCategories();
  loadRecipes();

  // Add event listener for the newsletter
  if (newsletterButton) {
    newsletterButton.addEventListener("click", handleNewsletterSubmit);
  }
});