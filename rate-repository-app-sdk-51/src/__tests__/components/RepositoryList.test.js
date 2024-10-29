import { render, screen, within } from "@testing-library/react-native";
import { RepositoryContainer, RepositoryList } from "../../components/RepositoryList";
import { formatDigits } from "../../components/RepositoryItem";

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
        it('renders repository information correctly', () => {
            const repositories = {
                totalCount: 8,
                pageInfo: {
                    hasNextPage: true,
                    endCursor:
                        'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                },
                edges: [
                    {
                        node: {
                            id: 'jaredpalmer.formik',
                            fullName: 'jaredpalmer/formik',
                            description: 'Build forms in React, without the tears',
                            language: 'TypeScript',
                            forksCount: 1619,
                            stargazersCount: 21856,
                            ratingAverage: 88,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars2.githubusercontent.com/u/4060187?v=4',
                        },
                        cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                    },
                    {
                        node: {
                            id: 'async-library.react-async',
                            fullName: 'async-library/react-async',
                            description: 'Flexible promise-based React data loader',
                            language: 'JavaScript',
                            forksCount: 69,
                            stargazersCount: 1760,
                            ratingAverage: 72,
                            reviewCount: 3,
                            ownerAvatarUrl:
                                'https://avatars1.githubusercontent.com/u/54310907?v=4',
                        },
                        cursor:
                            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                    },
                ],
            };
            const mappedRepos = repositories.edges.map(r => r.node) // need to map here repos because they are mapped on useRepositories hook
            render(<RepositoryContainer repositories={mappedRepos} />)
            // screen.debug()

            const repositoryItems = screen.getAllByTestId('repositoryItem');
            const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

            const firstRepoName = within(firstRepositoryItem).getByText(mappedRepos[0].fullName)
            const firstRepoDescription = within(firstRepositoryItem).getByText(mappedRepos[0].description)
            const firstRepoLanguage = within(firstRepositoryItem).getByText(mappedRepos[0].language)
            const firstRepoForks = within(firstRepositoryItem).getByText(formatDigits(mappedRepos[0].forksCount) + ' 🔱')
            const firstRepoStargazers = within(firstRepositoryItem).getByText(formatDigits(mappedRepos[0].stargazersCount) + ' ⭐️')
            const firstRepoReviews = within(firstRepositoryItem).getByText(mappedRepos[0].reviewCount + ' 📊')
            const firstRepoRatingAverage = within(firstRepositoryItem).getByText(mappedRepos[0].ratingAverage + ' 🥇')

            const secondRepoName = within(secondRepositoryItem).getByText(mappedRepos[1].fullName)
            const secondRepoDescription = within(secondRepositoryItem).getByText(mappedRepos[1].description)
            const secondRepoLanguage = within(secondRepositoryItem).getByText(mappedRepos[1].language)
            const secondRepoForks = within(secondRepositoryItem).getByText(formatDigits(mappedRepos[1].forksCount) + ' 🔱')
            const secondRepoStargazers = within(secondRepositoryItem).getByText(formatDigits(mappedRepos[1].stargazersCount) + ' ⭐️')
            const secondRepoReviews = within(secondRepositoryItem).getByText(mappedRepos[1].reviewCount + ' 📊')
            const secondRepoRatingAverage = within(secondRepositoryItem).getByText(mappedRepos[1].ratingAverage + ' 🥇')

            expect(firstRepoName).toBeDefined()
            expect(firstRepoDescription).toBeDefined()
            expect(firstRepoLanguage).toBeDefined()
            expect(firstRepoForks).toBeDefined()
            expect(firstRepoStargazers).toBeDefined()
            expect(firstRepoReviews).toBeDefined()
            expect(firstRepoRatingAverage).toBeDefined()

            expect(secondRepoName).toBeDefined()
            expect(secondRepoDescription).toBeDefined()
            expect(secondRepoLanguage).toBeDefined()
            expect(secondRepoForks).toBeDefined()
            expect(secondRepoStargazers).toBeDefined()
            expect(secondRepoReviews).toBeDefined()
            expect(secondRepoRatingAverage).toBeDefined()
        });
    });
});