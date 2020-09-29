import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

interface Props{
}

const StyledContainer = styled.div`
    ${tw`mx-auto`}
`;

const LandingPage: React.FC<Props> = (props) => {
    return <StyledContainer>
        <h1>Technical test - Hugo Palma</h1>
        <h3>Missing Features</h3>
        <ol>
            <li>Code splitting</li>
            <li>Bookmark favorite items, missing use of localStorage and route /favorites to hold scrollable view of favorites</li>
            <li>Caching</li>
            <li>Dockerfile for easy deployability</li>
        </ol>
        <h3>Incomplete Features</h3>
        <ol>
            <li>filter characters by comics works with a number input that is a comic Id, a select with comic names function would be ideal</li>
            <li>filter characters by stories works with a number input that is a story Id, also a select with stories names would be ideal</li>
            <li>Got 47 in Lighthouse Performance Score , once the build is optimized by babel and deployed it should be higher</li>
        </ol>
        <h3>Considerations</h3>
        <ol>
            <li>Due to time limitation there are still TODO'S in code</li>
            <li>Named functions were preferred to improve code readability</li>
            <li>Simple styles can be improved with more time</li>
            <li>Comics are ordered by issue number when a filter is not selected</li>
            <li>Characters were already returned sorted by name, the parameter for sorting is included by precaution</li>
            <li>Haven't included a proper readme as you probably noticed in the project link, hope this landing page helps :)</li>
        </ol>
        <h3>Technologies Used</h3>
        <ol>
            <li>Typescript</li>
            <li>React</li>
            <li>Axios</li>
            <li>React router</li>
            <li>React select</li>
            <li>React Window/Infinite Loader</li>
            <li>Styled Components</li>
            <li>Twin Macro</li>
            <li>TailwindCss</li>
        </ol>
        <h3>Other stuff</h3>
        <ol>
            <li>Marvel Regular https://www.fontspace.com/marvel-font-f32182</li>
        </ol>
        
    </StyledContainer>
}
export default LandingPage