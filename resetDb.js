import {
  clearDatabase,
  createUser,
  createCategory,
  createSubCategory,
  createProvider,
  createPlace,
  createProduct,
  createRequest,
  createOrder
} from "./services/db"

import {
  User,
  Category,
  SubCategory,
  Place,
  Provider,
  Product,
  Request,
  Order,
  OrderRow
} from "./models"



let users = [
  new User({
    "number": "1",
    "username": "evignal",
    "title": "M",
    "role": "responsable",
    "email": "emmanuel.vignal@umontpellier.fr",
    "password": "azertyuiop"
  }),
  new User({
    "number": "2",
    "username": "gcharriere",
    "title": "M",
    "role": "responsable",
    "email": "guillaume.charriere@umontpellier.fr",
    "password": "azertyuiop"
  }),
  new User({
    "number": "3",
    "username": "ecalviac",
    "title": "MME",
    "role": "secretaire",
    "email": "elodie.calviac@umontpellier.fr",
    "password": "azertyuiop"
  }),
  new User({
    "number": "4",
    "username": "vtillou",
    "title": "MME",
    "role": "secretaire",
    "email": "valea.tilllou@umontpellier.fr",
    "password": "azertyuiop"
  }),
  new User({
    "number": "5",
    "username": "couldahmed",
    "title": "MME",
    "role": "responsable",
    "email": "charahzed.ould-ahmed@umontpellier.fr",
    "password": "azertyuiop"
  }),
  new User({
    "number": "6",
    "username": "scourrech",
    "title": "MME",
    "role": "technicien",
    "email": "severine.courrech@umontpellier.fr",
    "password": "azertyuiop"
  }),
  new User({
    "number": "7",
    "username": "araymond",
    "title": "M",
    "role": "technicien",
    "email": "alexandre.raymond@umontpellier.fr",
    "password": "azertyuiop"
  }),
  new User({
    "number": "8",
    "username": "bjiout",
    "title": "MME",
    "role": "technicien",
    "email": "beatrice.jiout@umontpellier.fr",
    "password": "azertyuiop"
  }),
    new User({
    "number": "9",
    "username": "jgalliard",
    "title": "MME",
    "role": "technicien",
    "email": "julie.galliard@umontpellier.fr",
    "password": "azertyuiop"
  }),
  new User({
    "number": "10",
    "username": "glledo",
    "title": "MME",
    "role": "technicien",
    "email": "gwnedaline.lledo@umontpellier.fr",
    "password": "azertyuiop"
  })
]
console.log(users);
let categories = [
    new Category({
      number: "1",
      name: "Chimie",
      managedBy: users[0],
    }),
    new Category({
      number: "2",
      name: "Physique",
      managedBy: users[0],
    }),
    new Category({
      number: "3",
      name: "Biologie",
      managedBy: users[0],
    }),
    new Category({
      number: "4",
      name: "Microbiologie",
      managedBy: users[0],
    }),
    new Category({
      number: "5",
      name: "Immunologie",
      managedBy: users[0],
    }),
    new Category({
      number: "6",
      name: "Hématologie",
      managedBy: users[0],
    }),
    new Category({
      number: "7",
      name: "Pharmacologie",
      managedBy: users[0],
    }),
    new Category({
      number: "8",
      name: "Toxicologie",
      managedBy: users[0],
    }),
    new Category({
      number: "9",
      name: "Chimie Alimentaire",
      managedBy: users[0],
    }),
    new Category({
      number: "10",
      name: "Physiologie",
      managedBy: users[0],
    }),
    new Category({
      number: "11",
      name: "Biologie Moléculaire",
      managedBy: users[0],
    }),
    new Category({
      number: "12",
      name: "Biologie Cellulaire",
      managedBy: users[0],
    }),
    new Category({
      number: "13",
      name: "Histologie",
      managedBy: users[0],
    }),
    new Category({
      number: "14",
      name: "Mycologie",
      managedBy: users[0],
    }),
    new Category({
      number: "15",
      name: "Autre",
      managedBy: users[0],
    })
]

