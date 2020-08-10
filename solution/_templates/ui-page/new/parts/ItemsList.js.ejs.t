---
to: ui/src/parts/<%= h.changeCase.kebab(h.inflection.pluralize(name)) %>/<%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %>List.js
---
import _ from 'lodash';
import React from 'react';
import { decorate, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Header, Icon, Segment, Container } from 'semantic-ui-react';

import { gotoFn } from '../../helpers/routing';
import { createLink } from '../../helpers/routing';
import { swallowError } from '../../helpers/utils';
import { isStoreLoading, isStoreEmpty, isStoreNotEmpty, isStoreError } from '../../models/BaseStore';
import ErrorBox from '../helpers/ErrorBox';
import ProgressPlaceHolder from '../helpers/BasicProgressPlaceholder';
import <%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>Card from './<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>Card';

// expected props
// - <%= h.changeCase.camel(h.inflection.pluralize(name)) %>Store (via injection)
// - location (from react router)
class <%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %>List extends React.Component {

  componentDidMount() {
    const store = this.getStore();
    swallowError(store.load());
    store.startHeartbeat();
  }

  componentWillUnmount() {
    const store = this.getStore();
    store.stopHeartbeat();
  }

  getStore() {
    return this.props.<%= h.changeCase.camel(h.inflection.pluralize(name)) %>Store;
  }

  handleDetailClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // see https://reactjs.org/docs/events.html and https://github.com/facebook/react/issues/5733
    const instanceId = event.currentTarget.dataset.instance;
    const goto = gotoFn(this);
    goto(`/<%= h.changeCase.kebab(h.inflection.pluralize(name)) %>/id/${instanceId}`);
  }

  goto(pathname) {
    const location = this.props.location;
    const link = createLink({ location, pathname });

    this.props.history.push(link);
  }

  render() {
    const store = this.getStore();
    let content = null;

    if (isStoreError(store)) {
      content = <ErrorBox error={store.error} className="p0" />;
    } else if (isStoreLoading(store)) {
      content = <ProgressPlaceHolder segmentCount={3} />;
    } else if (isStoreEmpty(store)) {
      content = this.renderEmpty();
    } else if (isStoreNotEmpty(store)) {
      content = this.renderMain();
    } else {
      content = null;
    }

    return (
      <Container className="mt3">
        {this.renderTitle()}
        {content}
      </Container>
    );
  }

  renderEmpty() {
    return (
      <Segment placeholder>
        <Header icon className="color-grey">
          <Icon name="clipboard outline" />
          No <%= h.changeCase.camel(h.inflection.pluralize(name)) %>
          <Header.Subheader>To create a <%= h.changeCase.camel(name) %>, make a wish.</Header.Subheader>
        </Header>
      </Segment>
    );
  }

  renderTitle() {
    return (
      <div className="mb3 flex">
        <Header as="h3" className="color-grey mt1 mb0 flex-auto">
          <Icon name="list alternate outline" className="align-top" />
          <Header.Content className="left-align"><%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %></Header.Content>
        </Header>
      </div>
    );
  }

  renderMain() {
    const store = this.getStore();
    const list = store.list;
    
    return (
      <div>
        {_.map(list, (item) => <Segment className="p3 mb2  cursor-pointer" clearing={true} key={item.id} data-instance={item.id} onClick={this.handleDetailClick}><<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>Card <%= h.changeCase.camel(name) %>={item} /></Segment>)}
      </div>
    );
  }
}

// see https://medium.com/@mweststrate/mobx-4-better-simpler-faster-smaller-c1fbc08008da
decorate(<%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %>List, {
  handleDetailClick: action,
});

export default inject('<%= h.changeCase.camel(h.inflection.pluralize(name)) %>Store')(withRouter(observer(<%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %>List)));
