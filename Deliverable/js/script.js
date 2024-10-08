
/* Adjusts pseudo-active-selector width and positioning */
/* isResizing should be a boolean representing if its being called within the onresize event */
const repositionSelector = (isResizing) => {
    const links = document.getElementsByTagName('a');

    let activeLinkIndex = -1;

    for (let i = 0; i < links.length; i++) {
        if (links[i].className === 'active') {
            activeLinkIndex = i;
        }
    }

    if (activeLinkIndex === -1) {
        return;
    }

    /* -40 to account for margin */
    let marginLeft = -40;

    const currentLinkRects = links[activeLinkIndex].getBoundingClientRect();

    marginLeft += currentLinkRects.x;

    const pseudoActiveSelector = document.getElementById('pseudo-active-selector');

    const currentLinkWidth = currentLinkRects.width;

    /* Moves and adjusts the sizing of the pseudo-active-selector element */
    pseudoActiveSelector.style = `margin-left:${marginLeft}px;width:${currentLinkWidth}px;${isResizing ? 'transition:none;' : 'transition: .3s ease-in-out;'}`;

}

// Modifies class attributes to reflect what link element is active
const setActiveLink = (index) => {
    const links = document.getElementsByTagName('a');

    const activeLink = document.getElementsByClassName("active");

    if (activeLink.length) {
        // Assumes only 1 item can be active
        activeLink[0].className = activeLink[0].className.replace("active", "");
    }

    links[index].className = 'active';
}

const convertTZ = (date, tzString) => {
    return date.toLocaleString("en-US", { timeZone: tzString });
}

// Gets current time and converts to target timezone
const getDisplayedTime = (index) => {
    const now = new Date();


    switch (index) {
        /* Cuppertino */
        case 0: {
            return convertTZ(now, 'America/Los_Angeles');
        }

        /* New York */
        case 1: {
            return convertTZ(now, 'America/New_York');

        }

        /* London */
        case 2: {
            return convertTZ(now, 'Europe/London');

        }

        /* Amsterdam */
        case 3: {
            return convertTZ(now, 'Europe/Amsterdam');

        }

        /* Tokyo */
        case 4: {
            return convertTZ(now, 'Asia/Tokyo');

        }

        /* Hong Kong */
        case 5: {
            return convertTZ(now, 'Asia/Hong_Kong');

        }

        /* Sydney */
        case 6: {
            return convertTZ(now, 'Australia/Sydney');

        }

        default: {
            return '';
        }
    }
}

// Injects local time into element with id="local-time"
// Also triggers fade in / fade out css animations
const triggerLocalTimeChange = (index) => {
    const localTimeElement = document.getElementById('local-time')

    localTimeElement.classList.remove("fade"); // removing the class
    setTimeout(() => {
        requestAnimationFrame(() => {
            localTimeElement.innerHTML = getDisplayedTime(index);
            localTimeElement.classList.add("fade");
        });
    }, 250); // timeout
}

const onClick = (index) => {
    setActiveLink(index);
    repositionSelector();
    triggerLocalTimeChange(index);
}