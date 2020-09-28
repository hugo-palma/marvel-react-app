import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";

import CharactersApiWrapper from "src/lib/CharacterApiWrapper";
import CharactersResponse from "src/models/characters/CharactersResponse";
import ScrollableWindow from "src/components/layouts/ScrollableWindow/ScrollableWindow";
import IScrollable from "src/models/IScrollable";
import CharactersFilterControl from "src/components/layouts/FilterControl/CharactersFilterControl";
import Data from "src/models/characters/Data";

const StyledDiv = styled.div`
  ${tw`flex flex-col`}
`;
export const CharactersContext = React.createContext({} as IScrollable | undefined);
export const TotalComicsAmountContext = React.createContext(0);
interface Props {}
const CharactersPage: React.FC<Props> = (props) => {
  //states needed for infinite loading
  //TODO: OBTAIN 20 TO CONFIG FILE
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const [charactersResponse, setCharactersResponse] = useState<CharactersResponse>();
  const [filterOption, setFilterOption] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [resetPage, setResetPage] = useState(false);
  const apiWrapper = new CharactersApiWrapper();

  useEffect(() => {
    console.log(`cambios en filtros ${filterOption}, ${filterValue}`)
    handleFilter(filterOption, filterValue)
  }, [filterOption, filterValue]);
  useEffect(() => {
    loadNextPage()
    setResetPage(false)
  }, [resetPage])
  //TODO: improve swtich options
  const handleApiCall = (filterOption: string, filterValue:string) => {
    switch(filterOption){
      case '' || 'none':
        return apiWrapper.getCharacters
      case 'name':
        return apiWrapper.getCharactersFilteredByName
      case 'comics':
        return apiWrapper.getCharactersFilteredByComics
      case 'stories':
        return apiWrapper.getCharactersFilteredByStories
      default:
        return apiWrapper.getCharacters
    }
  }

  const loadNextPage = (...args: any) => {
    if (isNextPageLoading) {
      return;
    }
    setIsNextPageLoading(true);
    const chosenApiCall = handleApiCall(filterOption, filterValue)
    if (!charactersResponse || (charactersResponse.data.results === undefined)){
      chosenApiCall(filterValue).then((response) => {
        if (response && setCharactersResponse) {
          console.log(response)
          setCharactersResponse(response);
        } else {
          console.log("check setCharactersResponse | undefined");
        }
        setIsNextPageLoading(false);
      });
    } else if(charactersResponse && charactersResponse.data && charactersResponse.data.results.length > 0) {
      chosenApiCall(filterValue, charactersResponse.data.results.length).then((response) => {
        if (response && charactersResponse && setCharactersResponse) {
          const newResults = response.data.results;
          const mergedCharacters = charactersResponse.data.results.concat(newResults);
          response.data.results = mergedCharacters;
          setCharactersResponse(response);
        }
        setIsNextPageLoading(false);
      });
     
    }
    else{
      console.log('check else in loading more')
      setIsNextPageLoading(false)
    }
  };
  const handleFilter = (filterOption: string, filterValue: string) => {
    console.log(`handleFilter?${filterValue.length}, ${filterOption}`)
    if (filterValue.length > 0 && filterOption!= '') {
      setCharactersResponse({
        attributionHTML:'',
        attributionText:'',
        code: 0,
        copyright:'',
        data: {} as Data,
        etag: '',
        status:''})
      //TODO: Improve string comparison
      setResetPage(true);
    }
  };
  return (
    <CharactersContext.Provider value={charactersResponse}>
      <CharactersFilterControl
        setFilterOption={setFilterOption}
        setFilterValue={setFilterValue}
      />
      <StyledDiv>
        <ScrollableWindow hasNextPage loadMoreItems={loadNextPage} responseContext={CharactersContext}/>
      </StyledDiv>
    </CharactersContext.Provider>
  );
};

export default CharactersPage;
