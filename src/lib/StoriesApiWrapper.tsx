import axios from 'axios'

import { axiosProperties } from '../properties'
import StoriesResponse from '../models/stories/StoriesResponse'


class StoriesApiWrapper{
    private publicAPIKey = axiosProperties.apiKey;
    private storiesRoute = axiosProperties.routes.stories;
    private skipParameter = axiosProperties.skipParameter;
    private authKey = `?apikey=${this.publicAPIKey}`
    constructor(){
        this.getStories=this.getStories.bind(this)
    }
    public async getStories(dummy: string, offset?:number){
        try {
            let endpointUrl = this.storiesRoute + this.authKey
            endpointUrl = offset? this.getUrlWithSkipParameter(endpointUrl, offset) : endpointUrl
            const response = await axios.get(endpointUrl);
            return response.data as StoriesResponse;
        } catch (error) {
            console.log(`getStories error: ${error}`)
        }
    }
    private getUrlWithSkipParameter(url: string, skipAmount: number) {
        return url + this.skipParameter + skipAmount
    }
}

export default StoriesApiWrapper