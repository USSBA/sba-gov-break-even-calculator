---
to: ui/src/parts/<%= h.changeCase.kebab(h.inflection.pluralize(name)) %>/<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>DetailPage.js
---
import React from 'react';
import { observer, inject } from 'mobx-react';
import { decorate } from 'mobx';
import { withRouter } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { Header, Label, Breadcrumb, Container, Segment, Icon } from 'semantic-ui-react';

import { gotoFn } from '../../helpers/routing';
import { swallowError } from '../../helpers/utils';
import { isStoreLoading, isStoreReady, isStoreError } from '../../models/BaseStore';
import ErrorBox from '../helpers/ErrorBox';
import ProgressPlaceHolder from '../helpers/BasicProgressPlaceholder';


// expected props
// - <%= h.changeCase.camel(h.inflection.pluralize(name)) %>Store (via injection)
// - userDisplayName (via injection)
// - location (from react router)
class <%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>DetailPage extends React.Component {

  componentDidMount() {
    const store = this.getInstanceStore();
    swallowError(store.load());
    store.startHeartbeat();
  }

  componentWillUnmount() {
    const store = this.getInstanceStore();
    store.stopHeartbeat();
  }

  getInstanceStore() {
    const instanceId = this.getInstanceId();
    return this.props.<%= h.changeCase.camel(h.inflection.pluralize(name)) %>Store.get<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>Store(instanceId);
  }

  getUserDisplayNameService() {
    return this.props.userDisplayName;
  }

  getInstanceId() {
    return (this.props.match.params || {}).instanceId;
  }

  get<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>() {
    const store = this.getInstanceStore();
    if (!isStoreReady(store)) return {};
    return store.<%= h.changeCase.camel(name) %>;
  }

  render() {
    const store = this.getInstanceStore();
    let content = null;

    if (isStoreError(store)) {
      content = <ErrorBox error={store.error} className="p0" />;
    } else if (isStoreLoading(store)) {
      content = <ProgressPlaceHolder />;
    } else if (isStoreReady(store)) {
      content = this.renderMain();
    } else {
      content = null;
    }

    return (
      <Container className="mt3">
        {this.renderBreadcrumb()}
        {content}
      </Container>
    );
  }

  renderBreadcrumb() {
    const instanceId = this.getInstanceId();
    const goto = gotoFn(this);

    return (
      <Breadcrumb className="block mb3">
        <Breadcrumb.Section link onClick={() => goto('/<%= h.changeCase.kebab(h.inflection.pluralize(name)) %>')}><%= h.changeCase.ucFirst(h.changeCase.camel(h.inflection.pluralize(name))) %></Breadcrumb.Section>
        <Breadcrumb.Divider icon="right angle" />
        <Breadcrumb.Section active>{instanceId}</Breadcrumb.Section>
      </Breadcrumb>
    );
  }

  renderMain() {
    const instance = this.get<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>();
    const { id, name, updatedAt, updatedBy } = instance;
    const displayNameService = this.getUserDisplayNameService();
    const isSystem = displayNameService.isSystem(updatedBy);
    const by = () => isSystem ? '' : <span className="ml1">by {displayNameService.getDisplayName(updatedBy)}</span>;

    return (
      <React.Fragment>
        <div className="flex mb2">
          <Header as="h3" color="grey" className="mt0 flex-auto ellipsis">
            <Label color="teal" className="ml0 mr1">open</Label><Label color="blue" className="ml0 mr1"><%= h.changeCase.ucFirst(h.changeCase.camel(name)) %></Label>{name} - {id}
            <Header.Subheader className="fs-9 color-grey mt1">
              <div>updated <TimeAgo date={updatedAt} /> {by()}</div>
            </Header.Subheader>
          </Header>
        </div>
        <div className="mb3">
          {this.renderPlaceholder()}
        </div>
      </React.Fragment>
    );
  }

  renderPlaceholder() {
    return (
      <Segment placeholder>
        <Header icon className="color-grey">
          <Icon name="clipboard outline" />
          Superpower
          <Header.Subheader>Replace the whole placeholder with your own item detail</Header.Subheader>
        </Header>
      </Segment>
    );
  }

}

// see https://medium.com/@mweststrate/mobx-4-better-simpler-faster-smaller-c1fbc08008da
decorate(<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>DetailPage, {
});

export default inject('<%= h.changeCase.camel(h.inflection.pluralize(name)) %>Store', 'userDisplayName')(withRouter(observer(<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>DetailPage)));
