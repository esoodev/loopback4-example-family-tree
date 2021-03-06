// Copyright IBM Corp. 2018. All Rights Reserved.
// Node module: family-tree
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Filter, repository, Where} from '@loopback/repository';

import {
  post,
  param,
  get,
  patch,
  del,
  requestBody
} from '@loopback/rest';
import {Person} from '../models';
import {PersonRepository} from '../repositories';

export class PersonController {
  constructor(
    @repository(PersonRepository)
    public personRepository : PersonRepository,
  ) {}

  @post('/people', {
    responses: {
      '200': {
        description: 'Person model instance',
        content: {'application/json': {'x-ts-type': Person}},
      },
    },
  })
  async create(@requestBody() person: Person)
    : Promise<Person> {
    return await this.personRepository.create(person);
  }

  @get('/people/count', {
    responses: {
      '200': {
        description: 'Person model count',
        content: {'application/json': {'x-ts-type': Number}},
      },
    },
  })
  async count(@param.query.string('where') where?: Where): Promise<number> {
    return await this.personRepository.count(where);
  }

  @get('/people', {
    responses: {
      '200': {
        description: 'Array of Person model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Person}},
          },
        },
      },
    },
  })
  async find(@param.query.string('filter') filter?: Filter)
    : Promise<Person[]> {
    return await this.personRepository.find(filter);
  }

  @patch('/people', {
    responses: {
      '200': {
        description: 'Person PATCH success count',
        content: {'application/json': {'x-ts-type': Number}},
      },
    },
  })
  async updateAll(
    @requestBody() person: Person,
    @param.query.string('where') where?: Where
  ): Promise<number> {
    return await this.personRepository.updateAll(person, where);
  }

  @get('/people/{id}', {
    responses: {
      '200': {
        description: 'Person model instance',
        content: {'application/json': {'x-ts-type': Person}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Person> {
    return await this.personRepository.findById(id);
  }

  @patch('/people/{id}', {
    responses: {
      '204': {
        description: 'Person PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() person: Person
  ): Promise<void> {
    await this.personRepository.updateById(id, person);
  }

  @del('/people/{id}', {
    responses: {
      '204': {
        description: 'Person DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.personRepository.deleteById(id);
  }
}
