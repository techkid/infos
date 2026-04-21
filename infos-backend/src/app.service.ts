import { Injectable } from '@nestjs/common';

export interface InfoProvider {
  displayName: string;
  internalName: string;
  inUse: boolean;
}

export interface DeliveryMethod {
  displayName: string;
  internalName: string;
  inUse: boolean;
}

export interface Infos {
  infoProviders: InfoProvider[];
  deliveryMethods: DeliveryMethod[];
}

@Injectable()
export class AppService {
  getInfos(): Infos {
    return {
      infoProviders: [
        { displayName: 'financial market', internalName: 'financialmarket', inUse: false },
        { displayName: 'sale discounts', internalName: 'salediscounts', inUse: false },
        { displayName: 'weather updates', internalName: 'weather', inUse: false },
        { displayName: 'tech news', internalName: 'technews', inUse: false },
        { displayName: 'sports scores', internalName: 'sportsscores', inUse: false },
      ],
      deliveryMethods: [
        { displayName: 'email', internalName: 'email', inUse: false },
        { displayName: 'Slack Chat', internalName: 'slack', inUse: false },
        { displayName: 'SMS', internalName: 'sms', inUse: false },
      ],
    };
  }
}
