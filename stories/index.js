import React from 'react';
import { storiesOf } from '@storybook/react';


import Router from 'next/router'
const mockedRouter = { push: () => {} }
Router.router = mockedRouter


import Header from '../components/Header';


const stories = storiesOf('Header', module);

stories.add('with text', () => (
  <Header children={'text'} />
))