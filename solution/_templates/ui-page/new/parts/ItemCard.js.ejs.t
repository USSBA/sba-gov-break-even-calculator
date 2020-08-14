---
to: ui/src/parts/<%= h.changeCase.kebab(h.inflection.pluralize(name)) %>/<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>Card.js
---
import React from 'react';
import { observer, inject } from 'mobx-react';
import { decorate, runInAction } from 'mobx';
import { withRouter } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { Header, Label } from 'semantic-ui-react';

// expected props
// - <%= h.changeCase.camel(name) %> - a <%= h.changeCase.ucFirst(h.changeCase.camel(name)) %> model instance (via props)
// - userDisplayName (via injection)
// - location (from react router)
class <%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>Card extends React.Component {

  constructor(props) {
    super(props);
    runInAction(() => {
      // add any state changing initialization logic if needed
    });
  }

  get<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>() {
    return this.props.<%= h.changeCase.camel(name) %>;
  }

  getUserDisplayNameService() {
    return this.props.userDisplayName;
  }

  render() {
    const item = this.get<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>();
    const { name, createdAt, createdBy } = item;
    const displayNameService = this.getUserDisplayNameService();
    const isSystem = displayNameService.isSystem(createdBy);
    const by = () => isSystem ? '' : <span className="ml1">by {displayNameService.getDisplayName(createdBy)}</span>;

    return (
      <React.Fragment>
        <Label attached="top left"><%= h.changeCase.ucFirst(h.changeCase.camel(name)) %></Label>
        <div className="flex mb1">
          <Header as="h3" color="grey" className="mt0 flex-auto ellipsis">
            {name}
            <Header.Subheader className="fs-9">
              created <TimeAgo date={createdAt} /> {by()}
            </Header.Subheader>
          </Header>
          {/* <div className="ml1"><span className="ellipsis pr1 fs-9 breakout color-grey">{id}</span></div> */}
        </div>
      </React.Fragment>
    );
  }
}

// see https://medium.com/@mweststrate/mobx-4-better-simpler-faster-smaller-c1fbc08008da
decorate(<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>Card, {
});

export default inject('userDisplayName')(withRouter(observer(<%= h.changeCase.ucFirst(h.changeCase.camel(name)) %>Card)));
