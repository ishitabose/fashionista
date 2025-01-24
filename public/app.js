document.getElementById('advice-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const userInput = document.getElementById('user-input').value;
    const output = document.getElementById('output');
    const loader = document.getElementById('loader');

    loader.style.display = 'block';
    output.textContent = '';

    try {
        const response = await fetch('/api/advice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question: userInput })
        });
        const data = await response.json();
        output.textContent = data.advice;
    } catch (error) {
        output.textContent = 'Error fetching advice. Please try again.';
    } finally {
        loader.style.display = 'none';
    }
});
