// This file is part of InvenioRequests
// Copyright (C) 2022 CERN.
//
// Invenio RDM Records is free software; you can redistribute it and/or modify it
// under the terms of the MIT License; see LICENSE file for more details.

import { i18next } from "@translations/invenio_requests/i18next";
import React from "react";
import { Label } from "semantic-ui-react";

export const LabelTypeCommunitySubmission = (props) => (
  <Label {...props}>{i18next.t("Draft review")}</Label>
);

export const LabelTypeCommunityInclusion = (props) => (
  <Label {...props}>{i18next.t("Community inclusion")}</Label>
);

export const LabelTypeCommunityInvitation = (props) => (
  <Label {...props}>{i18next.t("Member invitation")}</Label>
);
