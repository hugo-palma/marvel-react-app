import React, {useEffect} from "react";
import Select, {ValueType} from "react-select";
import styled from "styled-components";
import tw from "twin.macro";
import ISelectOption from "src/models/ISelectOption";
import ComicsApiWrapper from "src/lib/ComicsApiWrapper";
import SelectOptionHandler from "src/lib/SelectOptionHandler";
import AsyncSelect from 'react-select/async';

interface Props {
  filterOption: ISelectOption
  setFilterOption: React.Dispatch<React.SetStateAction<ISelectOption>>,
  setFilterValue: React.Dispatch<React.SetStateAction<ISelectOption>>
}

const Container = styled.div`
  ${tw`flex flex-row  ml-16`};
`;
const StyledDiv = styled.div`
  ${tw`inline items-start w-64`};
`;
const StyledInputDiv = styled.div`
  ${tw`inline items-start w-64 ml-12`};
`;
const CharactersFilterOptions = [
  {value: 'name', label: 'Filter by name'},
  {value: 'comics', label: 'Filter by comics'},
  {value: 'stories', label: 'Filter by stories'},
  {value: 'none', label: 'None'}
];
const filterValues = [] as Array<ISelectOption>;

const CharactersFilterControl: React.FC<Props> = React.memo(function CharactersFilterControl(props){
    let filterOption = props.filterOption
    useEffect(() => {
      console.log('cambio de opcion de filtro de characters')
      filterOption = props.filterOption
    }, [props.filterOption])
    const setFilterOption = props.setFilterOption
    const setFilterValue = props.setFilterValue
    const checkIfFilterChosenOptionIsName = (inputValue: ISelectOption) => {
      //TODO: optimize comparison
      return inputValue === CharactersFilterOptions[0]
    }
    const checkIfFilterChosenOptionIsComics = (inputValue: ISelectOption) => {
      return inputValue === CharactersFilterOptions[1];
    }
    const handleOptionChange = (value: ValueType<ISelectOption>) => {
      const selectedOption = value as ISelectOption
      setFilterOption(selectedOption)
    };
    const handleFilterValueChange = (filterValue: ValueType<ISelectOption>) => {
      const value = filterValue as ISelectOption
      if (checkIfFilterChosenOptionIsName(filterOption)) {
        setFilterValue(value)
      }
    };
    const handleFilterInputChange = (value: string) => {
      if (checkIfFilterChosenOptionIsName(filterOption)) {
        return [{value: value, label: value}]
      }
    }
    const promiseOptions = async (inputValue: string) => {
      //Obtaining api results
      if (checkIfFilterChosenOptionIsComics(filterOption)) {
        const comicsApiWrapper = new ComicsApiWrapper()
        const response = await comicsApiWrapper.getComicsFilteredByTitle(inputValue, 0)
        return SelectOptionHandler.mapApiResponseToSelectOptions(response)
      } else if (checkIfFilterChosenOptionIsName(filterOption)) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(handleFilterInputChange(inputValue))
          }, 1)
        })
      }
    }
    const customTheme = (theme: any) => {
      return {
        ...theme,
        colors: {
          ...theme.colors,
          primary: 'red'
        }
      }
    };

    return (
      <Container className="flex flex-row">
        <StyledDiv>
          <Select placeholder='Filter characters' onChange={handleOptionChange} autoFocus theme={customTheme}
                  options={CharactersFilterOptions}/>
        </StyledDiv>
        <StyledInputDiv>
          <AsyncSelect loadOptions={promiseOptions} onChange={handleFilterValueChange} theme={customTheme}/>
        </StyledInputDiv>
      </Container>
    );
  })
;

export default CharactersFilterControl;
