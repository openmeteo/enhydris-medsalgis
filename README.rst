=====================================
Enhydris-medsalgis - Extra map layers
=====================================

Overview
========

Enhydris-medsalgis provides layers (such as water basins
and river networks) for the Medsal project. In the repository there's
also MapServer configuration for serving these layers with WMS and WFS.

The app is specific to the Medsal project and several things are
hardwired in the code.

Installing and configuring
==========================

- Install Enhydris 4 or later

- Make sure ``enhydris_medsalgis`` is in the PYTHONPATH, or link to it
  from the top-level directory of Enhydris.

- In the Enhydris ``enhydris_project/settings/local.py`` file, add
  ``enhydris_medsalgis`` to ``INSTALLED_APPS``, add
  ``enhydris_medsalgis.middleware.MedsalGISMiddleware`` to
  ``MIDDLEWARE``, and specify the mapserver root url in
  ``ENHYDRIS_OWS_URL``.

  ``ENHYDRIS_OWS_URL`` must end in a slash; it does not include the
  filename ``medsalgis.map``, which is hardwired and appended to
  ``ENHYDRIS_OWS_URL`` automatically. In fact, the current language may
  also be inserted, so that the resulting URL may be something like
  ``ENHYDRIS_OWS_URL/el/medsalgis.map`` (but
  ``ENHYDRIS_OWS_URL/medsalgis.map`` also works; it is the default
  "unlocalized"—actually English—URL).

- Start MapServer and access these layers.

Meta
====

| Copyright (C) 2018-2021 National Technical University of Athens
| Copyright (C) 2018-2021 Institute of Communication and Computer Systems
| Copyright (C) 2023 IRMASYS

Enhydris-medsalgis is free software: you can redistribute it and/or
modify it under the terms of the GNU Affero General Public License, as
published by the Free Software Foundation; either version 3 of the
License, or (at your option) any later version.

The software is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
licenses for more details.

You should have received a copy of the license along with this
program.  If not, see http://www.gnu.org/licenses/.
