import React from 'react';
import { storiesOf } from '@storybook/react';
import Header from '../components/Header';

// router mocking for the storybook LinkTo to work
import Router from 'next/router';
const mockedRouter = { push: () => {} };
Router.router = mockedRouter;

cosnt stories = storiesOf('Header', module);

stories.add('with nav items', () => (
  <Header />;
));

return (
  <Header />
);
