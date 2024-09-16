const { getPublicRepositories, printRepositoryNames, printOwnerRepos } = require('./integration');

async function main() {
    const repositories = await getPublicRepositories();

    if (repositories.length === 0) {
        console.log('No repositories found.');
        return;
    }

    printRepositoryNames(repositories);
    printOwnerRepos(repositories);
}

main();