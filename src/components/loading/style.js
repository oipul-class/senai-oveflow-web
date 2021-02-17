import styled, { keyframes } from "styled-components";

const spin = keyframes`
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0.6;
    }
    100% {
        opacity: 1;
        transform: rotate(360deg);
    }
`;

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: absolute;
    background-color: #333c;

    z-index: 999;

    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-content: center;
    align-items: center;
    cursor: progress;

    user-select: none;

    > img {
        width: 100px;
        height: 100px;
        border-radius: 50%;

        margin-bottom: 5px;

        pointer-events: none;

        animation: ${spin} 2s infinite linear;
    }
`;