import React from 'react';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import { NavigationBar } from './components/NavigationBar';
const Wrapper = styled.div`
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;
export const NoMatch = () => (
  <div>  <NavigationBar />

  <Sidebar />
  <Wrapper>
    <h2>No Match</h2>
  </Wrapper>
  </div>
)