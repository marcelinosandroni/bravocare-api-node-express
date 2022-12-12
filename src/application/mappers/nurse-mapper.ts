import { NursePersistenceDto } from "@application/dtos/nurse-persistence-dto";
import { NurseViewDto } from "@application/dtos/nurse-view-dto";
import { Mapper } from "@application/mapper";
import { Nurse } from "@domain/nurse";

export class NurseMapper implements Mapper<Nurse, NurseViewDto> {
  toViewModel(domain: Nurse): NurseViewDto {
    return Nurse.create(
      {
        name: domain.name,
        type: domain.type,
      },
      domain.id
    );
  }

  toPersistence(domain: Nurse): NursePersistenceDto {
    return new NursePersistenceDto(domain.id, domain.name, domain.type);
  }

  fromPersistence(persistence: NursePersistenceDto): Nurse {
    return Nurse.create(
      {
        name: persistence.nurse_name,
        type: persistence.nurse_type,
      },
      persistence.nurse_id
    );
  }

  fromViewModel(view: NurseViewDto): Nurse {
    return Nurse.create(
      {
        name: view.name,
        type: view.type,
      },
      view.id
    );
  }

  fromPersistenceToViewModel(persistence: NursePersistenceDto): NurseViewDto {
    return new NurseViewDto(
      persistence.nurse_id,
      persistence.nurse_name,
      persistence.nurse_type
    );
  }
}
