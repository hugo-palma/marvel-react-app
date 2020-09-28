import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import ApiWrapper from "src/lib/apiWrapper";
import ComicsResponse from "src/models/comics/ComicsResponse";
import ScrollableWindow from "src/components/layouts/ScrollableWindow/ScrollableWindow";
import IScrollable from "src/models/IScrollable";
import ComicsFilterControl from "src/components/layouts/FilterControl/ComicsFilterControl";

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
  let comicAmount = 0;
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [comicsResponse, setComicsResponse] = useState<ComicsResponse>();
  const [filterOption, setFilterOption] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const apiWrapper = new ApiWrapper();

  useEffect(() => {
    console.log(`cambios en filtros ${filterOption}, ${filterValue}`)
    handleFilter(filterOption, filterValue)
  }, [filterOption, filterValue]);

  const handleApiCall = (filterOption: string, filterValue:string) => {
    switch(filterOption){
      case '' || 'none':
        return apiWrapper.getComics
      case 'title':
        return apiWrapper.getComicsFilteredByTitle
      case 'issue':
        return apiWrapper.getComicsFilteredByIssueNumber
      default:
        return apiWrapper.getComics
    }
  }

  const loadNextPage = (...args: any) => {
    console.log("loadNexTPage");
    if (isNextPageLoading) {
      return;
    }
    setIsNextPageLoading(true);
    console.log(`comicAmount ${comicAmount}`)
    const chosenApiCall = handleApiCall(filterOption, filterValue)
    console.log(chosenApiCall.name)
    if (comicAmount === 0) {
      chosenApiCall(filterValue).then((response) => {
        if (response && setComicsResponse) {
          setComicsResponse(response);
          comicAmount = response.data.results.length
        } else {
          console.log("revisar setComicsResponse | undefined");
        }
        setIsNextPageLoading(false);
      });
    } else if(comicAmount > 0 && comicsResponse) {
      chosenApiCall(filterValue, comicsResponse.data.results.length).then((response) => {
        if (response && comicsResponse && setComicsResponse) {
          const newResults = response.data.results;
          const mergedComics = comicsResponse.data.results.concat(newResults);
          response.data.results = mergedComics;
          setComicsResponse(response);
        }
        setIsNextPageLoading(false);
      });
     
    }
  };
  const handleFilter = (filterOption: string, filterValue: string) => {
    if (filterValue.length > 0) {
      comicAmount = 0
      //TODO: Improve string comparison
      loadNextPage();
    }
  };
  return (
    <ComicsContext.Provider value={comicsResponse}>
      <ComicsFilterControl
        setFilterOption={setFilterOption}
        setFilterValue={setFilterValue}
      />
      <StyledDiv>
        <ScrollableWindow hasNextPage loadMoreItems={loadNextPage} />
      </StyledDiv>
    </ComicsContext.Provider>
  );
};

export default ComicsPage;
