import styled from "styled-components";
import NopageImg from "/404.jpg";

const NoPageContainer = styled.div`
  background-image: url(${({ img }) => img});
  background-size: contain; /* Ensures the image covers the container */
  background-position: center; /* Centers the image */
  height: 100vh; /* Example height */
  width: 100%; /* Example width */
`;

const NoPage = () => {
  return (
    <NoPageContainer img={NopageImg}>
      {/* Add any other content here */}
    </NoPageContainer>
  );
};

export default NoPage;
