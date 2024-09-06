import * as brcypt from "bcrypt";

const saltRound = 10;

export const hashingPassword = (password: string): string => {
    const salt = brcypt.genSaltSync(saltRound);
    return brcypt.hashSync(password, salt);
};



