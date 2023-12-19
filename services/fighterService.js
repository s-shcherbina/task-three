import { fighterRepository } from '../repositories/fighterRepository.js';

class FighterService {
  search(search) {
    const item = fighterRepository.getOne(search);
    if (!item) {
      return null;
    }
    return item;
  }

  checkFighter(message, name) {
    const fighters = fighterRepository.getAll();
    if (!fighters) return;
    fighters.forEach((fighter) => {
      if (fighter.name.toLowerCase() === name.toLowerCase()) {
        throw Error(`${message} (${name}) isn’t valid`);
      }
    });
  }

  getFighter(id) {
    const fighter = this.search({ id });
    if (!fighter) {
      throw Error('Fighter not found');
    }
    return fighter;
  }

  getAllFighters() {
    const fighters = fighterRepository.getAll();
    if (!fighters.length) {
      throw Error('Fighters not found');
    }
    return fighters;
  }

  createFighter(fighterData) {
    this.checkFighter('Fighter entity to create', fighterData.name);
    if (!fighterData.hasOwnProperty('health')) fighterData.health = 100;
    const fighter = fighterRepository.create(fighterData);
    return fighter;
  }

  updateFighter(id, dataToUpdate) {
    const existFighter = this.search({ id });
    if (!existFighter) {
      throw Error('Fighter not found');
    }
    if (dataToUpdate.name)
      this.checkFighter('Data to update', dataToUpdate.name);
    const fighter = fighterRepository.update(id, dataToUpdate);
    return fighter;
  }

  delete(id) {
    const existFighter = this.search({ id });
    if (!existFighter) {
      throw Error('Fighter not found');
    }
    const fighter = fighterRepository.delete(id);
    return fighter;
  }
}

const fighterService = new FighterService();

export { fighterService };
