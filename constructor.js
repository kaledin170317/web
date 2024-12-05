document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tableForm');
    const tableContainer = document.getElementById('generatedTable');

    const savedParams = JSON.parse(localStorage.getItem('tableParams'));
    if (savedParams) {
        document.getElementById('days').value = savedParams.days || '';
        document.getElementById('lessons').value = savedParams.lessons || '';
        document.getElementById('language').value = savedParams.language || 'ru';
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const days = document.getElementById('days').value;
        const lessons = document.getElementById('lessons').value;
        const language = document.getElementById('language').value;

        const params = { days, lessons, language };
        localStorage.setItem('tableParams', JSON.stringify(params));

        generateTable(days, lessons, language);
    });

    function generateTable(days, lessons, language) {
        tableContainer.innerHTML = '';

        const table = document.createElement('table');
        table.classList.add('product-table');

        const headerRow = document.createElement('tr');
        headerRow.innerHTML = `<th>${language === 'ru' ? 'День' : 'Day'}</th>`;
        for (let i = 1; i <= lessons; i++) {
            headerRow.innerHTML += `<th>${language === 'ru' ? 'Урок' : 'Lesson'} ${i}</th>`;
        }
        table.appendChild(headerRow);

        for (let i = 1; i <= days; i++) {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${language === 'ru' ? 'День' : 'Day'} ${i}</td>`;
            for (let j = 1; j <= lessons; j++) {
                row.innerHTML += `<td></td>`;
            }
            table.appendChild(row);
        }

        tableContainer.appendChild(table);
    }
});
