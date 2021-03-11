import { Cascade, Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { Base, Person, Tune } from '.';

@Entity()
export class Tunebook extends Base<Tunebook> {
  @Property()
  title: string;

  @Property()
  publisher: string;

  @Property()
  year: number;

  @ManyToMany('Person', 'author_tunebooks', {
    cascade: [Cascade.PERSIST],
    owner: true,
  })
  authors = new Collection<Person>(this);

  @ManyToMany('Tune', 'collections', {
    cascade: [Cascade.PERSIST],
    owner: true,
  })
  tunes = new Collection<Tune>(this);

  constructor(title: string, publisher: string, year: number) {
    super();
    this.title = title;
    this.publisher = publisher;
    this.year = year;
  }
}
