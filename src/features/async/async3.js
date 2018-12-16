function getStreetAddress() {
    return Promise.resolve('Awesome avenue 1');
}
function getCity() {
    return new Promise(resolve => {
        setTimeout(() => resolve('Riverside'), 1000);
    });
}
function getState() {
    return new Promise(resolve => {
        setTimeout(() => resolve('Dreamland'), 1000);
    });
}
function getZipCode() {
    return Promise.resolve('000001');
}

async function getAddress() {
    const streetAddress = await getStreetAddress();
    const city = await getCity();
    const state = await getState();
    const zip = await getZipCode();

    return `${streetAddress}, ${city}, ${state}, ${zip}`;
}

getAddress().then(address => console.log(address));


async function getAddressFaster() {
    const [
        streetAddress,
        city,
        state,
        zip
    ] = await Promise.all([
        getStreetAddress(),
        getCity(),
        getState(),
        getZipCode()
    ]);

    return `${streetAddress}, ${city}, ${state}, ${zip}`;
}

getAddressFaster().then(address => console.log(address));
