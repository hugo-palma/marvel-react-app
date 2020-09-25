import axios from 'axios'
import ComicsResponse  from '../models/comics/ComicsResponse'

class ApiWrapper{
    private publicAPIKey = '638a2367d8b8f60521d9016def3230ba'
    private BASE_ROUTE = 'http://gateway.marvel.com/v1/public/'
    private comicsRoute = `${this.BASE_ROUTE}/comics`
    private authKey = `?apikey=${this.publicAPIKey}`

    public async getComics(){
        try {
            const response = await axios.get(this.comicsRoute + this.authKey);
            console.log(response.data)
            return response.data as ComicsResponse;
        } catch (error) {
            console.log('error al realizar get')
            console.log(error)
        }

    }
}

export default ApiWrapper