export enum UsersRoleEnum {
    "USER" = "user",
    "ADMIN" = "admin"
}
export const UsersRoleEnumValues = Object.values(UsersRoleEnum);

export enum ReservationStatusEnum {
    "CONFIRMED" = 'confirmed',
    "PENDING" = 'pending',
    "CANCELLED" = 'cancelled'
}
export const ReservationStatusValues = Object.values(ReservationStatusEnum);

export enum LinkedEntityTypeEnum {
    "VOUCHER_IMAGE" = 'voucherImage',
}
export const LinkedEntityTypeValues = Object.values(LinkedEntityTypeEnum);