// This file is part of InvenioRequests
// Copyright (C) 2022 CERN.
//
// Invenio RDM Records is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import {
  RequestAcceptModalTrigger,
  RequestCancelModalTrigger,
  RequestDeclineModalTrigger,
} from "@js/invenio_requests/components/ModalTriggers";
import { i18next } from "@translations/invenio_requests/i18next";
import React from "react";
import ReactDOM from "react-dom";
import {
  RequestAcceptButton,
  RequestCancelButton,
  RequestDeclineButton,
} from "./components/Buttons";
import { InvenioRequestsApp } from "./InvenioRequestsApp";
import {
  AcceptStatus,
  CancelStatus,
  DeclineStatus,
  DeleteStatus,
  ExpireStatus,
  LabelTypeCommunityInclusion,
  LabelTypeCommunityInvitation,
  LabelTypeCommunitySubmission,
  SubmitStatus,
} from "./request";
import {
  TimelineAcceptEvent,
  TimelineCancelEvent,
  TimelineCommentDeletionEvent,
  TimelineDeclineEvent,
  TimelineExpireEvent,
  TimelineUnknownEvent,
} from "./timelineEvents";

const requestDetailsDiv = document.getElementById("request-detail");
const request = JSON.parse(requestDetailsDiv.dataset.record);
const defaultQueryParams = JSON.parse(
  requestDetailsDiv.dataset.defaultQueryConfig
);
const userAvatar = JSON.parse(requestDetailsDiv.dataset.userAvatar);

const overriddenComponents = {
  "TimelineEvent.layout.unknown": TimelineUnknownEvent,
  "TimelineEvent.layout.declined": TimelineDeclineEvent,
  "TimelineEvent.layout.accepted": TimelineAcceptEvent,
  "TimelineEvent.layout.expired": TimelineExpireEvent,
  "TimelineEvent.layout.cancelled": TimelineCancelEvent,
  "TimelineEvent.layout.comment_deleted": TimelineCommentDeletionEvent,
  "RequestStatus.layout.submitted": SubmitStatus,
  "RequestStatus.layout.deleted": DeleteStatus,
  "RequestStatus.layout.accepted": AcceptStatus,
  "RequestStatus.layout.declined": DeclineStatus,
  "RequestStatus.layout.cancelled": CancelStatus,
  "RequestStatus.layout.expired": ExpireStatus,
  "RequestTypeLabel.layout.community-submission": LabelTypeCommunitySubmission,
  "RequestTypeLabel.layout.community-inclusion": LabelTypeCommunityInclusion,
  "RequestTypeLabel.layout.community-invitation": LabelTypeCommunityInvitation,
  "RequestActionModalTrigger.accept": RequestAcceptModalTrigger,
  "RequestActionModalTrigger.decline": RequestDeclineModalTrigger,
  "RequestActionModalTrigger.cancel": RequestCancelModalTrigger,
  "RequestActionButton.cancel": RequestCancelButton,
  "RequestActionButton.accept": RequestAcceptButton,
  "RequestActionButton.decline": RequestDeclineButton,
  "RequestActionModal.title.cancel": () => i18next.t("Cancel request"),
  "RequestActionModal.title.accept": () => i18next.t("Accept request"),
  "RequestActionModal.title.decline": () => i18next.t("Decline request"),
};

ReactDOM.render(
  <InvenioRequestsApp
    request={request}
    defaultQueryParams={defaultQueryParams}
    overriddenCmps={overriddenComponents}
    userAvatar={userAvatar}
  />,
  requestDetailsDiv
);
