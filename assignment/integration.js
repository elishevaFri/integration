const axios = require("axios");
const https = require('https');

const agent = new https.Agent({
    rejectUnauthorized: false
});


async function getPublicRepositories() {
    try {
        const token = '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';
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        const response = await axios.get('https://api.github.com/repositories', { httpsAgent: agent }, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching repositories:', error.message);
        return [];
    }
}

function printRepositoryNames(repositories) {
    try {
        const sortedNames = repositories
            .map(repo => repo.name)
            .sort((a, b) => a.localeCompare(b));

        console.log('Repository names in alphabetical order:');
        sortedNames.forEach(name => console.log(name));
    }
    catch (error) {
        console.error('Error print repository names')
    }
}

function printOwnerRepos(repositories) {
    try {
        let loginRepo = {};
        repositories.forEach(repo => {
            if (repo.owner.login in loginRepo)
                loginRepo[repo.owner.login]++;
            else
                loginRepo[repo.owner.login] = 1
        }
        )

        console.log('\nOwners and their repository counts:');
        Object.entries(loginRepo).forEach(([login, count]) => {
            console.log(`${login}: ${count}`);
        });
    }

    catch (error) {
        console.error('Error print owners repos')
    }
}

module.exports = {
    getPublicRepositories,
    printRepositoryNames,
    printOwnerRepos
};