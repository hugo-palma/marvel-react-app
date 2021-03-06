import axios from 'axios'

import { axiosProperties } from '../properties'
import ComicsResponse  from '../models/comics/ComicsResponse'
import CharactersResponse from 'src/models/characters/CharactersResponse';

class ComicsApiWrapper{
    private publicAPIKey = axiosProperties.apiKey;
    private comicsRoute = axiosProperties.routes.comics;
    private skipParameter = axiosProperties.skipParameter;
    private filterByTitleParameter = axiosProperties.filterByTitle;
    private filterByIssueNumberParameter = axiosProperties.filterByIssueNumber
    private filterByFormatParameter = axiosProperties.filterByFormat
    private orderComicsByIssueNumber = axiosProperties.orderComicsByIssueNumber;
    private authKey = `?apikey=${this.publicAPIKey}`
    constructor(){
        // binding this to methods that are going to be passed as callable parameters
        this.getComics=this.getComics.bind(this)
        this.getComicsFilteredByTitle=this.getComicsFilteredByTitle.bind(this)
        this.getComicsFilteredByIssueNumber=this.getComicsFilteredByIssueNumber.bind(this)
        this.getComicsFilteredByFormat= this.getComicsFilteredByFormat.bind(this)
    }
    public async getComics(dummy: string, offset?:number){
        try {
            let endpointUrl = this.comicsRoute + this.authKey + this.orderComicsByIssueNumber
            endpointUrl = offset? this.getUrlWithSkipParameter(endpointUrl, offset) : endpointUrl
            const response = await axios.get(endpointUrl);
            return response.data as ComicsResponse;
        } catch (error) {
            console.log(`getComics error: ${error}`)
        }
    }
    public async getComicsFilteredByTitle(keyword: string, offset?:number) {
        try {
            const comicsUrl = this.comicsRoute + this.authKey;
            let endpointUrl = this.getUrlWithFilterByTitleParameter(comicsUrl, keyword)
            endpointUrl = offset? this.getUrlWithSkipParameter(endpointUrl, offset) : endpointUrl
            const response = await axios.get(endpointUrl)
            return response.data as ComicsResponse
        } catch (error) {
            console.log(`getComicsFilteredByTitle error: ${error}`)
        }
    }
    public async getComicsFilteredByIssueNumber(issueNumber: string, offset?:number) {
        try{
            const comicsUrl = this.comicsRoute + this.authKey;
            let endpointUrl = this.getUrlWithFilterByIssueNumberParameter(comicsUrl, issueNumber)
            endpointUrl = offset? this.getUrlWithSkipParameter(endpointUrl, offset) : endpointUrl
            const response = await axios.get(endpointUrl)
            return response.data as ComicsResponse
        }
        catch(error){
            console.log(`getComicsFilteredByIssueNumber error: ${error}`)
        }
    }
    public async getComicsFilteredByFormat(format: string, offset?:number) {
        try {
            const comicsUrl = this.comicsRoute + this.authKey;
            let endpointUrl = this.getUrlWithFilterByFormatParameter(comicsUrl, format)
            endpointUrl = offset ? this.getUrlWithSkipParameter(endpointUrl, offset) : endpointUrl
            const response = await axios.get(endpointUrl)
            return response.data as ComicsResponse
        } catch (error) {
            console.log(`getComicsFilteredByFormat error: ${error}`)
            
        }
    }
    public async getComicCharacters(comicId: number) {
        const comicCharactersUrl = this.comicsRoute + '/' + comicId + '/characters' + this.authKey;
        const response = await axios.get(comicCharactersUrl)
        return response.data as CharactersResponse
    }
    private getUrlWithSkipParameter(url: string, skipAmount: number) {
        return url + this.skipParameter + skipAmount
    }
    private getUrlWithFilterByTitleParameter(url: string, keyword: string) {
        return url + this.filterByTitleParameter + keyword
    }
    private getUrlWithFilterByIssueNumberParameter(url: string, issueNumber: string) {
        return url + this.filterByIssueNumberParameter + issueNumber
    }
    private getUrlWithFilterByFormatParameter(url: string, format: string) {
        return url + this.filterByFormatParameter + format
    }
}

export default ComicsApiWrapper