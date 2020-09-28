export const comicsProperties = {
    defaultSize: 'portrait_xlarge',
    pathSuffix: '/',
    imageExtensionPrefix: '.'
}
export const axiosProperties = {
    apiKey: '638a2367d8b8f60521d9016def3230ba',
    skipParameter: '&offset=',
    filterByName: '&nameStartsWith=',
    filterByTitle: '&titleStartsWith=',
    filterByIssueNumber: '&issueNumber=',
    filterByComics: '&comics=',
    filterByStories: '&stories=',
    routes: {
        base: 'http://gateway.marvel.com/v1/public/',
        comics: '/comics',
        characters: '/characters',
        stories: '/stories'
    }
}