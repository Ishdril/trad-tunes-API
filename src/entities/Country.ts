import { Entity, Property, Unique } from '@mikro-orm/core';
import { Base } from './BaseEntity';

@Entity()
export class Country extends Base<Country> {
  @Property()
  @Unique()
  country: string;

  constructor(country: string) {
    super();
    this.country = country;
  }
}
