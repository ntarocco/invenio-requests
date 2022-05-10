// This file is part of InvenioRequests
// Copyright (C) 2022 CERN.
//
// Invenio RDM Records is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import { i18next } from "@translations/invenio_requests/i18next";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { Image } from "react-invenio-forms";
import Overridable from "react-overridable";
import { Divider, Header, Label } from "semantic-ui-react";
import { timestampToRelativeTime } from "../utils";
import RequestStatusIcon from "./RequestStatusIcon";

const User = ({ user }) => (
  <>
    <Image src={user.links.avatar} avatar rounded />
    <span>{user.profile.full_name}</span>
  </>
);
const Community = ({ community }) => (
  <>
    <Image src={community.links.logo} wrapped size="mini" className="mr-5" />
    <span>{community.metadata.title}</span>
  </>
);

const Requestor = ({ request }) => {
  const createdBy = request.created_by;
  const isUser = "user" in createdBy;
  const isCommunity = "community" in createdBy;
  const expandedCreatedBy = request.expanded?.created_by;

  let cmp;
  if (isUser) {
    cmp = <User user={expandedCreatedBy} />;
  } else if (isCommunity) {
    cmp = <Community community={expandedCreatedBy} />;
  } else {
    // default unknown created_by
    cmp = (
      <>
        <Image src="/static/images/square-placeholder.png" avatar rounded />
        <span>{createdBy.user?.id || createdBy.community?.id}</span>
      </>
    );
  }
  return (
    <>
      <Header as="h4">{i18next.t("Requestor")}</Header>
      {cmp}
    </>
  );
};

class RequestMetadata extends Component {
  render() {
    const { request } = this.props;
    return (
      <Overridable id="InvenioRequest.RequestMetadata.Layout" request={request}>
        <>
          <Requestor request={request} />
          <Divider />
          <Header as="h3" size="tiny">
            {i18next.t("Request type")}
          </Header>
          <Label>{request.type}</Label>
          <Divider />
          <Header as="h3" size="tiny">
            {i18next.t("Status")}
          </Header>
          <RequestStatusIcon status={request.status} />
          {request.status}
          {request.expires_at && (
            <>
              <Divider />
              <Header as="h3" size="tiny">
                {i18next.t("Expires")}
              </Header>
              {timestampToRelativeTime(request.expires_at)}
            </>
          )}
          <Divider hidden />
        </>
      </Overridable>
    );
  }
}

RequestMetadata.propTypes = {
  request: PropTypes.object.isRequired,
};

export default Overridable.component(
  "InvenioRequests.RequestMetadata",
  RequestMetadata
);
