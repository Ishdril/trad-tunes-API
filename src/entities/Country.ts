import { Collection, Entity, OneToMany, Property, Unique } from '@mikro-orm/core';
import { Base } from './BaseEntity';
import { Origin } from '.';

@Entity()
export class Country extends Base<Country> {
  @Property()
  @Unique()
  country: string;

  @OneToMany(() => Origin, o => o.country)
  origins = new Collection<Origin>(this);

  constructor(country: string) {
    super();
    this.country = country;
  }
}
