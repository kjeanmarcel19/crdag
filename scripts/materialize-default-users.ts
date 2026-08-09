import { writeFileSync } from "node:fs";
import { DEFAULT_USERS } from "../client/src/data/defaultUsers";

const typeDefinitions = `export type Account = {
  id: string;
  type: string;
  number: string;
  balance: number;
  icon: string;
};

export type Transaction = {
  id: number;
  type: string;
  reference: string;
  date: string;
  amount: number;
  status: string;
  category: string;
};

export type DefaultUser = {
  id: string;
  identifiant: string;
  codepersonnel: string;
  nom: string;
  prenom: string;
  location: string;
  manager: string;
  status: string;
  lastConnection: string;
  accounts: Account[];
  transactions: Transaction[];
  card: {
    number: string;
    holder: string;
    expiry: string;
    isBlocked: boolean;
    foreignPayments: boolean;
    limit: number;
    withdrawalLimit: number;
  };
  rib: {
    bankName: string;
    bankCode: string;
    branchCode: string;
    accountNumber: string;
    key: string;
    iban: string;
    swift: string;
  };
};
`;

const file = `${typeDefinitions}
export const DEFAULT_USERS: DefaultUser[] = ${JSON.stringify(DEFAULT_USERS, null, 2)};

export const findDefaultUser = (identifiant: string, codepersonnel: string) =>
  DEFAULT_USERS.find(
    (user) => user.identifiant === identifiant && user.codepersonnel === codepersonnel,
  );

export const AUTH_SESSION_KEY = "credit-agricole-authenticated";
export const AUTH_USER_KEY = "credit-agricole-current-user";
export const DEFAULT_USER_COUNT = DEFAULT_USERS.length;

export default DEFAULT_USERS;
`;

writeFileSync("client/src/data/defaultUsers.ts", file, "utf8");
console.log(`Base matérialisée : ${DEFAULT_USERS.length} comptes explicites.`);
