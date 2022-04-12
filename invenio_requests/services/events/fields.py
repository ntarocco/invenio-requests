# -*- coding: utf-8 -*-
#
# Copyright (C) 2022 CERN.
#
# Invenio-Requests is free software; you can redistribute it and/or modify it
# under the terms of the MIT License; see LICENSE file for more details.

"""Marshmallow fields."""

from flask_babelex import lazy_gettext as _
from marshmallow import fields

from ...customizations import EventType
from ...proxies import current_event_type_registry


class EventTypeField(fields.Str):
    """Role field that serializes/deserializes/validates Role objects."""

    default_error_messages = {"invalid_event_type": _("Invalid event type.")}

    _cached_event_types = None

    def __init__(self, *args, **kwargs):
        """Field constructor.

        :param event_types: An event types registry.
                            Defaults to the current event types.
        """
        self._event_types_registry = kwargs.pop(
            "event_types", current_event_type_registry
        )
        super().__init__(*args, **kwargs)

    @property
    def _event_types(self):
        """Cached compute dict of event types."""
        if not self._cached_event_types:
            self._cached_event_types = {
                event_type.type_id: event_type
                for event_type in self._event_types_registry
            }
        return self._cached_event_types

    def _deserialize(self, value, attr, data, **kwargs):
        if value not in self._event_types:
            raise self.make_error("invalid_event_type")
        return self._event_types[value]

    def _serialize(self, value, attr, obj, **kwargs):
        if value is None:
            return value
        elif isinstance(value, str):
            if value in self._event_types:
                return value
        elif isinstance(value, EventType):
            return value.type_id
        raise RuntimeError(f"{value} is not a valid event type to serialize.")
