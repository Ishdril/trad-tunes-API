import { Collection, Entity, OneToMany, Property, Unique } from '@mikro-orm/core';
import { Base } from './BaseEntity';
import { Origin } from './Origin';

@Entity()
export class Town extends Base<Town> {
  @Property()
  @Unique()
  town: string;

  @OneToMany(() => Origin, o => o.town)
  origins = new Collection<Origin>(this);

  constructor(town: string) {
    super();
    this.town = town;
  }
}
