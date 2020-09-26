import React, {useEffect, useState} from 'react';
import styled from 'styled-components'
import tw from 'twin.macro'
import path from 'path'

import ApiWrapper from '../../lib/apiWrapper'
import ComicsResponse from '../../models/comics/ComicsResponse'
import { ComicImagesUrlCreator } from '../../lib/ComicImageUrlCreator';
import ComicCard from '../../components/layouts/Comics/ComicCard'

import { placeholderMarvelImage } from '../../images'

const placeholderMarvelImagePath = path.resolve(placeholderMarvelImage)

const obtainData = async () => {
    const apiWrapper = new ApiWrapper();
    const responseData = await apiWrapper.getComics();
    return responseData
}

const StyledDiv = styled.div`
    ${tw`flex flex-col`}
`
interface Props{   
}
const ComicsPage: React.FC<Props> = props => {
    const [comicsResponse, setComicsResponse] = useState<ComicsResponse>()
    useEffect(() => {
        console.log(obtainData().then((response) => {setComicsResponse(response)}))
    }, [])
return <StyledDiv>
            {comicsResponse?.data.results.map(comic => {
                return <ComicCard key={comic.id}
                title={comic.title} 
                imagePath={comic.images.length > 0? ComicImagesUrlCreator.createComicImageUrl(comic.images[0].path, comic.images[0].extension) : placeholderMarvelImagePath}
                />
            })}
        </StyledDiv>
};


export default ComicsPage