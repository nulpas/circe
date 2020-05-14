import { ElementDefinitionComplex } from '@lunaeme/circe-core';

export interface NotificationsConfig {
  message?: string;
  type?: NotificationType;
  closeControl?: boolean;
  icon?: boolean | string;
  timeout?: number;
  reference?: ElementDefinitionComplex;
  updateReference?: boolean;
  position?: NotificationPosition;
  updatePosition?: boolean;
  margin?: number;
}
export type NotificationType = NotificationDefault | NotificationInfo | NotificationSuccess | NotificationWarning | NotificationCritical;
export type NotificationPosition =
  NotificationTopLeft | NotificationTopCenter | NotificationTopRight |
  NotificationCenterLeft | NotificationCenterCenter | NotificationCenterRight |
  NotificationBottomLeft | NotificationBottomCenter | NotificationBottomRight;
export type NotificationVertical = VerticalTop | VerticalCenter | VerticalBottom;
export type NotificationHorizontal = HorizontalLeft | HorizontalCenter | HorizontalRight;

// ###### TYPES CONSTANTS
const itemTypeInfo: ItemTypeDefinition = {
  type: 'info',
  defaultIcon: 'icon-info'
};
const itemTypeSuccess: ItemTypeDefinition = {
  type: 'success',
  defaultIcon: 'icon-circle-check'
};
const itemTypeWarning: ItemTypeDefinition = {
  type: 'warning',
  defaultIcon: 'icon-alert'
};
const itemTypeCritical: ItemTypeDefinition = {
  type: 'critical',
  defaultIcon: 'icon-shield'
};
export const notificationTypes: NotificationTypesDefinition = {
  default: itemTypeInfo,
  info: itemTypeInfo,
  success: itemTypeSuccess,
  warning: itemTypeWarning,
  critical: itemTypeCritical
};

export const notificationPositions: NotificationPositionDefinition = {
  topLeft: 'top left',
  topCenter: 'top center',
  topRight: 'top right',
  centerLeft: 'center left',
  centerCenter: 'center center',
  centerRight: 'center right',
  bottomLeft: 'bottom left',
  bottomCenter: 'bottom center',
  bottomRight: 'bottom right'
};

export const notificationVertical: NotificationVerticalDefinition = {
  top: 'top',
  center: 'center',
  bottom: 'bottom'
};
export const notificationHorizontal: NotificationHorizontalDefinition = {
  left: 'left',
  center: 'center',
  right: 'right'
};

// ###### PRIVATE TYPES AND CONSTANTS

type NotificationDefault = 'default';
type NotificationInfo = 'info';
type NotificationSuccess = 'success';
type NotificationWarning = 'warning';
type NotificationCritical = 'critical';

export interface NotificationTypesDefinition {
  default: ItemTypeDefinition;
  info: ItemTypeDefinition;
  success: ItemTypeDefinition;
  warning: ItemTypeDefinition;
  critical: ItemTypeDefinition;
}
export interface ItemTypeDefinition {
  type: NotificationType;
  defaultIcon: string;
}

type NotificationTopLeft = 'top left';
type NotificationTopCenter = 'top center';
type NotificationTopRight = 'top right';
type NotificationCenterLeft = 'center left';
type NotificationCenterCenter = 'center center';
type NotificationCenterRight = 'center right';
type NotificationBottomLeft = 'bottom left';
type NotificationBottomCenter = 'bottom center';
type NotificationBottomRight = 'bottom right';

export interface NotificationPositionDefinition {
  topLeft: NotificationTopLeft;
  topCenter: NotificationTopCenter;
  topRight: NotificationTopRight;
  centerLeft: NotificationCenterLeft;
  centerCenter: NotificationCenterCenter;
  centerRight: NotificationCenterRight;
  bottomLeft: NotificationBottomLeft;
  bottomCenter: NotificationBottomCenter;
  bottomRight: NotificationBottomRight;
}

type VerticalTop = 'top';
type VerticalCenter = 'center';
type VerticalBottom = 'bottom';
type HorizontalLeft = 'left';
type HorizontalCenter = 'center';
type HorizontalRight = 'right';

export interface NotificationVerticalDefinition {
  top: VerticalTop;
  center: VerticalCenter;
  bottom: VerticalBottom;
}
export interface NotificationHorizontalDefinition {
  left: HorizontalLeft;
  center: HorizontalCenter;
  right: HorizontalRight;
}
