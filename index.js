const axios = require("axios").default;

const isCollectionExists = async (apiAddress, collectionId) => {
    const url = `${apiAddress}/omniflix/onft/v1beta1/denoms/${collectionId}`;
    let response = await axios.get(url);
    if (response.data && response.data.denom) {
        return true
    }
    return false
};

const getCollection = async (apiAddress, collectionId) => {
    const url = `${apiAddress}/omniflix/onft/v1beta1/denoms/${collectionId}`;
    let response = await axios.get(url);
    if (response.data && response.data.denom) {
        return response.data.denom
    }
    return null
};

const getNumOfCollectionsOwned = async (apiAddress, accountAddress) => {
    const url = `${apiAddress}/omniflix/onft/v1beta1/denoms?owner=${accountAddress}`;
    let response = await axios.get(url);
    if (response.data && response.data.denoms && response.data.denoms.length) {
        return parseInt(response.data.pagination.total)
    } else {
        return 0
    }
};

const getCollectionsByOwner = async (apiAddress, accountAddress) => {
    const url = `${apiAddress}/omniflix/onft/v1beta1/denoms?owner=${accountAddress}`;
    let response = await axios.get(url);
    if (response.data && response.data.denoms && response.data.denoms.length) {
        return response.data.denoms
    } else {
        return []
    }
};


const getNumOfNftsOwned = async (apiAddress, denomId, accountAddress) => {
    const url = `${apiAddress}/omniflix/onft/v1beta1/onfts/${denomId}/${accountAddress}`;
    let response = await axios.get(url);
    if (response.data && response.data.collections && response.data.collections.length) {
        return parseInt(response.data.pagination.total)
    } else {
        return 0
    }
};

const getNftsByOwner = async (apiAddress, denomId, accountAddress) => {
    const url = `${apiAddress}/omniflix/onft/v1beta1/onfts/${denomId}/${accountAddress}`;
    let response = await axios.get(url);
    if (response.data && response.data.collections && response.data.collections.length) {
        return response.data.collections[0].onfts
    } else {
        return []
    }
};

const getListingsByOwner = async (apiAddress, accountAddress) => {
    const url = `${apiAddress}/omniflix/marketplace/v1beta1/listings?owner=${accountAddress}`;
    let response = await axios.get(url);
    if (response.data && response.data.listings && response.data.listings.length) {
        return response.data.listings
    } else {
        return []
    }
};

const getNumOfListingsOwned = async (apiAddress, denomId, accountAddress) => {
    let url = `${apiAddress}/omniflix/marketplace/v1beta1/listings?owner=${accountAddress}`;
    let ownedCount = 0;
    let response = await axios.get(url);
    if (response.data && response.data.listings && response.data.listings.length) {
        if (parseInt(response.data.pagination.total) !== response.data.listings.length) {
            url = `${apiAddress}/omniflix/marketplace/v1beta1/listings?owner=${accountAddress}&pagination.limit=${response.data.pagination.total}&pagination.countTotal=true`;
            response = await axios.get(url);
            if (response.data && response.data.listings && response.data.listings.length) {
                for (const listing of response.data.listings) {
                    if (listing.denom_id === denomId) {
                        ownedCount += 1;
                    }
                }
            }
        } else {
            for (const listing of response.data.listings) {
                if (listing.denom_id === denomId) {
                    ownedCount += 1;
                }
            }
        }
        return ownedCount;
    } else {
        return 0
    }
};

module.exports = {
    isCollectionExists,
    getCollection,
    getNumOfCollectionsOwned,
    getCollectionsByOwner,
    getNumOfNftsOwned,
    getNftsByOwner,
    getListingsByOwner,
    getNumOfListingsOwned,
};
