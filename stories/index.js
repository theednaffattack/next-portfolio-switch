import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Header from '../components/Header';

import Router from 'next/router'
const mockedRouter = { push: () => {} }
Router.router = mockedRouter

const stories = storiesOf('Header', module);

stories.add('with a single todo item', () => (
  <Header />
))

storiesOf('Header', module)
  .add('with text', () => <Header />);
