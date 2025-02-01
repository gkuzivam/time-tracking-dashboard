document.addEventListener('DOMContentLoaded', () => {

    fetch('data.json').then((response) => {  
        if(!response.ok) return console.log('Oops! Something went wrong.');
        
        return response.json();
      }).then((data) => {
        console.log(data);
        setupButtons(data);
      });
  });

  function setupButtons(data) {
    const dailyButton = document.getElementById('daily');
    const weeklyButton = document.getElementById('weekly');
    const monthlyButton = document.getElementById('monthly');
    const buttons = [dailyButton, weeklyButton, monthlyButton];

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            updateDOM(data, button.id, getPreviousText(button.id));
            setActiveButton(buttons, button);
        });
    });
    
    // Trigger click event on daily button to show daily data by default
    dailyButton.click();
}

function setActiveButton(buttons, activeButton) {
    buttons.forEach(button => {
        if (button === activeButton) {
            button.style.opacity = '1';
        } else {
            button.style.opacity = '0.5';
        }
    });
}

function getPreviousText(period) {
    switch (period) {
        case 'daily':
            return 'Yesterday';
        case 'weekly':
            return 'Last Week';
        case 'monthly':
            return 'Last Month';
        default:
            return '';
    }
}

function updateDOM(data, period, previous) {
    data.forEach(item => {
        const cardId = `${item.title.toLowerCase().replace(/\s+/g, '-')}-card`;
        const card = document.getElementById(cardId);
        if (card) {
            card.querySelector('.current-hours').textContent = `${item.timeframes[period].current}hrs`;
            card.querySelector('.previous-hours').textContent = `${previous} - ${item.timeframes[period].previous}hrs`;
        }
    });
}