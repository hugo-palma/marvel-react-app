import axios from 'axios'

import { axiosProperties } from '../properties'
import ComicsResponse  from '../models/comics/ComicsResponse'


class ApiWrapper{
    private publicAPIKey = axiosProperties.apiKey;
    private comicsRoute = axiosProperties.routes.comics;
    private skipParameter = axiosProperties.skipParameter;
    private filterByTitleParameter = axiosProperties.filterByTitle;
    private filterByIssueNumberParameter = axiosProperties.filterByIssueNumber
    private authKey = `?apikey=${this.publicAPIKey}`
    constructor(){
        this.getComics=this.getComics.bind(this)
        this.getComicsWithOffset=this.getComicsWithOffset.bind(this)
        this.getComicsFilteredByTitle=this.getComicsFilteredByTitle.bind(this)
        this.getComicsFilteredByIssueNumber=this.getComicsFilteredByIssueNumber.bind(this)
    }
    public async getComics(dummy: string, offset?:number){
        try {
            console.log('vanilla getComics')
            let endpointUrl = this.comicsRoute + this.authKey
            endpointUrl = offset? this.getUrlWithSkipParameter(endpointUrl, offset) : endpointUrl
            const response = await axios.get(endpointUrl);
            return response.data as ComicsResponse;
        } catch (error) {
            console.log(`getComics error: ${error}`)
        }
    }

    public async getComicsWithOffset(offset: number) {
        try {
            const comicsUrl = this.comicsRoute + this.authKey;
            const response = await axios.get(this.getUrlWithSkipParameter(comicsUrl, offset));
            return response.data as ComicsResponse;
        } catch (error) {
            console.log(`getComicsWithOffset error: ${error}`)
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
    private getUrlWithSkipParameter(url: string, skipAmount: number) {
        return url + this.skipParameter + skipAmount
    }
    private getUrlWithFilterByTitleParameter(url: string, keyword: string) {
        return url + this.filterByTitleParameter + keyword
    }
    private getUrlWithFilterByIssueNumberParameter(url: string, issueNumber: string) {
        return url + this.filterByIssueNumberParameter + issueNumber
    }
}

export default ApiWrapper