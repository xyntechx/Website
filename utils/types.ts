export interface IProject {
    name: string;
    desc: string;
    url: string;
}

export interface IExperience {
    position: string;
    org: string;
    startDate: string; // <Mmm> <YYYY>
    endDate: string; // <Mmm> <YYYY> OR "Present"
    responsibilities: string[];
}
