import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components'

import { ScrollableContext } from "src/components/layouts/ScrollableWindow/ScrollableWindow";
import RowItem from "src/components/layouts/Comics/components/GoodComicRenderer";
import IImages from 'src/models/IImages'
import IScrollable from "src/models/IScrollable";
import IResult from "src/models/IResults";

const StyledDiv = styled.div`
    display: flex !important
`;
const RowRenderer: React.FC<any> = (props) => {
  const comicsResponse = useContext(ScrollableContext);
  const [index] = useState(props.index);
  //TODO: LOAD FROM FILE
  const ITEM_WIDTH = 296
  //TODO: CHANGE width
  const width = window.innerWidth;
  
  const getMaxItemsAmountPerRow = (width: number) => {
    return Math.max(Math.floor(width / ITEM_WIDTH), 1);
  }

    //TODO: change maxItemsPerRow to be configurable
  const [maxItemsPerRow, setMaxItemsPerRow] = useState(getMaxItemsAmountPerRow(width));
  const [comicsLength, setComicsLength] = useState(0);

  useEffect(() => {
    if (
      comicsResponse &&
      comicsResponse.data &&
      comicsResponse.data.results &&
      comicsResponse.data.results.length > 0
    ) {
        setComicsLength(comicsResponse.data.results.length)
    }
  }, [comicsResponse]);

  const rowComicIds = generateIndexesForRow(
    index,
    maxItemsPerRow,
    comicsLength
  )

  return (
    <StyledDiv style={props.style}>
      {rowComicIds.map((comicIndex) => {
          return  <RowItem
          key={comicIndex}
          title={comicsResponse && comicsResponse.data && comicsResponse.data.results ? getTitle(comicsResponse.data.results[comicIndex]) : ''}
          images={comicsResponse && comicsResponse.data && comicsResponse.data.results ? getImages(comicsResponse.data.results[comicIndex]) : undefined}
          id={comicsResponse && comicsResponse.data && comicsResponse.data.results ? getId(comicsResponse.data.results[comicIndex]) : '0'}
          
          classes={{}}
          />
      })}
    </StyledDiv>
  );
};
function getTitle(item: IResult | undefined) {
  if(item && item.title){
    return item.title
  }
  else if(item && item.name){
    return item.name
  }
  else{
    return ''
  }
} 
function getImages(item: IResult| undefined) {
  if(item && item.images)
  {
    return item.images
  }
  else if(item && item.thumbnail){
    return [item.thumbnail]
  }
  else return
}
function getId(item: IResult | undefined)
{
  if(item && item.id){
    return `${item.id}`
  }
  else{
    return ''
  }
}
function generateIndexesForRow(
  rowIndex: number,
  maxItemsPerRow: number,
  itemsAmount: number
) {
  const result = [];
  const startIndex = rowIndex * maxItemsPerRow;

  for (
    let i = startIndex;
    i < Math.min(startIndex + maxItemsPerRow, itemsAmount);
    i++
  ) {
    result.push(i);
  }
  return result;
}

export default RowRenderer;
