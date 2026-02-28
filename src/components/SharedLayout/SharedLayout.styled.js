import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 16px;
`;




export const Frame = styled.div`
  border-radius: 50%;
  background-color: #87ceeb;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border: 1px solid #fff;
  box-shadow: inset 0 0 10px 5px rgba(0, 0, 0, 0.3);
`;

export const Icon = styled.svg`
  fill: rgb(114, 17, 17);
`;

export const IconLabel = styled.span`
  font-family: 'Sansita Swashed';
  font-size: 20px;
  color: #fff;
  text-shadow: 3px 3px 20px rgb(114, 17, 17), 5px 5px 5px #000000;
  margin: 2px;

  &::first-letter {
    font-size: 30px;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 0;
  margin-bottom: 16px;
  margin-top: 16px;
  border: 5px solid #fff;
  background-color: #48bdeb;
  border-radius: 4px;
  filter: drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.3));

  > div > nav {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Comic Sans MS';
    padding: 10px;
    gap: 7px;
  }
`;

export const Logo = styled.div`
  margin-left: 10px;
  font-weight: 700;
  display: flex;
  align-items: flex-end;
`;

export const Link = styled(NavLink)`
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: blue;
  font-weight: 700;
  background-color: #87ceeb;
  border: 2px solid #fff;

  &.active {
    color: white;
    background-color: blue;
  }

  &:hover {
    color: white;
    background-color: blue;
  }
`;

export const Linker = styled.button`
  width:70px;
  height:70px;
  border-radius: 50%;
  text-decoration: none;
  color: blue;
  font-weight: 700;
  background-color: #87ceeb;
  border: 2px solid #fff;
  font-size:15px;

  &.active {
    color: white;
    background-color: blue;
  }

  &:hover {
    color: white;
    background-color: blue;
  }
`;

export const Button = styled.button`
  padding-left: 20px;
  padding-right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  text-decoration: none;
  color: blue;
  font-weight: 700;
  background-color: #87ceeb;
  border: 2px solid #fff;
  font-family: Comic Sans MS;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: white;
    background-color: blue;
  }
`;


export const Symbol = styled(NavLink)`
  text-decoration: none;
  transition-property: transform;
  transition-duration: 250ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.1);
    
  }
`;
