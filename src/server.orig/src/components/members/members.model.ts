export interface Member {
    member_id : number,
    flock_id : number,
    positions_id : number,
    privilege_level : number,
    username : string,
    name : string,
    middlename? : string,
    surname : string,
    phone : string,
    address : string,
    is_registered : boolean,
    registration_date : string
}