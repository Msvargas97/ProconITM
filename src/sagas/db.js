import realm, { ACCOUNT_SCHEMA } from "../config/database";


export function* init() {
    const size = yield realm.objects(ACCOUNT_SCHEMA).length;
    if (size === 0) { //Crea la base de datos de cuenta si es necesario
        yield realm.write(() => {
            realm.create(ACCOUNT_SCHEMA, {});
        });
    }
    return yield realm.objectForPrimaryKey(ACCOUNT_SCHEMA, 0); //obtiene los datos del usuario 
}

export function* updateAccount(user) {
    yield realm.write(() => {
        realm.create(ACCOUNT_SCHEMA, { id: 0, ...user }, true);
    });
}

export function* updateAccountImage(image){
    yield realm.write(() => {
        realm.create(ACCOUNT_SCHEMA, { id: 0, image },true);
    }); 
}