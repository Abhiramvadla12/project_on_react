import styled from "styled-components";
import NopageImg from "/404.jpg";

const NoPageContainer = styled.div`
  height: 100vh; /* Full viewport height */
  width: 100vw;  /* Full viewport width */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Prevents scrolling */
`;

const NoPageImage = styled.img`
  height: 100%;
  width: 100%;
  // object-fit: cover; /* Ensures the image covers the entire container */
`;

const NoPage = () => {
  return (
    <NoPageContainer>
      <NoPageImage src={NopageImg} alt="Image not found" />
    </NoPageContainer>
  );
};

export default NoPage;
