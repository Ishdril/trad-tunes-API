import { Cascade, Entity, ManyToOne } from '@mikro-orm/core';
import { Base } from './BaseEntity';
import { Country } from './Country';
import { Region } from './Region';
import { Town } from './Town';

@Entity()
export class Origin extends Base<Origin> {
  @ManyToOne(() => Country, { cascade: [Cascade.PERSIST] })
  country;

  @ManyToOne(() => Region, { cascade: [Cascade.PERSIST] })
  region?: Region;

  @ManyToOne(() => Town, { cascade: [Cascade.PERSIST] })
  town?: Town;

  constructor(country: Country) {
    super();
    this.country = country;
  }
}