let subCategories = [
new SubCategory({
  number: "1",
  name: "Sel",
  category: categories[0]
}),
new SubCategory({
  number: "2",
  name: "Acide",
  category: categories[0]
}),
new SubCategory({
  number: "3",
  name: "Base",
  category: categories[0]
}),
new SubCategory({
  number: "4",
  name: "Solvant",
  category: categories[0]
}),
new SubCategory({
  number: "5",
  name: "Alcool",
  category: categories[0]
}),
new SubCategory({
  number: "6",
  name: "Enzyme de restriction",
  category: categories[0]
}),
new SubCategory({
  number: "7",
  name: "Enzyme",
  category: categories[0]
}),
new SubCategory({
  number: "8",
  name: "Consommable Plastique",
  category: categories[0]
}),
new SubCategory({
  number: "9",
  name: "Consommable",
  category: categories[0]
}),
new SubCategory({
  number: "10",
  name: "Gaz",
  category: categories[0]
}),
new SubCategory({
  number: "11",
  name: "Tampon",
  category: categories[0]
}),
new SubCategory({
  number: "12",
  name: "Milieu de culture",
  category: categories[0]
}),
new SubCategory({
  number: "13",
  name: "Facteur de croissance",
  category: categories[0]
}),
new SubCategory({
  number: "14",
  name: "Autre",
  category: categories[0]
}),
]
let providers = [
  new Provider({
    "number": "1",
    "name": "ABCYS",
    "adress": "5 Rue Pierre Chausson",
    "postCode": "75010",
    "city": "PARIS",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "2",
    "name": "ACDGB",
    "adress": "",
    "postCode": "",
    "city": "",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "3",
    "name": "ADVILAB",
    "adress": "448 Avenue Ste Euphémie 2 les Genêts",
    "postCode": "13190",
    "city": "ALLAUCH",
    "phoneNumber": String("06 48 77 99 48"),
    "fax": String("09 72 36 78 70"),
    "email": ""
  }),
  new Provider({
    "number": "4",
    "name": "AES Chemunex",
    "adress": "Rue M.Bastié-Ker Lann CS 17219",
    "postCode": "35172",
    "city": "BRUZ CEDEX",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "5",
    "name": "AIR LIQUIDE",
    "adress": "75 Quai d'Orsay",
    "postCode": "75321",
    "city": "PARIS CEDEX 07",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "6",
    "name": "AIR PRODUCT Lot N° 3",
    "adress": "9 Route de Seysses",
    "postCode": "31100",
    "city": "TOULOUSE",
    "phoneNumber": String("01 44 92 51 00"),
    "fax": String("01 44 92 51 01"),
    "email": ""
  }),
  new Provider({
    "number": "7",
    "name": "AIR PRODUCT Lot N° 4",
    "adress": "9 Route de Seysses",
    "postCode": "31100",
    "city": "TOULOUSE",
    "phoneNumber": String("01 44 92 51 00"),
    "fax": String("01 44 92 51 01"),
    "email": ""
  }),
  new Provider({
    "number": "8",
    "name": "ALLENTOWN France",
    "adress": "174 Boulevard de Créteil",
    "postCode": "94100",
    "city": "Saint Maur des fossés",
    "phoneNumber": String("01 48 83 57 25"),
    "fax": String("01 48 83 55 15"),
    "email": ""
  }),
  new Provider({
    "number": "9",
    "name": "AMI",
    "adress": "440 Rue Yves Chauvin node park Touraine",
    "postCode": "37310",
    "city": "TAUXIGNY",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "10",
    "name": "APAVE Sud Europe",
    "adress": "ZI  Avenue Gay Lussac BP 3",
    "postCode": "33370",
    "city": "ARTIGUES PRES BORDEAUX",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "11",
    "name": "APPLIED BIOSYSTEMS APPLERA France",
    "adress": "25 Rue de Courtaboeuf BP 96",
    "postCode": "91943",
    "city": "COURTABOEUF CEDEX",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "12",
    "name": "ARC EN CIEL",
    "adress": "",
    "postCode": "",
    "city": "",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "13",
    "name": "ATELIER 3",
    "adress": "358 rue de la Combe Caude",
    "postCode": "34090",
    "city": "MONTPELLIER",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "14",
    "name": "AUTOCAR BANCAREL",
    "adress": "344 Avenue des Baronnes",
    "postCode": "34730",
    "city": "Prade le Lez",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "15",
    "name": "AVLD",
    "adress": "",
    "postCode": "",
    "city": "",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "16",
    "name": "BAECKEROOT LABO",
    "adress": "33 Rue Jean Raymond Guyon ZI des quatre pavillons",
    "postCode": "33310",
    "city": "LORMONT",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "17",
    "name": "BALCO",
    "adress": "5 rue des Arbousiers ZAE des Avants",
    "postCode": "34270",
    "city": "ST MATHIEU DE TREVIERS",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "18",
    "name": "BECHTLE DIRECT",
    "adress": "30 rue des vergers",
    "postCode": "67121",
    "city": "Molsheim",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "19",
    "name": "BENAFIGOS",
    "adress": "30 Avenue des Cévennes",
    "postCode": "34570",
    "city": "ST PAUL ET VALMALLE",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "20",
    "name": "BERGER LEVRAULT",
    "adress": "5 Rue André Ampère BP 79",
    "postCode": "54250",
    "city": "CHAMPIGNEULLES",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "21",
    "name": "BIO-RAD",
    "adress": "3 Boulevard Raymond Poincare",
    "postCode": "92430",
    "city": "MARNES LA COQUETTE",
    "phoneNumber": String("01 47 95 60 00"),
    "fax": String("01 47 41 91 33"),
    "email": ""
  }),
  new Provider({
    "number": "22",
    "name": "BIOCADE",
    "adress": "",
    "postCode": "",
    "city": "",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "23",
    "name": "BIOCOOP",
    "adress": "l'aile de papillon 10 Rte de Nimes",
    "postCode": "34920",
    "city": "Le CRES",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "24",
    "name": "BIOKAR DIAGNOSTICS",
    "adress": "Rue des quarante Mines ZAC de Ther-Allone BP10245",
    "postCode": "60002",
    "city": "BEAUVAIX CEDEX",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "25",
    "name": "BIOMERIEUX",
    "adress": "5 Rue des Acqueducs",
    "postCode": "69290",
    "city": "CRAPONNE",
    "phoneNumber": String("0 820 114 912"),
    "fax": String("0 820 114 902"),
    "email": "commandes.industrie@biomerieux.com"
  }),
  new Provider({
    "number": "26",
    "name": "BIOSCIENCE INNOVATION INTERCHIM",
    "adress": "221 bis Avenue JF Kennedy BP1140",
    "postCode": "3103",
    "city": "MONTLUCON CEDEX",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "27",
    "name": "BIOTEST",
    "adress": "375 Rue Morane Saulnier ZI Centre BP 405",
    "postCode": "78534",
    "city": "BUC CEDEX",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "28",
    "name": "BOIS D'OC",
    "adress": "Rue Montels l'eglise",
    "postCode": "34970",
    "city": "LATTES",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "29",
    "name": "BOTANIC",
    "adress": "chem Fesquet",
    "postCode": "34830",
    "city": "CLAPIERS",
    "phoneNumber": String("04 99 62 22 50"),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "30",
    "name": "BRICO DEPOT",
    "adress": "Cemin du grand rondelet",
    "postCode": "34970",
    "city": "LATTES",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "31",
    "name": "BÜHLER HAGUENAU",
    "adress": "33 Rue des Aviateurs BP 20143",
    "postCode": "67503",
    "city": "HAGUENAU",
    "phoneNumber": String("03 88 05 42 42"),
    "fax": String("03 88 93 57 50"),
    "email": ""
  }),
  new Provider({
    "number": "32",
    "name": "BURO SYSTEMES",
    "adress": "990 avenue des platanes Boirargues",
    "postCode": "34970",
    "city": "LATTES",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "33",
    "name": "CASINO France",
    "adress": "12 Esplanade de France BP306",
    "postCode": "42008",
    "city": "St ETIENNE CEDEX 2",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "34",
    "name": "CASTORAMA St CLEMENT DE RIVIERE",
    "adress": "Route de Ganges",
    "postCode": "34980",
    "city": "St CLEMENT DE RIVIERE",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "35",
    "name": "CENPAC",
    "adress": "",
    "postCode": "",
    "city": "",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "36",
    "name": "CHARLES RIVER",
    "adress": "BP0109",
    "postCode": "69592",
    "city": "L'ARBRESLE CEDEX",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "37",
    "name": "CHR HANSEN",
    "adress": "Route d'Aulnay St Germain lés Arpajon BP 64",
    "postCode": "91292",
    "city": "ARPAJON CEDEX",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "38",
    "name": "CML",
    "adress": "11 rue des palis BP 30",
    "postCode": "77792",
    "city": "NEMOURS CEDEX",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "39",
    "name": "COFEMO",
    "adress": "",
    "postCode": "",
    "city": "",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "40",
    "name": "DARTY",
    "adress": "",
    "postCode": "",
    "city": "",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "41",
    "name": "DELL SA",
    "adress": "33 Rond point Binjamin Franklin",
    "postCode": "34938",
    "city": "MONTPELLIER CEDEX 5",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "42",
    "name": "DIAMED",
    "adress": "",
    "postCode": "60230",
    "city": "CHAMBLY",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "43",
    "name": "DIDA CONCEPT",
    "adress": "50 Rue de METZ",
    "postCode": "54580",
    "city": "AUBOUE",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "44",
    "name": "DUTSCHER DOMINIQUE",
    "adress": "30 Rue de l'industrie",
    "postCode": "67172",
    "city": "BRUMATH",
    "phoneNumber": String("04 67 42 26 56"),
    "fax": String("03 88 59 33 99"),
    "email": "order@dutscher.com"
  }),
  new Provider({
    "number": "45",
    "name": "ECIMED",
    "adress": "",
    "postCode": "",
    "city": "",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "46",
    "name": "EFS PYRENEES MEDITERANEE",
    "adress": "Avenue de Grande BretagneBP 3210",
    "postCode": "31027",
    "city": "TOULOUSE Cedex 3",
    "phoneNumber": String("05 61 31 20 55"),
    "fax": String("05 61 31 20 25"),
    "email": ""
  }),
  new Provider({
    "number": "47",
    "name": "ELITECH",
    "adress": "12-12 bis Rue Jean Jaures",
    "postCode": "92800",
    "city": "PUTEAUX SIGNE",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "48",
    "name": "ESCASSUT",
    "adress": "25 Rue des Etuves",
    "postCode": "34000",
    "city": "MONTPELLIER",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "49",
    "name": "ESPACE NATURE SARL",
    "adress": "Pôle d'activité St Julie",
    "postCode": "34980",
    "city": "MONTFERRIER SUR LEZ",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "50",
    "name": "EUROBIO Laboratoires",
    "adress": "7 Avenue de Scandinavie",
    "postCode": "91953",
    "city": "LES ULIS  CEDEX B",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "51",
    "name": "FISHER BIOBLOCK SCIENTIFIC",
    "adress": "Bd Sebastien Brant Parc Innovation BP 50111",
    "postCode": "67403",
    "city": "ILLIKIRCH CEDEX",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "52",
    "name": "FORM'PLAST",
    "adress": "17 Chemin de derière ville",
    "postCode": "25330",
    "city": "CHANTRANS",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "53",
    "name": "France EAU",
    "adress": "",
    "postCode": "",
    "city": "",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "54",
    "name": "France Système Econocom",
    "adress": "40 rue Bignon Immeuble Oméga,",
    "postCode": "35135",
    "city": "Chantepie",
    "phoneNumber": String("02 99 85 48 76"),
    "fax": String(299868510),
    "email": "frederic.piguel@econocom.com"
  }),
  new Provider({
    "number": "55",
    "name": "FROID CUISINE HERAULT",
    "adress": "",
    "postCode": "",
    "city": "",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "56",
    "name": "FROID D'OC",
    "adress": "11 Rue Garrigues",
    "postCode": "34130",
    "city": "MUDAISON",
    "phoneNumber": String("04 67 29 37 27"),
    "fax": String("04 67 29 23 50"),
    "email": ""
  }),
  new Provider({
    "number": "57",
    "name": "FUMOUZE",
    "adress": "110-114 Rue Victor Hugo",
    "postCode": "92689",
    "city": "LEVALLOIS PERRET CEDEX",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "58",
    "name": "GALTIER MEDICAL",
    "adress": "66 Avenue Chales Flahault",
    "postCode": "34090",
    "city": "MONTPELLIER",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "59",
    "name": "GATT EARL",
    "adress": "20 Route de Vauvert",
    "postCode": "30600",
    "city": "VESTRIC ET CANDIAC",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "60",
    "name": "GETINGE",
    "adress": "7 Av du CANADA BP49",
    "postCode": "91942",
    "city": "LES ULIS  CEDEX",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "61",
    "name": "GROSSERON",
    "adress": "37 Bd François Mitterand BP 70395",
    "postCode": "44819",
    "city": "St HERBLAIN",
    "phoneNumber": String("02 40 92 07 09"),
    "fax": String("02 40 92 07 10"),
    "email": "info@grosseron.com"
  }),
  new Provider({
    "number": "62",
    "name": "HPC Laboratoires",
    "adress": "ZA Les Cousteliers 85 Rue de la Bandido",
    "postCode": "34160",
    "city": "CASTRIES",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "63",
    "name": "HULINE",
    "adress": "Rue I et F Joliot Curie ZI",
    "postCode": "34500",
    "city": "BEZIERS",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "64",
    "name": "IGUAL",
    "adress": "ZAE du Larzat",
    "postCode": "34750",
    "city": "VILLENEUVE LES MAGUELONE",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "65",
    "name": "IMMUNOTOOLS",
    "adress": "Altenoyther Strasse 10",
    "postCode": "26169",
    "city": "Friesoythe Allemagne",
    "phoneNumber": String("49-4491400997"),
    "fax": String("49-4491400998"),
    "email": ""
  }),
  new Provider({
    "number": "66",
    "name": "INMAC WSTORE",
    "adress": "125 Avenue du bois de la pie",
    "postCode": "95921",
    "city": "ROISSY EN FRANCE CEDEX",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "67",
    "name": "INSTITUT PASTEUR",
    "adress": "28 Rue du Docteur Roux",
    "postCode": "75724",
    "city": "PARIS CEDEX 15",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "68",
    "name": "INVITROGEN",
    "adress": "BP 30096",
    "postCode": "95613",
    "city": "CERGY PONTOISE",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "69",
    "name": "JANVIER",
    "adress": "CS4105      Le Genest St Isle",
    "postCode": "53941",
    "city": "St BERTHEVIN CEDEX",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "70",
    "name": "JEULIN",
    "adress": "Rue Jacques Monod ZI N°1 Nétreville BP1900",
    "postCode": "27019",
    "city": "EVREUX CEDEX",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "71",
    "name": "KALS",
    "adress": "447 rue de l'Avenir",
    "postCode": "30320",
    "city": "POULX",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "72",
    "name": "LABO SERVICE",
    "adress": "153 Rue Claude Francois",
    "postCode": "34080",
    "city": "Montpellier",
    "phoneNumber": String("04 67 45 64 84"),
    "fax": String("04 67456486"),
    "email": ""
  }),
  new Provider({
    "number": "73",
    "name": "Laboratoire NUBLAT",
    "adress": "10 Rue du Clos Herberty",
    "postCode": "14000",
    "city": "CAEN",
    "phoneNumber": String("02 31 93 32 83"),
    "fax": String("02 31 93 79 85"),
    "email": ""
  }),
  new Provider({
    "number": "74",
    "name": "LABOVER",
    "adress": "Parc Euromedecine 20 Rue Robert Koch BP 27253",
    "postCode": "34086",
    "city": "MONTPELLIER CEDEX 4",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "75",
    "name": "LABOVER ASSISTANCE SARL",
    "adress": "Parc Euromedecine 20 Rue Robert Koch BP 27253",
    "postCode": "34086",
    "city": "MONTPELLIER CEDEX 4",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "76",
    "name": "LEGALLAIS",
    "adress": "8 Pôle d'activité Sainte Julie Route de Mende",
    "postCode": "34980",
    "city": "Montferrier sur Lez",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "77",
    "name": "LIBIOS",
    "adress": "83 Rue Edmond Michelet",
    "postCode": "69490",
    "city": "PONTCHARRA SUR TURDINE",
    "phoneNumber": String("04 74 13 03 02"),
    "fax": String("04 74 05 28 25"),
    "email": ""
  }),
  new Provider({
    "number": "78",
    "name": "LIFESCIENCES AMERSHAM",
    "adress": "Parc Technologique Rue René Razel Saclay",
    "postCode": "91898",
    "city": "ORSAY CEDEX",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "79",
    "name": "LINDE GAS",
    "adress": "16 Avenue de la Saudrune  BP 52228",
    "postCode": "31122",
    "city": "PORTET SUR GARONNE",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "80",
    "name": "LIS",
    "adress": "ZAC du Tec 36 Allée Jacques Cartier",
    "postCode": "30320",
    "city": "MARGUERITTES",
    "phoneNumber": String("04 66 36 08 05"),
    "fax": String("04 66 36 08 37"),
    "email": "lis-InfoBio@wanadoo.fr"
  }),
  new Provider({
    "number": "81",
    "name": "LORDIL",
    "adress": "Parc Tertiaire 3 Rue du Bois de la Champelle",
    "postCode": "54500",
    "city": "Vandoeuvre lès Nancy",
    "phoneNumber": String("09 77 56 31 23"),
    "fax": String("03 83 44 53 56"),
    "email": ""
  }),
  new Provider({
    "number": "82",
    "name": "LYRECO",
    "adress": "Rue alphonse Terroir",
    "postCode": "59318",
    "city": "VALENCIENNES CEDX 9",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "83",
    "name": "MANUTAN",
    "adress": 71,
    "postCode": "",
    "city": "",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "84",
    "name": "METLI SARL",
    "adress": "Chemin des Abeils",
    "postCode": "30110",
    "city": "BRANOUX LES TAILLADES",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "85",
    "name": "MICRON MICROTECH",
    "adress": "Parc Chater 33Rue Bélissen BP 39",
    "postCode": "69340",
    "city": "FRANCHEVILLE",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "86",
    "name": "MILLIPORE",
    "adress": "BP 307",
    "postCode": "78054",
    "city": "ST QUENTIN EN YVELINES CEDEX",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "87",
    "name": "NEPHROTEX",
    "adress": "122 SOGARIS",
    "postCode": "94524",
    "city": "RUNGIS CEDEX",
    "phoneNumber": String(146871282),
    "fax": String(146862402),
    "email": ""
  }),
  new Provider({
    "number": "88",
    "name": "OFFICEEXPRESS",
    "adress": "BP 104",
    "postCode": "93212",
    "city": "SAINT DENIS LA PLAINE",
    "phoneNumber": String("01 49 46 34 80"),
    "fax": String("01 49 46 01 75"),
    "email": ""
  }),
  new Provider({
    "number": "89",
    "name": "OLYMPUS France",
    "adress": "Parc d'affaires SILIC 74 Rue d'Arceuil BP90165",
    "postCode": "94533",
    "city": "RUNGIS CEDEX",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "90",
    "name": "ORGENTEC",
    "adress": "Parc Pissaloup 4 Rue Edouard Branly Bat Hermes II",
    "postCode": "78190",
    "city": "TRAPPES",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "91",
    "name": "PBI Dansensor France",
    "adress": "14 Rue de Ris",
    "postCode": "91170",
    "city": "VIRY-CHATILLON",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "92",
    "name": "PEPROTECH",
    "adress": "12 Rue Paul Chartrousse",
    "postCode": "92200",
    "city": "NEUILLY SUR SEINE",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "93",
    "name": "PERBIO Science France SAS",
    "adress": "16 Avenue de Québec SILIC 765",
    "postCode": "91963",
    "city": "COURTABOEUF CEDEX",
    "phoneNumber": String("0800 50 82 15"),
    "fax": String("0800 69 83 23"),
    "email": ""
  }),
  new Provider({
    "number": "94",
    "name": "PHARMACIE DES 4 SEIGNEURS",
    "adress": "675 Avenue Paul Parguel",
    "postCode": "34090",
    "city": "MONTPELLIER",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "95",
    "name": "PIERRON",
    "adress": "CS80609",
    "postCode": "57206",
    "city": "SARReGUEMINES",
    "phoneNumber": String("03 87 95 14 77"),
    "fax": String("03 87 98 45 91"),
    "email": ""
  }),
  new Provider({
    "number": "96",
    "name": "PRO-XL",
    "adress": "ZAC de la petite camargue CS70002",
    "postCode": "34403",
    "city": "LUNEL",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "97",
    "name": "PROEQUIP",
    "adress": "Route de la Foire",
    "postCode": "34470",
    "city": "PEROLS",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "98",
    "name": "PROMEGA",
    "adress": "Parc des verrières 24 chemin des Verrières",
    "postCode": "94420",
    "city": "LE PLESSIS TREVISE",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "99",
    "name": "PROMOCASH SARL CAMPA",
    "adress": "371 Avenue du marché Gare",
    "postCode": "34070",
    "city": "MONTPELLIER",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "100",
    "name": "QUIAGEN",
    "adress": "3 Avenue du Canada",
    "postCode": "91974",
    "city": "COURTABOEUF CEDEX",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "101",
    "name": "RADIOSPARES",
    "adress": "Rue Norman King BP40453",
    "postCode": "60031",
    "city": "BEAUVAIS CEDEX",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "102",
    "name": "SAFE",
    "adress": "Route de St Bris",
    "postCode": "89290",
    "city": "AUGY",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "103",
    "name": "SATELEK-Perrin Floriane",
    "adress": "447 Rue de l'Avenir",
    "postCode": "30320",
    "city": "POULX",
    "phoneNumber": String("06 03 20 44 93"),
    "fax": String("04 66 75 44 52"),
    "email": ""
  }),
  new Provider({
    "number": "104",
    "name": "SEBIA",
    "adress": "Parc Technologique Léonard de Vinci CP 8010 Lisses",
    "postCode": "91008",
    "city": "EVRY CEDEX",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "105",
    "name": "SICA LES VERGERS DE MAUGUIO",
    "adress": "Route de Baillargues BP 36",
    "postCode": "34131",
    "city": "MAUGUIO CEDEX",
    "phoneNumber": String("04 67 70 17 61"),
    "fax": String("04 67 70 00 08"),
    "email": ""
  }),
  new Provider({
    "number": "106",
    "name": "SIGMA-ALDRICH",
    "adress": "L'isle D'Abeau Chesnes BP 701",
    "postCode": "38297",
    "city": "SAINT QUENTIN FALLAVIER CEDEX",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "107",
    "name": "SKULDTECH",
    "adress": "134 Rue du Curat Bât Amarante",
    "postCode": "34090",
    "city": "MONTPELLIER",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "108",
    "name": "SOBIODA",
    "adress": "97 Rue Lavoisier",
    "postCode": "38330",
    "city": "MONTBONNOT ST MARTIN",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "109",
    "name": "SODIPRO",
    "adress": "42 Rue Amboise Croizat BP 307",
    "postCode": "38434",
    "city": "ECHIROLLES CEDEX",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "110",
    "name": "SOLANREF",
    "adress": "320 Rue des Garriguettes",
    "postCode": "34130",
    "city": "SAINTt AUNES",
    "phoneNumber": String("04 67 04 14 97"),
    "fax": String("04 67 04 15 46"),
    "email": ""
  }),
  new Provider({
    "number": "111",
    "name": "SORDALAB",
    "adress": "15 Avenue Grenots",
    "postCode": "91150",
    "city": "ETAMPES",
    "phoneNumber": String("01 69 92 26 72"),
    "fax": String("01 69 92 26 74"),
    "email": ""
  }),
  new Provider({
    "number": "112",
    "name": "STAGO",
    "adress": "9 rue des fréres Chausson BP226",
    "postCode": "92602",
    "city": "ASNIERES SUR SEINE CEDEX",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "113",
    "name": "TECHNIPLAST",
    "adress": "Le Sharnal 1 Allée des séquoias",
    "postCode": "69760",
    "city": "LIMONEST",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "114",
    "name": "TECHNOCONFORT",
    "adress": "730 Route Impériale",
    "postCode": "34670",
    "city": "BAILLARGUES",
    "phoneNumber": String(""),
    "fax": String(""),
    "email": ""
  }),
  new Provider({
    "number": "115",
    "name": "U.G.A.P",
    "adress": "Route du coteau rouge",
    "postCode": "13590",
    "city": "MEYREUIL",
    "phoneNumber": String("04 42 65 25 24"),
    "fax": String("04 42 65 25 39"),
    "email": ""
  }),
  new Provider({
    "number": "116",
    "name": "V W R International",
    "adress": "Parc le Phoenix 8C rue Schertz Bât A",
    "postCode": "67100",
    "city": "STRASBOURG",
    "phoneNumber": String("811 74 27 42"),
    "fax": String("811 74 37 43"),
    "email": ""
  }),
  new Provider({
    "number": "117",
    "name": "Servilab",
    "adress": "17 rue Arnold Dolmetsch ZAC Ribay",
    "postCode": "72000",
    "city": "Le Mans",
    "phoneNumber": String(243392530),
    "fax": String(243392539),
    "email": "contact@servilab.fr"
  }),
  new Provider({
    "number": "118",
    "name": "selectronic",
    "adress": "BP 10050",
    "postCode": "59891",
    "city": "LILLE cedex 9",
    "phoneNumber": String("09 70 82 01 66"),
    "fax": String(""),
    "email": "contact@selectronic.fr"
  })
]

