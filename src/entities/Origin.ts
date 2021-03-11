import { Cascade, Collection, Entity, ManyToMany, ManyToOne, OneToMany } from '@mikro-orm/core';
import { Base, Country, Region, Town, Person, Tune } from '.';

@Entity()
export class Origin extends Base<Origin> {
  @ManyToOne(() => Country, {
    cascade: [Cascade.PERSIST],
    serializer: val => val.country,
    serializedName: 'country',
  })
  country;

  @ManyToOne(() => Region, {
    cascade: [Cascade.PERSIST],
    serializer: val => val.region,
    serializedName: 'region',
  })
  region?: Region;

  @ManyToOne(() => Town, {
    cascade: [Cascade.PERSIST],
    serializer: val => val.town,
    serializedName: 'town',
  })
  town?: Town;

  @OneToMany('Person', 'origin')
  people = new Collection<Person>(this);

  @ManyToMany('Tune', 'origins', {
    cascade: [Cascade.PERSIST],
    owner: true,
  })
  tunes = new Collection<Tune>(this);

  constructor(country: Country) {
    super();
    this.country = country;
  }
}
