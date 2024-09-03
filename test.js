const countryList = document.querySelector('.country-list');
const showButton = document.querySelector('.show-countries-btn');
let countries = [];

function showCountry(countries) {
    return countries.forEach((c, i) => {
        const countryListLink = document.createElement('a');
        const countryListItem = document.createElement('li');
        const countryNumber = document.createElement('div');
        const line = document.createElement('div');
        const countryFlag = document.createElement('div');
        const flagIcon = document.createElement('img');
        const countryListItemName = document.createElement('div');

        countryNumber.textContent = `${i + 1}.`;
        flagIcon.src = `${c.flags.png}`;
        flagIcon.classList.add('img');
        countryListItemName.textContent = `${c.name.common}`;

        countryListItem.id = `${i}`;

        countryListLink.href = '#modal'
        countryListLink.classList.add('link');
        // countryListLink.setAttribute('target', '_blank');

        countryListItem.classList.add('country-list-item');
        countryNumber.classList.add('country-number');
        line.classList.add('line');
        countryFlag.classList.add('country-list-item-flag');
        countryListItemName.classList.add('country-list-item-name');

        countryListItem.append(countryNumber);
        countryListItem.append(line);
        countryFlag.append(flagIcon);
        countryListItem.append(countryFlag);
        countryListItem.append(line);
        countryListItem.append(countryListItemName);
        countryListLink.append(countryListItem);

        countryList.append(countryListLink);
    })
}




const body = document.querySelector('body');

async function render() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        countries = await response.json();

        const modal = document.querySelector('.country-page');
        const wrapper = document.querySelector('.wrapper');

        countries.forEach((el, i) => {
            el['id'] = i;
        })
        showCountry(countries);
        showButton.removeEventListener('click', ShowCountries);

        countryList.addEventListener('click', (e) => {
            const countryItem = e.target.closest('.country-list-item');
            if (countryItem) {
                renderModal(countryItem.id);
                modal.style.display = 'block';
                wrapper.style.display = 'none';
            }
        })
    } catch (error) {
        console.log(`Error response: ${error.message}`);
    }
}


showButton.addEventListener('click', ShowCountries);

function ShowCountries() {
    render();
}

function renderTitle(url, name) {
    const countryPageTitle = document.createElement('div');
    const countryPageTitleFlag = document.createElement('div');
    const countryPageTitleName = document.createElement('div');
    const countryPageTitleImg = document.createElement('img');

    countryPageTitle.classList.add('country-page-title');
    countryPageTitleFlag.classList.add('country-page-title');
    countryPageTitleName.classList.add('country-page-name');

    countryPageTitleImg.src = `${url}`;
    countryPageTitleName.textContent = name;

    countryPageTitleFlag.append(countryPageTitleImg)
    countryPageTitle.append(countryPageTitleFlag);
    countryPageTitle.append(countryPageTitleName);
    return countryPageTitle;
}

function renderContent(info, name) {
    const countryPageContent = document.createElement('div');
    const countryPageContentContainer = document.createElement('div');
    const countryPageInfo = document.createElement('div');
    const countryPageInfoName = document.createElement('div');

    countryPageContent.classList.add('country-page-content');
    countryPageContentContainer.classList.add('country-page-content-container');
    countryPageInfo.classList.add('country-page-capital');
    countryPageInfoName.classList.add('country-page-capital-name');

    countryPageInfo.textContent = `${info}: `;
    countryPageInfoName.textContent = name;

    countryPageContent.append(countryPageContentContainer);
    countryPageContentContainer.append(countryPageInfo);
    countryPageContentContainer.append(countryPageInfoName);
    return countryPageContent;
}

function renderCoatOfArms(info, src) {
    const countryPageContent = document.createElement('div');
    const countryPageContentContainer = document.createElement('div');
    const countryPageInfo = document.createElement('div');
    const countryPageImg = document.createElement('div');
    const countryPageinfoImg = document.createElement('img');

    countryPageContent.classList.add('country-page-content');
    countryPageContentContainer.classList.add('country-page-content-container');
    countryPageInfo.classList.add('country-page-coat-of-arms');
    countryPageImg.classList.add('country-page-coat-of-arms-img');
    countryPageinfoImg.classList.add('country-page-info-img');

    countryPageInfo.textContent = `${info}: `;
    countryPageinfoImg.src = `${src}`;

    countryPageImg.append(countryPageinfoImg);
    countryPageContent.append(countryPageContentContainer);
    countryPageContentContainer.append(countryPageInfo);
    countryPageContentContainer.append(countryPageImg);
    return countryPageContent;
}

const countryListItem = document.querySelector('.country-list-item');

const countryPageContainer = document.querySelector('.country-page-container');

async function renderModal(id) {
    const currentCountry = countries.find(el => +el.id === +id);
    // function getElement(i) {
    //     return countries.find(el => el.id === i);
    // }
    countryPageContainer.innerHTML = '<div class="button-back">Go back</div>';
    countryPageContainer.append(renderTitle(currentCountry.flags.png, currentCountry.name.common));
    countryPageContainer.append(renderContent('Capital', currentCountry.name.common));
    countryPageContainer.append(renderContent('Continents', currentCountry.continents[0]));
    countryPageContainer.append(renderCoatOfArms('Coat of arms', currentCountry.coatOfArms.png));
    countryPageContainer.append(renderContent('Launguage', Object.values(currentCountry.languages)));

    const buttonBack = document.querySelector('.button-back');
    buttonBack.addEventListener('click', goBackButton);
}

function goBackButton(e) {
    const modal = document.querySelector('.country-page');
    const wrapper = document.querySelector('.wrapper');

    if (e.target.classList.contains('button-back')) {
        modal.style.display = 'none';
        wrapper.style.display = 'flex';
    }
}



