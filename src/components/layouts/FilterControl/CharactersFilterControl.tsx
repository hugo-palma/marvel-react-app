import React from "react";
import Select, {ValueType, ActionMeta}  from "react-select";
import styled from "styled-components";
import tw from "twin.macro";

interface Props {
  setFilterOption: React.Dispatch<React.SetStateAction<string>>,
  setFilterValue: React.Dispatch<React.SetStateAction<string>>
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
type CharactersFilterOptionType = {label: string, value: string}
const CharactersFilterOptions = [
    { value: 'name', label: 'Filter by name'},
    { value: 'comics', label: 'Filter by comics'},
    { value: 'stories', label: 'Filter by stories'},
    { value: 'none', label: 'None'}
]

const CharactersFilterControl: React.FC<Props> = (props) => {
    
    const setFilterOption = props.setFilterOption
    const setFilterValue = props.setFilterValue
    const handleOptionChange = (value: ValueType<CharactersFilterOptionType>, actionMeta: ActionMeta<CharactersFilterOptionType>) => {
        let selectedOption = value as CharactersFilterOptionType
        setFilterOption(selectedOption.value)
    }
    const handleValueChange = (event: any) => {
      setFilterValue(event.target.value)
    }
    function customTheme(theme: any) {
        return {
            ...theme,
            colors:{
                ...theme.colors,
                primary: 'red'
            }
        }
    }

  return (
    <Container className="flex flex-row">
      <StyledDiv>
        <Select placeholder='Filter characters' onChange={handleOptionChange} autoFocus theme={customTheme} options={CharactersFilterOptions}/>
      </StyledDiv>
      <StyledInputDiv>
        <input onChange={handleValueChange}/>
      </StyledInputDiv>
    </Container>
  );
};

export default CharactersFilterControl;
