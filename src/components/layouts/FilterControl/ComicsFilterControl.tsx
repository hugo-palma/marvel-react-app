import React, { useState } from "react";
import Select, {ValueType, ActionMeta}  from "react-select";
import styled from "styled-components";
import tw from "twin.macro";

interface Props {
  filterOption: string,
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
const StyledInput = styled.input<{hiddenInput: boolean}>`
  ${tw`py-2`};
  ${Select => Select.hiddenInput? '' :'display:none'};
`;
const StyledFormatSelect = styled(Select)<{hidden: boolean}>`
  ${Select => Select.hidden && 'display:none'};
`;
type ComicFilterOption = {label: string, value: string}
const ComicsFilterOptions = [
    { value: 'format', label: 'Filter by format'},
    { value: 'title', label: 'Filter by title'},
    { value: 'issue', label: 'Filter by issue number'},
    { value: 'none', label: 'None'}
]
const ComicsFormatOptions = [
    {value: 'comic', label:'Comic'},
    {value: 'magazine', label:'Magazine'},
    {value: 'trade', label:'Trade Paperback'},
    {value: 'hardcover', label:'Hardcover'},
    {value: 'digest', label:'Digest'},
    {value: 'graphic novel', label: 'Graphic Novel'},
    {value: 'digital comic', label: 'Digital comic'},
    {value: 'infinite comic', label: 'Infinite Comic'},
]


const ComicsFilterControl: React.FC<Props> = (props) => {
    const [hiddenSelect, setHiddenSelect] = useState(true);
    const setFilterOption = props.setFilterOption
    const setFilterValue = props.setFilterValue
    const handleOptionChange = (value: ValueType<ComicFilterOption>, actionMeta: ActionMeta<ComicFilterOption>) => {
        let selectedOption = value as ComicFilterOption
        selectedOption.value === 'format' ? setHiddenSelect(false) : setHiddenSelect(true);
        setFilterOption(selectedOption.value)
    }
    const handleFormatValueChange = (value: ValueType<ComicFilterOption>, actionMeta: ActionMeta<ComicFilterOption>) => {
      let selectedOption = value as ComicFilterOption
      setFilterValue(selectedOption.value)
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
        <Select placeholder='Filter comics' onChange={handleOptionChange} autoFocus theme={customTheme} options={ComicsFilterOptions}/>
      </StyledDiv>
      <StyledInputDiv>
        <StyledInput hiddenInput={hiddenSelect} onChange={handleValueChange}/>
        <StyledFormatSelect hidden={hiddenSelect}placeholder='Select Format' onChange={handleFormatValueChange} theme={customTheme} options={ComicsFormatOptions}/>
      </StyledInputDiv>
    </Container>
  );
};

export default ComicsFilterControl;
