import { Tune, Abc_melody } from '../entities';
import { Request, Response } from 'express';
import { orm } from '../index';

export const getOrigins = async (_: Request, res: Response) => {
  try {
    const origins = await orm.em.find(Tune, {}, [
      'aliases',
      'type',
      'origins',
      'lyricists',
      'authors',
      'melodies_ids',
    ]);
    orm.em.populate(origins, 'authors.origin');
    res.status(200).send(origins);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const postOrigin = async (req: Request, res: Response) => {
  try {
    const tune = await orm.em.findOne(Tune, req.body.tune);
    if (tune) {
      const melody = new Abc_melody(req.body.melody, req.body.key, tune);
      await orm.em.persistAndFlush(melody);
      console.log(melody);
      res.status(201).send(tune);
    } else res.sendStatus(500);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

// export const postOrigin = async (req: Request, res: Response) => {
//   if (!req.body.country) {
//     res.status(400).json({ message: 'missing required country name' });
//   }
//   try {
//     // check if the country already exists
//     let country = await orm.em.findOne(Country, { country: req.body.country });

//     // check if the region already exists
//     let region: Region | null;
//     region = await orm.em.findOne(Region, { region: req.body.region });

//     // check if the town already exists
//     let town: Town | null;
//     town = await orm.em.findOne(Town, { town: req.body.town });

//     // create new origin if non existant
//     if (!country) country = new Country(req.body.country);
//     if (!region && req.body.region) region = new Region(req.body.region);
//     else {
//       if (!region) region = await orm.em.findOne(Region, { region: 'unknown' });
//       // default to a new "unknown" region if the region doesn't exist in DB
//       if (!region) region = new Region('unknown');
//     }
//     if (!town && req.body.town) town = new Town(req.body.town);
//     else {
//       if (!town) town = await orm.em.findOne(Town, { town: 'unknown' });
//       // default to a new "unknown" town if the region doesn't exist in DB
//       if (!town) town = new Town('unknown');
//     }

//     // check if the origin already exists
//     let origin = await orm.em.findOne(Origin, {
//       country: country.id,
//       region: region.id,
//       town: town.id,
//     });
//     if (origin) {
//       res.status(200).send(origin);
//     } else {
//       origin = new Origin(country);
//       origin.region = region;
//       origin.town = town;
//       orm.em.persist([origin, country, region, town]);
//       await orm.em.flush();
//       res.status(201).send(origin);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(error);
//   }
// };