let places = [
  new Place({
    "number": "1",
    "name": "Chambre Froide RDC",
    "placeFloor": "0",
    "placeType": "1"
  }),
  new Place({
    "number": "2",
    "name": "E010 Réserve produits chimiques",
    "placeFloor": "0",
    "placeType": "0"
  }),
  new Place({
    "number": "3",
    "name": "E010a Réserve matériel",
    "placeFloor": "0",
    "placeType": "0"
  }),
  new Place({
    "number": "4",
    "name": "E010b Réserve verrerie",
    "placeFloor": "0",
    "placeType": "0"
  }),
  new Place({
    "number": "5",
    "name": "E018g Garde manger",
    "placeFloor": "0",
    "placeType": "0"
  }),
  new Place({
    "number": "6",
    "name": "E018g Garde manger frigo 1",
    "placeFloor": "0",
    "placeType": "1"
  }),
  new Place({
    "number": "7",
    "name": "E018g Garde manger congélateur",
    "placeFloor": "0",
    "placeType": "2"
  }),
  new Place({
    "number": "8",
    "name": "E018g Garde manger frigo 2",
    "placeFloor": "0",
    "placeType": "1"
  }),
  new Place({
    "number": "9",
    "name": "E009a Réserve",
    "placeFloor": "0",
    "placeType": "0"
  }),
  new Place({
    "number": "10",
    "name": "Chambre Froide 1er",
    "placeFloor": "1",
    "placeType": "1"
  }),
  new Place({
    "number": "11",
    "name": "Réserve 1er étage",
    "placeFloor": "1",
    "placeType": "1"
  }),
  new Place({
    "number": "12",
    "name": "E125b Réserve pharmaco",
    "placeFloor": "1",
    "placeType": "1"
  }),
  new Place({
    "number": "13",
    "name": "E108 Réserve chimie",
    "placeFloor": "1",
    "placeType": "1"
  }),
  new Place({
    "number": "14",
    "name": "E108 congélateur biomol",
    "placeFloor": "1",
    "placeType": "2"
  }),
  new Place({
    "number": "15",
    "name": "E111 frigo chimie",
    "placeFloor": "1",
    "placeType": "1"
  }),
  new Place({
    "number": "16",
    "name": "Chambre Froide 2eme",
    "placeFloor": "2",
    "placeType": "1"
  }),
  new Place({
    "number": "17",
    "name": "E205 Réserve 2eme",
    "placeFloor": "2",
    "placeType": "0"
  }),
  new Place({
    "number": "18",
    "name": "E205 Congélateur -80C",
    "placeFloor": "2",
    "placeType": "3"
  }),
  new Place({
    "number": "19",
    "name": "E218 Réserve",
    "placeFloor": "2",
    "placeType": "0"
  }),
  new Place({
    "number": "20",
    "name": "E222a Réserve Biomol 2eme",
    "placeFloor": "2",
    "placeType": "0"
  }),
  new Place({
    "number": "21",
    "name": "E211 Réserve microbio",
    "placeFloor": "2",
    "placeType": "0"
  }),
  new Place({
    "number": "22",
    "name": "E206 Petite Réserve 2eme",
    "placeFloor": "2",
    "placeType": "0"
  }),
  new Place({
    "number": "23",
    "name": "Soute chimique",
    "placeFloor": "Ext",
    "placeType": "0"
  }),
  new Place({
    "number": "24",
    "name": "Stockage gaz",
    "placFfloor": "Ext",
    "placeType": "0"
  })
]

