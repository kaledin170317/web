(function () {

    const highlightActiveMenu = () => {
        const currentPath = window.location.pathname;
        document.querySelectorAll('.header__nav a').forEach(link => {
            link.classList.toggle('active', link.pathname === currentPath);
        });
    };


    const displayPageLoadTime = () => {
        const loadTime = Math.round(performance.now());
        const footer = document.querySelector('footer');
        if (footer) {
            footer.insertAdjacentHTML(
                'beforeend',
                `<p>Время загрузки страницы: ${loadTime} мс</p>`
            );
        }
    };


    window.onload = () => {
        highlightActiveMenu();
        displayPageLoadTime();
    };
})();