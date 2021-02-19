import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

export const Container = styled.div`
  width: 100%;
  position: relative;

  user-select: none;
  display: flex;
  align-items: center;

  > input {
    border: 0;
    padding-left: 35px;
    border-radius: 3px;

    font-family: sans-serif;
    width: 150px;
    height: 40px;

    font-size: 16px;

    transition: width 0.2s ease-in-out;
  }

  input:focus {
    width: 400px;
  }
`;

export const IconSearch = styled(FaSearch)`
  position: absolute;
  left: 10px;

  color: var(--dark);

  font-size: 20px;
  cursor: pointer;

  :active {
    color: var(--primary);
  }
`;
