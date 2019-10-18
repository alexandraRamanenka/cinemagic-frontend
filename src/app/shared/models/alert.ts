import { AlertTypes } from '../enums/alertTypes';

export interface Alert {
  type: AlertTypes;
  message: string;
}
