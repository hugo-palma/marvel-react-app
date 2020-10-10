import React, {useEffect} from "react";
import Select, {ValueType, ActionMeta} from "react-select";
import styled from "styled-components";
import tw from "twin.macro";
import ISelectOption from "src/models/ISelectOption";

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
const FilterValues = [] as Array<ISelectOption>;

const CharactersFilterControl: React.FC<Props> = (props) => {
  let filterOption = props.filterOption
  useEffect(() => {
    console.log('cambio de opcion de filtro de characters')
    filterOption = props.filterOption
  }, [props.filterOption])
  const setFilterOption = props.setFilterOption
  const setFilterValue = props.setFilterValue
  const checkIfFilterChosenOptionIsName = (inputValue: ISelectOption) => {
    //TODO: optimize comparison
    return inputValue == CharactersFilterOptions[0]
  }
  const handleOptionChange = (value: ValueType<ISelectOption>, actionMeta: ActionMeta<ISelectOption>) => {
    const selectedOption = value as ISelectOption
    setFilterOption(selectedOption)
  };
  const handleFilterValueChange = (filterValue: ValueType<ISelectOption>, actionMeta: ActionMeta<ISelectOption>) => {
    console.log('cambio de valor')
    const value = filterValue as ISelectOption
    if (checkIfFilterChosenOptionIsName(filterOption)) {
      setFilterValue(value)
    }
  };
  const handleFilterInputChange = (value:string) => {
    //clearing filter
    console.log(`written`)
    console.log(filterOption)
    if (checkIfFilterChosenOptionIsName(filterOption)) {
      FilterValues.length = 0
      FilterValues.push({value:value, label:value})
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
        <Select onChange={handleFilterValueChange} onInputChange={handleFilterInputChange} theme={customTheme} options={FilterValues} isSearchable/>
      </StyledInputDiv>
    </Container>
  );
};

export default CharactersFilterControl;
