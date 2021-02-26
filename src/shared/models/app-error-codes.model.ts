export enum AppErrorCode {
    // Unauthenticated code
    Unauthenticated = 401,
    // Access denied
    Forbidden = 403,
    // Internal server error
    InternalServerErr = 500,
    // Require field to be filled
    IsRequired = 400,
    // Invalid field type
    InvalidType = 422,
    // Invalid field length
    InvalidLength = 411,
    // Entity field value already exist
    ValueExists = 409,
    // Entity field can't be deleted 
    CannotDelete = 400,
    // Entity related isn't found
    EntityRelatedNotFound = 404
}