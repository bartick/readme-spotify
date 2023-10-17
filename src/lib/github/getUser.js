const getUser = async (token) => {
    const response = await fetch('https://api.github.com/user', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status !== 200) {
        return null;
    }
    const data = await response.json();
    return data;
};

module.exports = getUser;