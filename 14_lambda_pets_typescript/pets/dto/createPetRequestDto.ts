export class CreatePetRequestDto {
  petName: string;
  petBreed: string;
  sex: string;
  dob: Date;
  registered: Date;

  constructor(petName: string, petBreed: string, sex: string, dob: Date, registered: Date) {
    this.petName = petName;
    this.petBreed = petBreed;
    this.sex = sex;
    this.dob = dob;
    this.registered = registered;
  }
}