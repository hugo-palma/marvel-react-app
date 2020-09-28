import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components'

import { ComicsContext } from "src/pages/comics/comics";
import RowItem from "src/components/layouts/Comics/components/GoodComicRenderer";

const StyledDiv = styled.div`
    display: flex !important
`;
const RowRenderer: React.FC<any> = (props) => {
  const comicsResponse = useContext(ComicsContext);
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
          title={comicsResponse && comicsResponse.data && comicsResponse.data.results ? comicsResponse.data.results[comicIndex].title: ''}
          images={comicsResponse && comicsResponse.data && comicsResponse.data.results ? comicsResponse.data.results[comicIndex].images: undefined}
          id={comicsResponse && comicsResponse.data && comicsResponse.data.results ? comicsResponse.data.results[comicIndex].id : 0}
          
          classes={{}}
          />
      })}
    </StyledDiv>
  );
};
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
