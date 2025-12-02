document.addEventListener("DOMContentLoaded", () => {
  const days = document.querySelectorAll('.day');
  const popup = document.getElementById('meal-popup');
  const popupDay = document.getElementById('popup-day');
  const mealInput = document.getElementById('meal-input');
  const saveMealBtn = document.getElementById('save-meal');
  const closePopupBtn = document.getElementById('close-popup');

  let selectedDay = null;
  let meals = {};

  // Open popup when a day is clicked
  days.forEach(day => {
    day.addEventListener('click', () => {
      selectedDay = day.getAttribute('data-day');
      popupDay.textContent = `Add meal for ${selectedDay}`;
      mealInput.value = meals[selectedDay] || '';
      popup.classList.remove('hidden');
    });
  });

  // Save meal
  saveMealBtn.addEventListener('click', () => {
    if (selectedDay && mealInput.value.trim() !== '') {
      meals[selectedDay] = mealInput.value;
      const dayBox = document.querySelector(`[data-day="${selectedDay}"]`);
      dayBox.textContent = `${selectedDay}: ${mealInput.value}`;
      popup.classList.add('hidden');
    }
  });

  // Close popup
  closePopupBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
  });
});
function showIngredients(mealName) {
    fetch('/get_ingredients', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({meal: mealName})
    })
    .then(response => response.json())
    .then(data => {
        alert("Ingredients for " + mealName + ":\n- " + data.ingredients.join("\n- "));
    });
}




