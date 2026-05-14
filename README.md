# ShopWave - Modern E-Commerce Front-End

ShopWave is a responsive, modern e-commerce front-end application built with HTML, Tailwind CSS, and vanilla JavaScript. Designed for fashion and clothing stores, it provides a seamless and visually appealing shopping experience across all devices.

## 🚀 Features

*   **Responsive Design:** Fully optimized for mobile, tablet, and desktop screens with a mobile-friendly navigation menu.
*   **Multi-Page Layout:**
    *   **Home (`index.html`):** Engaging hero section, "Why Choose Us" features, and trending products preview.
    *   **Products (`Products.html`):** Comprehensive product catalog with categorized tabs (All, New Arrivals, Best Sellers, Offers).
    *   **Cart (`Cart.html`):** Dynamic shopping cart with real-time subtotal, shipping, and total calculations.
    *   **Login (`Login.html`):** Clean and intuitive split-screen user authentication page.
*   **Dynamic Rendering:** Products and cart items are dynamically generated and managed via JavaScript.
*   **State Management:** Utilizes `localStorage` to persist shopping cart data across sessions and page reloads.
*   **Modern UI/UX:** Styled using Tailwind CSS for a sleek design, complemented by FontAwesome icons and custom CSS animations.

## 🛠️ Technologies Used

*   **HTML5:** Semantic structure for web pages.
*   **Tailwind CSS (via CDN):** Rapid utility-first styling.
*   **Vanilla JavaScript (ES6+):** DOM manipulation, dynamic rendering, and local storage management.
*   **CSS3:** Custom scrollbars, animations, and grid layouts (`Index.css`).
*   **FontAwesome:** Scalable vector icons.

## 📁 Project Structure

```text
📦 Web-Store
 ┣ 📂 Assets          # Product images and static assets
 ┣ 📂 Demo            # Project demos or screenshots
 ┣ 📜 index.html      # Home page
 ┣ 📜 Products.html   # Product catalog page
 ┣ 📜 Cart.html       # Shopping cart page
 ┣ 📜 Login.html      # User login page
 ┣ 📜 Index.css       # Custom global styles and animations
 ┣ 📜 index.js        # Core logic, state management, and dynamic rendering
 ┣ 📜 Cover.jpg       # Project cover image
 ┗ 📜 README.md       # Project documentation
```

## 💻 Getting Started

To view and run the project locally, you don't need any build tools or package managers.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/ShopWave.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd ShopWave
    ```
3.  **Run the application:**
    Simply open the `index.html` file in your preferred web browser. Alternatively, you can use a local development server like VS Code's "Live Server" extension for a better experience.

## ✨ Key JavaScript Functions

The `index.js` file handles the core logic of the application:

*   `renderProducts()`: Dynamically loads product cards into the grid.
*   `addToCart(productId)`: Adds an item to the cart array and updates `localStorage`.
*   `renderCart()`: Calculates totals and renders cart items on the Cart page.
*   `updateCartCount()`: Updates the notification badge on the shopping cart icon.
*   `navigateTo(pageId)`: Handles basic routing between pages.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/ShopWave/issues).

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
