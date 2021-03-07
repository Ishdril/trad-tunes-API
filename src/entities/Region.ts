import { Collection, Entity, OneToMany, Property, Unique } from '@mikro-orm/core';
import { Base } from './BaseEntity';
import { Origin } from './Origin';

@Entity()
export class Region extends Base<Region> {
  @Property()
  @Unique()
  region: string;

  @OneToMany(() => Origin, o => o.region)
  origins = new Collection<Region>(this);

  constructor(region: string) {
    super();
    this.region = region;
  }
}