let products = [
  new Product({
    tva: 19.5,
    number: "1",
    name: "Product A",
    unit: "kg",
    quantity: 120,
    thresholdQuantity: 20,
    price: 9,
    category: categories[0],
    provider: providers[0],
    subCategory: subCategories[0],
    defaultPlace: places[0]
  }),
  new Product({
    tva: 19.5,
    number: "2",
    name: "Product B",
    unit: "kg",
    quantity: 120,
    thresholdQuantity: 20,
    price: 17,
    category: categories[0],
    provider: providers[0],
    subCategory: subCategories[1],
    defaultPlace: places[1]
  }),
  new Product({
    tva: 19.5,
    number: "3",
    name: "Product C",
    unit: "kg",
    quantity: 120,
    thresholdQuantity: 20,
    price: 20,
    category: categories[1],
    provider: providers[2],
    subCategory: subCategories[2],
    defaultPlace: places[0]
  }),
  new Product({
    tva: 19.5,
    number: "4",
    name: "Product D",
    unit: "kg",
    quantity: 120,
    thresholdQuantity: 20,
    price: 10.4,
    category: categories[1],
    provider: providers[2],
    subCategory: subCategories[2],
    defaultPlace: places[2]
  }),
  new Product({
    tva: 19.5,
    number: "5",
    name: "Product E",
    unit: "kg",
    quantity: 15,
    thresholdQuantity: 30,
    price: 40,
    category: categories[2],
    provider: providers[1],
    subCategory: subCategories[3],
    defaultPlace: places[1]
  }),
]

