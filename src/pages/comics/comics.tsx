import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import path from "path";

import ApiWrapper from "src/lib/apiWrapper";
import ComicsResponse from "src/models/comics/ComicsResponse";
import ScrollableWindow from "src/components/layouts/ScrollableWindow";

import { placeholderMarvelImage } from "../../images";
import IScrollable from "src/models/IScrollable";

const placeholderMarvelImagePath = path.resolve(placeholderMarvelImage);

const obtainData = async () => {
  const apiWrapper = new ApiWrapper();
  const responseData = await apiWrapper.getComics();
  return responseData;
};

const StyledDiv = styled.div`
  ${tw`flex flex-col`}
`;
export const ComicsContext = React.createContext({} as IScrollable | undefined);
interface Props {}
const ComicsPage: React.FC<Props> = (props) => {
  const [comicsResponse, setComicsResponse] = useState<ComicsResponse>();
  useEffect(() => {
    console.log(
      obtainData().then((response) => {
        console.log(`respuesta ${response}`);
        setComicsResponse(response);
      })
    );
  }, []);
  return (
    <ComicsContext.Provider value={comicsResponse}>
      <StyledDiv>
        <ScrollableWindow itemsPerRow={5} />
      </StyledDiv>
    </ComicsContext.Provider>
  );
};

export default ComicsPage;
