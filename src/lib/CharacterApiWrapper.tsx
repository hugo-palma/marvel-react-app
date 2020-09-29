import axios from 'axios'

import { axiosProperties } from '../properties'
import CharactersResponse  from '../models/characters/CharactersResponse'


class CharactersApiWrapper{
    private publicAPIKey = axiosProperties.apiKey;
    private charactersRoute = axiosProperties.routes.characters;
    private skipParameter = axiosProperties.skipParameter;
    private filterByNameParameter = axiosProperties.filterByName;
    private filterByComicsParameter = axiosProperties.filterByComics;
    private filterByStoriesParameter = axiosProperties.filterByStories;
    private orderCharactersByName = axiosProperties.orderCharactersByName;
    private authKey = `?apikey=${this.publicAPIKey}`
    constructor(){
        this.getCharacters=this.getCharacters.bind(this)
        this.getCharactersFilteredByName=this.getCharactersFilteredByName.bind(this)
        this.getCharactersFilteredByComics=this.getCharactersFilteredByComics.bind(this)
        this.getCharactersFilteredByStories=this.getCharactersFilteredByStories.bind(this)
    }
    public async getCharacters(dummy: string, offset?:number){
        try {
            let endpointUrl = this.charactersRoute + this.authKey + this.orderCharactersByName
            endpointUrl = offset? this.getUrlWithSkipParameter(endpointUrl, offset) : endpointUrl
            const response = await axios.get(endpointUrl);
            return response.data as CharactersResponse;
        } catch (error) {
            console.log(`getCharacters error: ${error}`)
        }
    }
    public async getCharactersFilteredByName(keyword: string, offset?:number) {
        try {
            const charactersUrl = this.charactersRoute + this.authKey;
            let endpointUrl = this.getUrlWithFilterByNameParameter(charactersUrl, keyword)
            endpointUrl = offset? this.getUrlWithSkipParameter(endpointUrl, offset) : endpointUrl
            const response = await axios.get(endpointUrl)
            return response.data as CharactersResponse
        } catch (error) {
            console.log(`getComicsFilteredByName error: ${error}`)
        }
    }
    public async getCharactersFilteredByComics(comicNumbers: string, offset?:number) {
        try{
            const charactersUrl = this.charactersRoute + this.authKey;
            let endpointUrl = this.getUrlWithFilterByComicsParameter(charactersUrl, comicNumbers)
            endpointUrl = offset? this.getUrlWithSkipParameter(endpointUrl, offset) : endpointUrl
            const response = await axios.get(endpointUrl)
            return response.data as CharactersResponse
        }
        catch(error){
            console.log(`getCharactersFilteredByComics error: ${error}`)
        }
    }
    public async getCharactersFilteredByStories(storyNumbers: string, offset?:number) {
        try{
            const charactersUrl = this.charactersRoute + this.authKey;
            let endpointUrl = this.getUrlWIthFilterByStoriesParameter(charactersUrl, storyNumbers)
            endpointUrl = offset? this.getUrlWithSkipParameter(endpointUrl, offset) : endpointUrl
            const response = await axios.get(endpointUrl)
            return response.data as CharactersResponse
        }
        catch(error){
            console.log(`getCharactersFilteredByStories error: ${error}`)
        }
    }
    private getUrlWithSkipParameter(url: string, skipAmount: number) {
        return url + this.skipParameter + skipAmount
    }
    private getUrlWithFilterByNameParameter(url: string, keyword: string) {
        return url + this.filterByNameParameter + keyword
    }
    private getUrlWithFilterByComicsParameter(url: string, comicNumbers: string) {
        return url + this.filterByComicsParameter + comicNumbers
    }
    private getUrlWIthFilterByStoriesParameter(url: string, storyNumbers:string) {
        return url + this.filterByStoriesParameter + storyNumbers
    }
}

export default CharactersApiWrapper