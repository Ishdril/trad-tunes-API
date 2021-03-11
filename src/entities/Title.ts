import {
  Cascade,
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { Base, Tune } from '.';

@Entity()
export class Title extends Base<Title> {
  @Property()
  @Unique()
  title: string;

  @OneToMany('Tune', 'title_main', {
    cascade: [Cascade.PERSIST],
  })
  tunes = new Collection<Tune>(this);

  @ManyToMany('Tune', 'aliases', {
    cascade: [Cascade.PERSIST],
  })
  tunes_aliases = new Collection<Tune>(this);

  constructor(title: string) {
    super();
    this.title = title;
  }
}
