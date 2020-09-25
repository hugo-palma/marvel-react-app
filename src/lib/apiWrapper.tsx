import axios from 'axios'

import { axiosProperties } from '../properties'
import ComicsResponse  from '../models/comics/ComicsResponse'


class ApiWrapper{
    private publicAPIKey = '638a2367d8b8f60521d9016def3230ba'
    private comicsRoute = axiosProperties.routes.comics
    private authKey = `?apikey=${this.publicAPIKey}`

    public async getComics(){
        try {
            const response = await axios.get(this.comicsRoute + this.authKey);
            return response.data as ComicsResponse;
        } catch (error) {
            console.log(`getComics error: ${error}`)
        }
    }
}

export default ApiWrapper