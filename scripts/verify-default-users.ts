import { DEFAULT_USERS, findDefaultUser } from "../client/src/data/defaultUsers";

const first = findDefaultUser("1000000000", "101234");
const last = findDefaultUser("1000000099", "101333");
const invalid = findDefaultUser("1000000000", "000000");

if (DEFAULT_USERS.length !== 100) throw new Error(`Nombre de comptes inattendu: ${DEFAULT_USERS.length}`);
if (!first || first.id !== "user_000" || first.nom !== "Dupont" || first.prenom !== "Jean") {
  throw new Error("Le compte de démonstration principal est incorrect");
}
if (!last || last.id !== "user_099") throw new Error("Le dernier compte par défaut est absent");
if (invalid) throw new Error("Un identifiant invalide a été accepté");

console.log(`OK: ${DEFAULT_USERS.length} comptes, premier=${first.id}, dernier=${last.id}`);
