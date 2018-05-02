import Realm from "realm";

export const ACCOUNT_SCHEMA = "Account";

export const AccountSchema = {
    name: ACCOUNT_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: { type: 'int', default: 0 },
        name: { type: 'string', default: '' },
        last_name: { type: 'string', default: '' },
        email: { type: 'string', default: '' },
        id_number: { type: 'string', default: '' },
        cellphone_number: { type: 'string', default: '' },
        user_type: { type: 'string', default: '' },
        api_key: { type: 'string', default: '' },
        company : { type : 'string', default : '' },
        image : { type : 'string', default : ''},
        status: { type: 'int', default: 0 },
        created_at: { type: 'string', default: '' },
        version: { type: 'int', default: 1 },
        login: { type: 'bool', default: false },
    }
}

export const databaseOptions = {
    path: 'procontroles.realm',
    schema: [AccountSchema],
    schemaVersion: 0, //optional
}

export const logout = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(ACCOUNT_SCHEMA, { login: false }, true);
        });
    });
    resolve()
});

export default new Realm(databaseOptions);