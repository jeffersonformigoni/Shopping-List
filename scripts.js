function goBack() {
    window.history.back();
}

document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('item-input');
    const addItemButton = document.getElementById('add-item-button');
    const shoppingList = document.getElementById('shopping-list');

    const savedItems = JSON.parse(localStorage.getItem('shoppingList')) || [];
    savedItems.forEach(item => addItemToDOM(item));

    function addItemToDOM(itemText) {
        const listItem = document.createElement('li');
        listItem.textContent = itemText;

        const removeButton = document.createElement('button');
        const trashIcon = document.createElement('img');
        trashIcon.src = 'https://cdn-icons-png.flaticon.com/512/1214/1214428.png'; // Ícone de lixeira
        trashIcon.alt = 'Remover';
        removeButton.appendChild(trashIcon);

        removeButton.addEventListener('click', () => {
            removeItem(itemText);
        });

        listItem.appendChild(removeButton);
        shoppingList.appendChild(listItem);
    }

    addItemButton.addEventListener('click', () => {
        const itemText = inputField.value.trim();
        if (itemText !== '') {
            addItemToDOM(itemText);
            saveItem(itemText);
            inputField.value = '';
        }
    });

    function saveItem(itemText) {
        const currentItems = JSON.parse(localStorage.getItem('shoppingList')) || [];
        currentItems.push(itemText);
        localStorage.setItem('shoppingList', JSON.stringify(currentItems));
    }

    function removeItem(itemText) {
        const currentItems = JSON.parse(localStorage.getItem('shoppingList')) || [];
        const updatedItems = currentItems.filter(item => item !== itemText);
        localStorage.setItem('shoppingList', JSON.stringify(updatedItems));
        shoppingList.innerHTML = '';
        updatedItems.forEach(item => addItemToDOM(item));

        showRemovalMessage(`! Item "${itemText}" foi removido da lista.`);
    }

    function showRemovalMessage(message) {
        const messageBox = document.createElement('div');
        messageBox.className = 'removal-message';
        messageBox.textContent = message;

        shoppingList.parentElement.appendChild(messageBox);

        setTimeout(() => {
            messageBox.remove();
        }, 3000);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Verifica e aplica o tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    themeToggleButton.addEventListener('click', () => {
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeIcon.src = 'caminho/para/icone-sol.png';
            themeIcon.alt = 'Light-Mode';
        } else {
            body.classList.remove('dark-mode');
            themeIcon.src = 'caminho/para/icone-lua.png';
            themeIcon.alt = 'Dark-Mode';
        }
    }
});
