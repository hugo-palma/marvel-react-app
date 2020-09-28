import React, {useState, useEffect} from "react";
import Select, {ValueType, ActionMeta}  from "react-select";
import makeAnimated from "react-select/animated";
import styled from "styled-components";
import tw from "twin.macro";

interface Props {}
const Container = styled.div`
  ${tw`flex flex-row  ml-16`};
`;
const StyledDiv = styled.div`
  ${tw`inline items-start w-64`};
`;
const StyledInputDiv = styled.div`
  ${tw`inline items-start w-64 ml-12`};
`;
type ComicFilterOption = {label: string, value: string}
const ComicsFilterOptions = [
    { value: 'format', label: 'Filter by format'},
    { value: 'title', label: 'Filter by title'},
    { value: 'issue', label: 'Filter by issue number'},
    { value: 'none', label: 'None'}
]

const ComicsFilterControl: React.FC<Props> = () => {
    
    const [comicFilter, setComicFilter] = useState('')
    const handleChange = (value: ValueType<ComicFilterOption>, actionMeta: ActionMeta<ComicFilterOption>) => {
        let selectedOption = value as ComicFilterOption
        setComicFilter(selectedOption.value)
    }
    useEffect(() => {
        console.log(comicFilter)
    }, [comicFilter])
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
        <Select placeholder='Filter comics' onChange={handleChange} autoFocus theme={customTheme} options={ComicsFilterOptions}/>
      </StyledDiv>
      <StyledInputDiv>
        <input />
      </StyledInputDiv>
    </Container>
  );
};

export default ComicsFilterControl;
