import type { Request, Response } from 'express';

import type { Pet } from '../data/pets';
import { Pets } from '../data/pets';

type PetQueryParams = {
    species?: string;
    adopted?: 'true' | 'false';
    minAge?: string;
    maxAge?: string;
}

export const getPets = (
        req: Request< {}, unknown, {}, PetQueryParams >, 
        res: Response<Pet[]>
    ) : void => {
    const { species, adopted, minAge, maxAge } = req.query
    let filterPets: Pet[] = Pets;

    if(species){
        filterPets = filterPets.filter( (pet: Pet) : boolean => pet.species.toLowerCase() === species.toLowerCase() )
    }

    if(adopted){
        filterPets = filterPets.filter( (pet: Pet) : boolean => pet.adopted === JSON.parse(adopted) )
    }

    if(minAge){
        filterPets = filterPets.filter((pet: Pet): boolean => pet.age >= JSON.parse(minAge))
    }
    if(maxAge){
        filterPets = filterPets.filter((pet: Pet): boolean => pet.age <= JSON.parse(maxAge))
    }

    res.json(filterPets)
}

export const getPetsById = ( req: Request<{ id: string }>, res: Response<Pet | { message: string }> ) : void => {
    const { id } = req.params
    const pet: Pet | undefined = Pets.find( ( pet: Pet ) : boolean  => pet.id.toString() === id )
    if(!pet){
       res.status(404).json({ message: "Endpoint not found. "})
    }
    res.json(pet)
}