let requests = [
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[1],
    requestDate: new Date(2017, 1, 24),
    status: Request.STATUS.REFUSED
  }),
  new Request({
    requester: users[1],
    quantity: "50",
    product: products[1],
    requestDate: new Date(2017, 2, 1),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[2],
    quantity: "1200",
    product: products[1],
    requestDate: new Date(2017, 1, 8),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[1],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.COMPLETED
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[2],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[2],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[2],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[2],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[2],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[2],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[2],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[2],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[2],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "60",
    product: products[1],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[3],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[1],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[2],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.PENDING
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[2],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.ACCEPTED
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[1],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.COMPLETED
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[3],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.REFUSED
  }),
  new Request({
    requester: users[0],
    quantity: "30",
    product: products[2],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.CANCELED
  }),
  new Request({
    requester: users[2],
    quantity: "60",
    product: products[3],
    requestDate: new Date(2017, 5, 5),
    status: Request.STATUS.ACCEPTED
  }),

]

let orders = [
  new Order({
    orderCreator: users[0],
    orderDate: new Date(2017, 5, 6),
    status: Order.STATUS.IN_PROCESS,
    deliveryDate: new Date(2017, 5, 5),
    orderRows: [
      new OrderRow({
        product: products[1],
        quantity: 30,
        //effectiveQuantity: ""
        //order: ""
        unitPrice: 12,
        effectiveTVA: 19.5

      }),
      new OrderRow({
        product: products[2],
        quantity: 50,
        //effectiveQuantity: ""
        //order: ""
        unitPrice: 15,
        effectiveTVA: 19.5

      }),
    ]
  })
]
export default async (verbose = false) => {
  verbose && console.log("reset DB");
  await clearDatabase()
  await Promise.all(users.map(createUser))
  await Promise.all(categories.map(createCategory))
  await Promise.all(subCategories.map(createSubCategory))
  await Promise.all(providers.map(createProvider))
  await Promise.all(places.map(createPlace))
  await Promise.all(products.map(createProduct))
  await Promise.all(requests.map(createRequest))
  await Promise.all(orders.map(createOrder))
  verbose && console.log("DB has been reset");


}
