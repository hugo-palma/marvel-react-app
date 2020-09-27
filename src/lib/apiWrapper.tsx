import axios from 'axios'

import { axiosProperties } from '../properties'
import ComicsResponse  from '../models/comics/ComicsResponse'


class ApiWrapper{
    private publicAPIKey = axiosProperties.apiKey;
    private comicsRoute = axiosProperties.routes.comics;
    private skipParameter = axiosProperties.skipParameter;
    private authKey = `?apikey=${this.publicAPIKey}`

    public async getComics(){
        try {
            const response = await axios.get(this.comicsRoute + this.authKey);
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
    private getUrlWithSkipParameter(url: string, skipAmount: number) {
        return url + this.skipParameter + skipAmount
    }
}

export default ApiWrapper