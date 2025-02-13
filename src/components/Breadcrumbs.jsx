
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BreadcrumbContainer = styled.nav`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: ${({ theme }) => theme.bgLight};
`;

const BreadcrumbItem = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text_primary};
  
  &:not(:last-child) {
    margin-right: 8px;
  }
  
  &::after {
    content: '/';
    margin-left: 8px;
    color: ${({ theme }) => theme.text_primary};
  }

  &:last-child::after {
    content: '';
  }
`;

const Breadcrumb = ({ routes }) => {
  return (
    <BreadcrumbContainer  style={{marginLeft:"5em"}}>
      {routes.map((route, index) => (
        <BreadcrumbItem key={index}>
          {route.link ? <Link to={route.link} style={{color:"#15c6ed"}}>{route.name}</Link> : route.name}
        </BreadcrumbItem>
      ))}
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
