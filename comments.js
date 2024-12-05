document.addEventListener("DOMContentLoaded", () => {
    const commentsContainer = document.getElementById("comments");
    const preloader = document.getElementById("preloader");

    function showPreloader() {
        preloader.style.display = "block";
    }

    function hidePreloader() {
        // preloader.style.display = "none";
        preloader.style.display = "block";
    }


    function showError(message) {
        hidePreloader();
        const errorElement = document.createElement("div");
        errorElement.className = "error-message";
        errorElement.textContent = `⚠ ${message}`;
        commentsContainer.appendChild(errorElement);
    }


    async function loadComments() {
        showPreloader();
        commentsContainer.innerHTML = "";

        const randomLimit = Math.floor(Math.random() * 5) + 1; // Случайное число от 1 до 5
        const url = `https://jsonplaceholder.typicode.com/comments?_limit=${randomLimit}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            const comments = await response.json();
            renderComments(comments);
        } catch (error) {
            showError("Что-то пошло не так, попробуйте позже.");
            console.error(error);
        } finally {
            hidePreloader();
        }
    }

    function renderComments(comments) {
        if (comments.length === 0) {
            showError("Нет доступных данных.");
            return;
        }

        comments.forEach((comment) => {
            const commentElement = document.createElement("div");
            commentElement.className = "comment";
            commentElement.innerHTML = `
                <h3>${comment.name}</h3>
                <p><strong>Email:</strong> ${comment.email}</p>
                <p>${comment.body}</p>
            `;
            commentsContainer.appendChild(commentElement);
        });
    }

    loadComments();
});
