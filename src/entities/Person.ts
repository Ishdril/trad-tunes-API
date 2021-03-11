import { Cascade, Collection, Entity, ManyToMany, ManyToOne, Property } from '@mikro-orm/core';
import { Base, Origin, Tunebook, Tune } from '.';

@Entity()
export class Person extends Base<Person> {
  @Property({ nullable: true })
  first_name?: string;

  @Property()
  last_name: string;

  @ManyToOne('Origin', { cascade: [Cascade.PERSIST] })
  origin?: Origin;

  @Property({ nullable: true })
  date_birth?: Date;

  @Property({ nullable: true })
  date_death?: Date;

  @ManyToMany('Tune', 'authors', {
    cascade: [Cascade.PERSIST],
    owner: true,
  })
  author_tunes = new Collection<Tune>(this);

  @ManyToMany('Tunebook', 'authors', {
    cascade: [Cascade.PERSIST],
  })
  author_tunebooks = new Collection<Tunebook>(this);

  @ManyToMany('Tune', 'lyricists', {
    cascade: [Cascade.PERSIST],
    owner: true,
  })
  author_lyrics = new Collection<Tune>(this);
  // instruments

  constructor(last_name: string, options?: PersonOptions) {
    super();
    this.last_name = last_name;
    if (options) {
      this.first_name = options.first_name;
      this.origin = options.origin;
      this.date_birth = options.date_birth;
      this.date_death = options.date_death;
    }
  }
}

interface PersonOptions {
  first_name?: string;
  origin?: Origin;
  date_birth?: Date;
  date_death?: Date;
}
