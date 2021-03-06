/** @license
 *  Copyright 2016 - present The Material Motion Authors. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not
 *  use this file except in compliance with the License. You may obtain a copy
 *  of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  License for the specific language governing permissions and limitations
 *  under the License.
 */

import { expect } from 'chai';

import {
  beforeEach,
  describe,
  it,
} from 'mocha-sugar-free';

import {
  stub,
} from 'sinon';

import {
  SimulationLooper,
} from 'rebound';

import {
  State,
  createProperty,
} from 'material-motion-streams';

import {
  _springSystem,
  springSource,
} from '../springSource';

declare function require(name: string);

// chai really doesn't like being imported as an ES2015 module; will be fixed in v4
require('chai').use(
  require('sinon-chai')
);


describe('springSource',
  () => {
    let listener;

    beforeEach(
      () => {
        _springSystem.setLooper(new SimulationLooper());
        listener = stub();
      }
    );

    it('transitions from initialValue to destination');
    it('starts at rest');
    it('becomes active before dispatching new values');
    it('comes to rest upon completion');
  }
);

