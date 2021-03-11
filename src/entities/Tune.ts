import {
  Cascade,
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { Base, Abc_melody, Title, Tunebook, Type, Person, Origin } from '.';

@Entity()
export class Tune extends Base<Tune> {
  @ManyToOne('Title', {
    cascade: [Cascade.PERSIST],
    serializer: val => val.title,
    serializedName: 'title_main',
  })
  title_main: Title;

  @ManyToMany('Title', 'tunes_aliases', {
    cascade: [Cascade.PERSIST],
    owner: true,
  })
  aliases = new Collection<Title>(this);

  @ManyToOne('Type', {
    cascade: [Cascade.PERSIST],
    serializer: val => val.type,
    serializedName: 'type',
  })
  type: Type;

  @ManyToMany('Person', 'author_tunes', {
    cascade: [Cascade.PERSIST],
  })
  authors = new Collection<Person>(this);

  @ManyToMany('Origin', 'tunes', {
    cascade: [Cascade.PERSIST],
  })
  origins = new Collection<Origin>(this);

  @Property({ nullable: true })
  origin_notes?: string;

  @Property({ nullable: true })
  lyrics?: string;

  @OneToMany('Abc_melody', 'tune')
  melodies_ids = new Collection<Abc_melody>(this);

  @ManyToMany('Person', 'author_lyrics', {
    cascade: [Cascade.PERSIST],
  })
  lyricists = new Collection<Person>(this);

  @ManyToMany('Tunebook', 'tunes', {
    cascade: [Cascade.PERSIST],
  })
  collections = new Collection<Tunebook>(this);

  constructor(title: Title, type: Type, lyrics?: string, origin_notes?: string) {
    super();
    this.title_main = title;
    this.type = type;
    this.lyrics = lyrics;
    this.origin_notes = origin_notes;
  }
}
