export class Pet {
  petId: string;
  petName: string;
  petBreed: string;
  sex: string;
  dob: string;
  registered: string; // zmienic na number
  createdAt: string; // zmienic na number
  updatedAt: string; // zmienic na number

  constructor(petId: string, petName: string, petBreed: string, sex: string, dob: string, registered: string, createdAt:string, updatedAt:string) {
    this.petId = petId;
    this.petName = petName;
    this.petBreed = petBreed;
    this.sex = sex;
    this.dob = dob;
    this.registered = registered;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}