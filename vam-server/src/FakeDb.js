export const PatientsDb = [

    {
        id: '2-25',
        firstName: "David",
        lastName: "Carter",
        ssn:"000-00-0113",
        dob:new Date(1981, 3, 2),
        gender:"Male"
    },

    {

        id: '2-17',
        firstName: "Ronald",
        lastName: "McDonald",
        ssn:"655-44-7777",
        dob:new Date(1933, 4, 1),
        gender:"Male"

    }

];


export const AllergiesDb = [
    {
        fileName: 'VA Allergies File',
        reactants: [{id: "120_82-3", label: "CHOCOLATE", sameAs: "vuid:4636681", type: "DRUG, FOOD"}]
    },
    {
        fileName: 'National Drug File - Generic Drug Name',
        reactants: [{id: "50_6-16", label: "PENICILLIN", sameAs: "vuid:4019880", type: "DRUG"}]
    },
    {
        fileName: 'National Drug File - Trade Name',
        reactants: [ {id: "50_6-16", label: "PENICILLIN", sameAs: "vuid:4019880", type: "DRUG"}]
    },
    {
        fileName: 'Drug Ingredients File',
    },
    {
        fileName: 'VA Drug Class File',
    }

];


export const SignSymptoms = [
    {id: "120_83-15", label: "CONFUSION", sameAs: "vuid:4538568"},
    {id:"120_83-1", label: "HIVES", sameAs: "vuid:4538560"},
    {id: "120_83-2", label: "ITCHING,WATERING EYES", sameAs: "vuid:4538561"}
];