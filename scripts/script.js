const charactersButtons = document.querySelectorAll('.character-section ul button');
const teamList = document.querySelector('.team-section ul');
const progress = document.querySelector('progress');
const teamCounter = document.querySelector('#team-counter span')

charactersButtons.forEach( charactersButton => {
    charactersButton.addEventListener('click', addCharacterToTeam);
});

function addCharacterToTeam(event) {
    const characterButton = event.currentTarget;

    const charactersImage = characterButton.querySelector("img");
    const characterName = charactersImage.alt;
    const charactersImageClone = charactersImage.cloneNode();

    const deleteButton = document.createElement('button');
    deleteButton.ariaLabel = `Verwijder ${characterName}`;
    deleteButton.addEventListener('click', removeCharacterFromTeam);

    const firstEmptySlot =  teamList.querySelector('li:empty');


    firstEmptySlot.appendChild(charactersImageClone);
    firstEmptySlot.appendChild(deleteButton);

    updateCounterAndProgress(+1);

    checkInteractivityOfCharacterList();

    checkCompletenessOfTeam();

}

function removeCharacterFromTeam(event) {
    const deleteButton = event.currentTarget;
    const slot = deleteButton.closest('li');
    const characterImg = slot.querySelector('img');

    deleteButton.remove();
    characterImg.remove();

    updateCounterAndProgress(-1);
    checkInteractivityOfCharacterList();
    checkCompletenessOfTeam();
} 

function updateCounterAndProgress( delta ) {
    progress.value = progress.value + delta;


    const currentCount = teamCounter.textContent;
    const newCount = currentCount - delta;
    teamCounter.textContent = newCount;
}

function checkInteractivityOfCharacterList() {
    const emptySlot = teamList.querySelector('li:empty');

    if(emptySlot) {
        charactersButtons.forEach(characterButton => {
            characterButton.disabled = false;
        })
    }
    else {
        charactersButtons.forEach(characterButton => {
            characterButton.disabled = true;
        })
    }
}

function checkCompletenessOfTeam() {
    const emptySlot = teamList.querySelector('li:empty');

    if(emptySlot) {
        teamList.classList.remove('is-complete');
    }
    else {
        teamList.classList.add('is-complete');
    }
}