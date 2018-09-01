import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const quotes = [
        {
        quoteId: 1,
        userId: 158010,
        firstName: 'Russell',
        lastName: 'Dow',
        dateOfBirth: '08/15/1988',
        email: 'russell.j.dow@avanade.com',
        phone: '2063066808',
        address: '24245 183rd ave se',
        city: 'Covington',
        state: 'WA',
        zip: '98042',
        ssn: '333224444',
        price: 1298.70,
        dateQuoted: '08/31/2018',
        sold: false,
        dateSold: null,
        previousCarrier: 'Lizard',
        pastClaims: false,
        pastClaimsDiscount: null,
        movingViolations: false,
        movingViolationsDiscount: null,
        newDriver: false,
        newDriverDiscount: null,
        multiCar: false,
        multiCarDiscount: null,
        previousCarrierLizard: true,
        previousCarrierLizardDiscount: -0.05,
        previousCarrierPervasive: false,
        previousCarrierPervasiveDiscount: null,
      },
    ];

    return {quotes};
  }
}
