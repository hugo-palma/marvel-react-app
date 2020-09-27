import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import ApiWrapper from "src/lib/apiWrapper";
import ComicsResponse from "src/models/comics/ComicsResponse";
import ScrollableWindow from "src/components/layouts/ScrollableWindow";
import IScrollable from "src/models/IScrollable";

const StyledDiv = styled.div`
  ${tw`flex flex-col`}
`;
export const ComicsContext = React.createContext({} as IScrollable | undefined);
export const TotalComicsAmountContext = React.createContext(0);
interface Props {}
const ComicsPage: React.FC<Props> = (props) => {
  //states needed for infinite loading
  //TODO: OBTAIN 20 TO CONFIG FILE
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [comicsResponse, setComicsResponse] = useState<ComicsResponse>();
  const apiWrapper = new ApiWrapper();

  const loadNextPage = (...args: any) => {
    console.log("trying to load");
    if (isNextPageLoading) {
      return;
    }
    setIsNextPageLoading(true);
    if (!comicsResponse) {
      //TODO: Refactor .then into a new method
      apiWrapper.getComics().then((response) => {
        if (response && setComicsResponse) {
          setComicsResponse(response);
        } else {
          console.log("revisar setComicsResponse | undefined");
        }
        setIsNextPageLoading(false);
      });
    } else {
      //TODO: Refactor .then into a new method
      console.log("get with offset");
      apiWrapper
        .getComicsWithOffset(comicsResponse.data.results.length)
        .then((response) => {
          if (response && comicsResponse && setComicsResponse) {
            const newResults = response.data.results;
            const mergedComics = comicsResponse.data.results.concat(newResults);
            response.data.results = mergedComics;
            setComicsResponse(response);
            console.log(comicsResponse);
          }
          setIsNextPageLoading(false);
        });
    }
  };
  return (
    <ComicsContext.Provider value={comicsResponse}>
      <StyledDiv>
        <ScrollableWindow hasNextPage loadMoreItems={loadNextPage} />
      </StyledDiv>
    </ComicsContext.Provider>
  );
};

export default ComicsPage;
