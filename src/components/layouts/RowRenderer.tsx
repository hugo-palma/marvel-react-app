import React, { useState, useEffect, useContext } from "react";
import styled from 'styled-components'

import { ComicsContext } from "src/pages/comics/comics";
import RowItem from "./Comics/components/GoodComicRenderer";

const StyledDiv = styled.div`
    display: flex !important
`;
const RowRenderer: React.FC<any> = (props) => {
  const comicsResponse = useContext(ComicsContext);
  const [index] = useState(props.index);

    //TODO: change maxItemsPerRow to be configurable
  const [maxItemsPerRow, setMaxItemsPerRow] = useState(4);
  const [comicsLength, setComicsLength] = useState(0);

  useEffect(() => {
    if (
      comicsResponse &&
      comicsResponse.data &&
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
    <StyledDiv>
      {rowComicIds.map((comicIndex) => {
          return  <RowItem
          title={comicsResponse && comicsResponse.data ? comicsResponse?.data?.results[comicIndex].title: ''}
          images={comicsResponse?.data?.results[comicIndex].images}
          id={comicsResponse?.data?.results[comicIndex].id}
          
          classes={'flex'}
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
    console.log(`fila ${rowIndex}`)
  const result = [];
  const startIndex = rowIndex * maxItemsPerRow;

  for (
    let i = startIndex;
    i < Math.min(startIndex + maxItemsPerRow, itemsAmount);
    i++
  ) {
    result.push(i);
  }
  console.log(result)
  return result;
}
export default RowRenderer;
