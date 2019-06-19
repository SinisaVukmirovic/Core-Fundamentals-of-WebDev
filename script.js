const linkCategory = document.querySelector('#linkCategory');
const submitBtn = document.querySelector('#submitBtn');
const addBtn = document.querySelector('#addBtn');
const cancelBtn = document.querySelector('#cancelBtn');
const addLinkPanel = document.querySelector('#addLinkPanel');
const addedCategories = document.querySelector('#addedCategories');

const addLinkContainer = document.querySelector('#addLinkContainer');

const linksList = document.querySelector('#linksList');

let editIndex = -1;

let linkCategories = [];
let links = [
    {
        title: 'The Coding Train',
        url: 'https://www.youtube.com/user/shiffman',
        categories: ['teaching', 'programming', 'this.'],
        date: new Date()
    },
    {
        title: 'Traversy Media',
        url: 'https://www.youtube.com/user/TechGuyWeb',
        categories: ['JS', 'front end', 'frameworks'],
        date: new Date()
    },
    {
        title: 'Wes Bos',
        url: 'https://www.youtube.com/user/wesbos',
        categories: ['JS', 'React', 'The Boss'],
        date: new Date()
    },
    {
        title: 'Kevin Powell',
        url: 'https://www.youtube.com/channel/UCJZv4d5rbIKd4QHMPkcABCw',
        categories: ['CSS3', 'tips', 'tutorials'],
        date: new Date()
    },
    {
        title: 'Dylan Israel',
        url: 'https://www.youtube.com/user/pizzapokerguy87',
        categories: ['JS', 'selftaught'],
        date: new Date()
    }
];

displayLinks();

addBtn.addEventListener('click', (event) => {
    showFormPanel();
});
cancelBtn.addEventListener('click', (event) => {
    event.preventDefault();

    hideFormPanel();
});

function showFormPanel() {
    addLinkContainer.classList.remove('hidden');

    displayLinkCategories();
}
function hideFormPanel() {
    addLinkContainer.classList.add('hidden');
    clearLinkForm();
}

linkCategory.addEventListener('keydown', function(event) {
    if (event.keyCode === 188) {
        if (linkCategory.value === '') {
            // prevent comma to be typed out when pressed
            event.preventDefault();
            return;
        }
        else {
            // prevent comma to be typed out when pressed
            event.preventDefault();

            linkCategories.push(linkCategory.value);

            linkCategory.value = '';

            displayLinkCategories();
        }
    }
});

function displayLinkCategories() {
    addedCategories.innerHTML = '';

    for (let category of linkCategories) {
        let categoryHTMLString = `
            <span class="category">${category}</span>
        `;
        addedCategories.innerHTML += categoryHTMLString;
    }
}

function clearLinkForm() {
    linkTitle.value = '';
    linkUrl.value = '';
    linkCategory.value = '';
    linkCategories = [];
    addedCategories.innerHTML = '';
}

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();

    linkCategories.push(linkCategory.value);

    const title = linkTitle.value;
    const url = linkUrl.value;
    const categories = linkCategories;

    const newLink = {
        title,
        url,
        categories,
        date: new Date()
    }

    if (editIndex === -1) {
        links.unshift(newLink);
    }
    else {
        links[editIndex] = newLink;
        editIndex = -1;
    }

    displayLinkCategories();

    hideFormPanel();

    displayLinks();

});

function displayLinks() {
    linksList.innerHTML = '';

    let index = 0;
    for (let link of links) {

        let linkHTMLString = `
            <div class="flex-item">
                <div id="linksList">
                    <div class="link panel">
                        <div class="link-options">
                            <button class="btn-sm" onclick="deleteLink(${index})">Delete</button>
                            <button class="btn-sm" onclick="editLink(${index})">Edit</button>
                        </div>

                        <a href="${link.url}">
                            <h2 class="header">${link.title}</h2>
                        </a>
                        <p class="link-date">${formatDate(link.date)}</p>
                        <div class="categories">
                            Categories:`;
                            for (let category of link.categories) {
                                linkHTMLString += `
                                    <span class="category">${category}</span>
                                `;
                            }
                        linkHTMLString += `</div>
                    </div>
                </div>
            </div>
        `;

        linksList.innerHTML += linkHTMLString; 
        index++;
    }
}

function deleteLink(index) {
    links.splice(index, 1);

    displayLinks();
}

function editLink(index) {
    editIndex = index;
    linkTitle.value = links[index].title;

    linkTitle.value = links[index].title;
    linkUrl.value = links[index].url;
    linkCategory.value = links[index].categories;

    showFormPanel();
}

function formatDate(date) {
    return `${('0' + (date.getMonth() + 1)).slice(-2)}/${('0' + date.getDay()).slice(-2)}/${date.getFullYear()}`;
}