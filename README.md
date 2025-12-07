# GitFinder - GitHub User Search

A premium, modern web application to search and explore GitHub profiles with style. Built with vanilla HTML, JavaScript, and styled using Tailwind CSS with a beautiful glassmorphism design.

## 🚀 Features

-   **User Search**: Instantly find any GitHub user by their username.
-   **Rich Profile Details**: View key information including:
    -   Profile Avatar & Name
    -   Bio & Hireable Status
    -   Followers, Following, and Repository counts
    -   Location & Blog links
-   **Repository Explorer**: Automatically lists the user's latest 5 repositories with:
    -   Repository Name & Description
    -   Primary Language used
    -   Star & Fork counts
    -   Last updated date
-   **Premium UI/UX**:
    -   Glassmorphism aesthetics (Dark mode)
    -   Smooth animations and transitions
    -   Loading skeletons for better perceived performance
    -   Fully responsive design for Mobile and Desktop

## 🛠️ Technology Stack

-   **HTML5**: Structure and semantics.
-   **JavaScript (ES6+)**: Fetching data from GitHub API and DOM manipulation.
-   **Tailwind CSS**: Utility-first CSS framework (via CDN) for styling.
-   **Google Fonts**: Using 'Outfit' for a clean, modern typography.

## 📦 Installation & Usage

Since this project is built with static files and CDN links, no complex build process is required.

1.  **Clone the repository** (or download the files):
    ```bash
    git clone https://github.com/biraj2692/github-user-finder.git
    cd github-user-finder
    ```

2.  **Run the project**:
    -   Simply open `index.html` in your web browser.
    -   **Recommendation**: Use a local development server (like Live Server in VS Code) for the best experience.

## Unsplash / Preview

*(You can add a screenshot of your application here)*

## 💡 How it Works

1.  The app uses the **GitHub REST API** to fetch user data.
    -   `https://api.github.com/users/{username}` for profile details.
    -   `https://api.github.com/users/{username}/repos` for repository lists.
2.  JavaScript handles the asynchronous requests (`fetch`), manages loading states, and dynamically updates the DOM with the received data.
3.  Tailwind CSS provides the styling classes directly in the markup, with custom configurations in the `head` for specific colors and animations.

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have ideas for improvements.

1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Designed with ♥ by Biraj.
