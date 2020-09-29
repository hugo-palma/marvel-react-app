import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import ComicsApiWrapper from "src/lib/ComicsApiWrapper";
import ComicsResponse from "src/models/comics/ComicsResponse";
import ScrollableWindow from "src/components/layouts/ScrollableWindow/ScrollableWindow";
import IScrollable from "src/models/IScrollable";
import ComicsFilterControl from "src/components/layouts/FilterControl/ComicsFilterControl";
import Data from "src/models/comics/Data";

const StyledDiv = styled.div`
  ${tw`flex flex-col`}
`;
export const ComicsContext = React.createContext({} as IScrollable | undefined);
interface Props {}
const ComicsPage: React.FC<Props> = (props) => {
  //states needed for infinite loading
  //TODO: OBTAIN 20 TO CONFIG FILE
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [comicsResponse, setComicsResponse] = useState<ComicsResponse>();
  const [filterOption, setFilterOption] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [resetPage, setResetPage] = useState(false);
  const apiWrapper = new ComicsApiWrapper();

  useEffect(() => {
    console.log(`cambios en filtros ${filterOption}, ${filterValue}`);
    handleFilter(filterOption, filterValue);
  }, [filterOption, filterValue]);
  useEffect(() => {
    loadNextPage();
    setResetPage(false);
  }, [resetPage]);
  const handleApiCall = (filterOption: string, filterValue: string) => {
    switch (filterOption) {
      case "" || "none":
        return apiWrapper.getComics;
      case "title":
        return apiWrapper.getComicsFilteredByTitle;
      case "issue":
        return apiWrapper.getComicsFilteredByIssueNumber;
      default:
        return apiWrapper.getComics;
    }
  };

  const loadNextPage = (...args: any) => {
    if (isNextPageLoading) {
      return;
    }
    setIsNextPageLoading(true);
    const chosenApiCall = handleApiCall(filterOption, filterValue);
    if (!comicsResponse || comicsResponse.data.results === undefined) {
      chosenApiCall(filterValue).then((response) => {
        if (response && setComicsResponse) {
          setComicsResponse(response);
        } else {
          console.log("check setComicsResponse | undefined");
        }
        setIsNextPageLoading(false);
      });
    } else if (
      comicsResponse &&
      comicsResponse.data &&
      comicsResponse.data.results.length > 0
    ) {
      chosenApiCall(filterValue, comicsResponse.data.results.length).then(
        (response) => {
          if (response && comicsResponse && setComicsResponse) {
            const newResults = response.data.results;
            const mergedComics = comicsResponse.data.results.concat(newResults);
            response.data.results = mergedComics;
            setComicsResponse(response);
          }
          setIsNextPageLoading(false);
        }
      );
    } else {
      console.log("check else in loading more");
      setIsNextPageLoading(false);
    }
  };
  const handleFilter = (filterOption: string, filterValue: string) => {
    console.log(`handleFilter?${filterValue.length}, ${filterOption}`);
    if (filterValue.length > 0 && filterOption !== "") {
      setComicsResponse({
        attributionHTML: "",
        attributionText: "",
        code: 0,
        copyright: "",
        data: {} as Data,
        etag: "",
        status: "",
      });
      setResetPage(true);
    }
  };
  return (
    <ComicsContext.Provider value={comicsResponse}>
        <ComicsFilterControl
          setFilterOption={setFilterOption}
          setFilterValue={setFilterValue}
        />
        <StyledDiv>
          <ScrollableWindow
            responseContext={ComicsContext}
            hasNextPage
            loadMoreItems={loadNextPage}
          />
        </StyledDiv>
    </ComicsContext.Provider>
  );
};

export default ComicsPage;
