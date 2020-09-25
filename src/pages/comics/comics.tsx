import React, {useEffect, useState} from 'react';

import ApiWrapper from '../../lib/apiWrapper'
import ComicsResponse from '../../models/comics/ComicsResponse'
import { ComicImagesUrlCreator } from '../../lib/ImageUrl';

const obtainData = async () => {
    const apiWrapper = new ApiWrapper();
    const responseData = await apiWrapper.getComics();
    return responseData
}

interface Props{

}
const ComicsPage: React.FC<Props> = props => {
    const [comicsResponse, setComicsResponse] = useState<ComicsResponse>()
    useEffect(() => {
        console.log(obtainData().then((response) => {setComicsResponse(response)}))
    }, [])
return <div>
            {comicsResponse?.data.results.map(comic => {
                return <div key={comic.id}>
                    <pre>
                        {comic.title + JSON.stringify(comic.images)}
                    </pre>
                    <img src={comic.images.length > 0? ComicImagesUrlCreator.createComicImageUrl(comic.images[0].path, comic.images[0].extension): ''} alt={`imagen de comic ${comic.title}`}/>
                </div>
            })}
        </div>
};


export default ComicsPage