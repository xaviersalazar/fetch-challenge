export type State = {
  name: string;
  abbreviation: string;
};

export type UserForm = {
  name: string;
  email: string;
  password: string;
  occupation: string;
  state: string;
}

export type Errors = {
  name: string | null;
  email: string | null;
  password: string | null;
  occupation: string | null;
  state: string | null;
}
