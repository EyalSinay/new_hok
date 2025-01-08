export type pasukTorahType = {
    mikra: string;
    targum: string;
    sefer: string;
    perek: number;
    pasuk: number;
    parasha: string;
};

export type pasukNachType = Omit<pasukTorahType, "parasha">;
