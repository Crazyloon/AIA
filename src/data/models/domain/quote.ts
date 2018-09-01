export class Quote {
  constructor() {}
  // constructor(user: number, fName: string, lName: string, dob: string,
  //             addr: string, city: string, state: string, zip: string){
  //               this.userId = user;
  //               this.firstName = fName;
  //               this.lastName = lName;
  //               this.dateOfBirth = dob;
  //               this.address = addr;
  //               this.city = city;
  //               this.state = state;
  //               this.zip = zip;
  // }

  quoteId: number;
  userId: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  ssn: string;
  price: number;
  dateQuoted: string;
  sold: boolean;
  dateSold: string;
  previousCarrier: string;
  pastClaims: boolean;
  pastClaimsDiscount: number;
  movingViolations: boolean;
  movingViolationsDiscount: number;
  newDriver: boolean;
  newDriverDiscount: number;
  multiCar: boolean;
  multiCarDiscount: number;
  previousCarrierLizard: boolean;
  previousCarrierLizardDiscount: number;
  previousCarrierPervasive: boolean;
  previousCarrierPervasiveDiscount: number;
}
