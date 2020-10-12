import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import StoriesApiWrapper from "src/lib/StoriesApiWrapper";
import StoriesResponse from "src/models/stories/StoriesResponse";
import ScrollableWindow from "src/components/layouts/ScrollableWindow/ScrollableWindow";
import IScrollable from "src/models/IScrollable";

const StyledDiv = styled.div`
  ${tw`flex flex-col`}
`;
export const StoriesContext = React.createContext({} as IScrollable | undefined);
interface Props {}
const StoriesPage: React.FC<Props> = (props) => {
  //states needed for infinite loading
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [storiesResponse, setStoriesResponse] = useState<StoriesResponse>();
  const [resetPage, setResetPage] = useState(false);
  const apiWrapper = new StoriesApiWrapper();

  useEffect(() => {
    loadNextPage()
    setResetPage(false)
  }, [resetPage])

  const loadNextPage = (...args: any) => {
    if (isNextPageLoading) {
      return;
    }
    setIsNextPageLoading(true);
    const chosenApiCall = apiWrapper.getStories
    if (!storiesResponse || (storiesResponse.data.results === undefined)){
      chosenApiCall('').then((response) => {
        if (response && setStoriesResponse) {
          console.log(response)
          setStoriesResponse(response);
        } else {
          console.log("check setStoriesResponse | undefined");
        }
        setIsNextPageLoading(false);
      });
    } else if(storiesResponse && storiesResponse.data && storiesResponse.data.results.length > 0) {
      chosenApiCall('', storiesResponse.data.results.length).then((response) => {
        if (response && storiesResponse && setStoriesResponse) {
          const newResults = response.data.results;
          response.data.results = storiesResponse.data.results.concat(newResults);
          setStoriesResponse(response);
        }
        setIsNextPageLoading(false);
      });

    }
    else{
      console.log('check else in loading more')
      setIsNextPageLoading(false)
    }
  };
  return (
    <StoriesContext.Provider value={storiesResponse}>
      <StyledDiv>
        <ScrollableWindow hasNextPage loadMoreItems={loadNextPage} responseContext={StoriesContext}/>
      </StyledDiv>
    </StoriesContext.Provider>
  );
};

export default StoriesPage;
