// Constant STORYLINE as JS object
// Future version will use it as JSON file
/* eslint quotes: "off", comma-dangle: "off" */
STORYLINE = {
  "fr": {
    "start": "i0",
    "end": "o5",
    "i": [{
        "id": "i0",
        "type": "question",
        "text": "Bonjour, mon ami(e) !",
        "a": [{
            "type": "radio",
            "store": false,
            "text": "Bonjour",
            "next": "i1"
          },
          {
            "type": "radio",
            "store": false,
            "text": "Hey !",
            "next": "i1"
          },
          {
            "type": "radio",
            "store": false,
            "text": "Au revoir",
            "next": "o0"
          }
        ]
      },
      {
        "id": "i1",
        "type": "neutral",
        "text": "...ces parenthèses m'ennuient..."
      },
      {
        "id": "i2",
        "type": "neutral",
        "text": "Excusez-moi de vous le demander..."
      },
      {
        "id": "i3",
        "type": "question",
        "text": "Vous êtes un homme ou une femme ?",
        "a": [{
            "type": "radio",
            "text": "Je suis un homme",
            "store": "sex",
            "value": "m",
            "next": "i4"
          },
          {
            "type": "radio",
            "text": "Je suis une femme",
            "store": "sex",
            "value": "f",
            "next": "i4"
          },
          {
            "type": "radio",
            "text": "Cela ne vous concerne pas",
            "store": "sex",
            "value": "x",
            "next": "i4"
          }
        ]
      },
      {
        "id": "i4",
        "type": "partial",
        "text": [{
            "prop": "sex",
            "value": "m",
            "text": "Très bien, bienvenu !"
          },
          {
            "prop": "sex",
            "value": "f",
            "text": "Très bien, bienvenue !"
          },
          {
            "prop": "sex",
            "value": "x",
            "text": "Pas de problèmes !"
          }
        ]
      },
      {
        "id": "i5",
        "type": "question",
        "text": "Comment allez-vous aujourd'hui ?",
        "a": [{
            "type": "radio",
            "text": "Bien, et vous ?",
            "store": "isHappy",
            "value": true,
            "next": "i6"
          },
          {
            "type": "radio",
            "text": "Mmh... Pas trop bien...",
            "store": "isHappy",
            "value": false,
            "next": "i6"
          }
        ]
      },
      {
        "id": "i6",
        "type": "partial",
        "text": [{
            "prop": "isHappy",
            "value": true,
            "text": "Très bien, merci"
          },
          {
            "prop": "isHappy",
            "value": false,
            "text": "Mauvaise journée ? Désolé de l'entendre"
          }
        ]
      },
      {
        "id": "i7",
        "type": "question",
        "text": "Puis-je vous demander votre nom ?",
        "a": [{
            "type": "radio",
            "store": "hasname",
            "value": false,
            "text": "Je préfère ne pas le dire",
            "next": "i8"
          },
          {
            "type": "input",
            "store": "name",
            "value": "",
            "text": "nom, prénom, pséudo...",
            "next": "i8"
          }
        ]
      },
      {
        "id": "i8",
        "type": "partial",
        "text": [{
            "prop": "hasname",
            "value": true,
            "text": "Enchanté, #name"
          },
          {
            "prop": "hasname",
            "value": false,
            "text": "Ok. Je comprends."
          }
        ]
      },
      {
        "id": "i9",
        "type": "neutral",
        "text": "De quoi aimeriez-vous parler ?"
      },
      {
        "id": "i10",
        "type": "neutral",
        "text": "De moi ?"
      },
      {
        "id": "i11",
        "type": "neutral",
        "text": "de ce que je fais ?"
      },
      {
        "id": "i12",
        "type": "question",
        "text": "ou d'autre chose ?",
        "a": [{
            "type": "partial",
            "text": [{
                "prop": "bio",
                "value": false,
                "text": "Parlez-moi de vous"
              },
              {
                "prop": "bio",
                "value": true,
                "text": "Reparlez-moi de vous"
              }
            ],
            "store": "bio",
            "value": true,
            "next": "b0"
          },
          {
            "type": "partial",
            "prop": "resume",
            "text": [{
                "prop": "resume",
                "value": false,
                "text": "Dîtes-moi ce que vous faîtes"
              },
              {
                "prop": "resume",
                "value": true,
                "text": "Redîtes-moi ce que vous faîtes"
              }
            ],
            "store": "resume",
            "value": true,
            "next": "r0"
          },
          {
            "type": "partial",
            "text": [{
                "prop": "game",
                "value": false,
                "text": "Je m'ennuie !"
              },
              {
                "prop": "game",
                "value": true,
                "text": "Je m'ennuie encore !"
              }
            ],
            "store": "game",
            "value": true,
            "next": "g0"
          }
        ]
      }
    ],
    "b": [{
        "id": "b0",
        "type": "neutral",
        "text": "Avec plaisir..."
      },
      {
        "id": "b1",
        "type": "neutral",
        "text": "Je m'appelle dr27"
      },
      {
        "id": "b2",
        "type": "question",
        "text": "(mais en dehors de ce chat on m'appelle Giuseppe De Ponte)",
        "a": [{
            "type": "radio",
            "store": false,
            "text": "Vous êtes espagnol ?",
            "next": "b3"
          },
          {
            "type": "partial",
            "store": false,
            "text": [{
                "prop": "sex",
                "value": "m",
                "text": "Enchanté, Giuseppe"
              },
              {
                "prop": "sex",
                "value": "f",
                "text": "Enchantée, Giuseppe"
              },
              {
                "prop": "sex",
                "value": "x",
                "text": "Enchanté(e), Giuseppe"
              }
            ],
            "next": "b3"
          },
          {
            "type": "radio",
            "store": false,
            "text": "D'accord",
            "next": "b3"
          }
        ]
      },
      {
        "id": "b3",
        "type": "neutral",
        "text": "Je viens d'Italie"
      },
      {
        "id": "b4",
        "type": "neutral",
        "text": "j'ai trente-deux ans"
      },
      {
        "id": "b5",
        "type": "neutral",
        "text": "je vis à Paris"
      },
      {
        "id": "b6",
        "type": "neutral",
        "text": "depuis presque neuf ans."
      },
      {
        "id": "b7",
        "type": "neutral",
        "text": "Pendant mes études en Italie j'ai rencontré Louise"
      },
      {
        "id": "b8",
        "type": "question",
        "text": "(qui est la raison pour laquelle je vis en France)",
        "a": [{
            "type": "radio",
            "store": false,
            "text": "Et comment êtes-vous ?",
            "next": "b9"
          },
          {
            "type": "partial",
            "prop": "resume",
            "text": [{
                "prop": "resume",
                "value": false,
                "text": "Dîtes-moi ce que vous faîtes"
              },
              {
                "prop": "resume",
                "value": true,
                "text": "Redîtes-moi ce que vous faîtes"
              }
            ],
            "store": "resume",
            "value": true,
            "next": "r0"
          }
        ]
      },
      {
        "id": "b9",
        "type": "neutral",
        "text": "J'ai beaucoup d'imagination et une enorme curiosité"
      },
      {
        "id": "b10",
        "type": "neutral",
        "text": "Je suis plus à l'aise à l'écrit qu'à l'oral"
      },
      {
        "id": "b11",
        "type": "neutral",
        "text": "(mais j'y travaille... \u263a)"
      },
      {
        "id": "b12",
        "type": "neutral",
        "text": "Je dessine presque tous les jours"
      },
      {
        "id": "b13",
        "type": "question",
        "text": "Voulez-vous voir quelques-uns de mes dessin ?",
        "a": [{
            "type": "radio",
            "store": false,
            "text": "Pourquoi pas ?",
            "next": "b14"
          },
          {
            "type": "radio",
            "store": false,
            "text": "Volontiers",
            "next": "b14"
          },
          {
            "type": "radio",
            "store": false,
            "text": "Peut-être plus tard",
            "next": "b17"
          }
        ]
      },
      {
        "id": "b14",
        "type": "figure",
        "text": "",
        "src": "img/dessin1.jpg"
      },
      {
        "id": "b15",
        "type": "figure",
        "text": "",
        "src": "img/dessin1.jpg"
      },
      {
        "id": "b16",
        "type": "figure",
        "text": "",
        "src": "img/dessin1.jpg"
      },
      {
        "id": "b17",
        "type": "neutral",
        "text": "Vous pourrez voir quelques dessins sur ma page tumblr"
      },
      {
        "id": "b18",
        "type": "link",
        "url": "https://giuseppedeponte.tumblr.com",
        "text": "giuseppedeponte.tumblr.com"
      },
      {
        "id": "b19",
        "type": "neutral",
        "text": "Je suis bilingue italien/français"
      },
      {
        "id": "b20",
        "type": "neutral",
        "text": "et je parle couramment anglais"
      },

      {
        "id": "b21",
        "type": "neutral",
        "text": "J'aime voyager"
      },

      {
        "id": "b22",
        "type": "neutral",
        "text": "Je fait de la photo argentique"
      },
      {
        "id": "b23",
        "type": "neutral",
        "text": "et je joue de la guitare"
      },

      {
        "id": "b24",
        "type": "question",
        "text": "Voilà, en gros, mon profil",
        "a": [{
            "type": "partial",
            "prop": "resume",
            "text": [{
                "prop": "resume",
                "value": false,
                "text": "Dîtes-moi ce que vous faîtes"
              },
              {
                "prop": "resume",
                "value": true,
                "text": "Redîtes-moi ce que vous faîtes"
              }
            ],
            "store": "resume",
            "value": true,
            "next": "r0"
          },
          {
            "type": "partial",
            "text": [{
                "prop": "game",
                "value": false,
                "text": "Je m'ennuie !"
              },
              {
                "prop": "game",
                "value": true,
                "text": "Je m'ennuie encore !"
              }
            ],
            "store": "game",
            "value": true,
            "next": "g0"
          }
        ]
      }
    ],
    "r": [{
        "id": "r0",
        "type": "neutral",
        "text": "Voyons... Voulez-vous connaître mon parcours ?"
      },
      {
        "id": "r1",
        "type": "question",
        "text": "ou savoir plutôt ce que je fais aujourd'hui ?",
        "a": [{
            "type": "radio",
            "store": false,
            "text": "Parlez-moi de votre parcours",
            "next": "r37"
          },
          {
            "type": "radio",
            "store": "false",
            "text": "Que faîtes vous aujourd'hui ?",
            "next": "r2"
          }
        ]
      },
      {
        "id": "r2",
        "type": "neutral",
        "text": "Parfait."
      },
      {
        "id": "r3",
        "type": "neutral",
        "text": "Je valide actuellement une formation"
      },
      {
        "id": "r4",
        "type": "neutral",
        "text": "de développeur JavaScript Fullstack"
      },
      {
        "id": "r5",
        "type": "neutral",
        "text": "(c'est JS qui nous permet de nous parler en ce moment)"
      },
      {
        "id": "r6",
        "type": "neutral",
        "text": "Il s'agit d'une formation intensive"
      },
      {
        "id": "r7",
        "type": "neutral",
        "text": "Des professionnels en activité m'accompagnent"
      },
      {
        "id": "r8",
        "type": "neutral",
        "text": "tout au long de ce cursus"
      },
      {
        "id": "r9",
        "type": "neutral",
        "text": "pour que je puisse maîtriser cette techno"
      },
      {
        "id": "r10",
        "type": "question",
        "text": "dans toutes ses applications",
        "a": [{
            "type": "radio",
            "store": false,
            "text": "Pourquoi avoir choisi ce domaine ?",
            "next": "r11"
          },
          {
            "type": "radio",
            "store": false,
            "text": "Parlez-moi de votre parcours",
            "next": "r37"
          }
        ]
      },
      {
        "id": "r11",
        "type": "neutral",
        "text": "J'ai toujours trafiqué avec des ordinateurs"
      },
      {
        "id": "r12",
        "type": "neutral",
        "text": "depuis tout petit"
      },
      {
        "id": "r13",
        "type": "neutral",
        "text": "Il y a six ans j'ai décidé de faire de ce métier l'objectif de mon parcours professionnel"
      },
      {
        "id": "r14",
        "type": "neutral",
        "text": "Et j'ai appris à leur dire quoi faire"
      },
      {
        "id": "r15",
        "type": "neutral",
        "text": "Ils m'écoutent assez bien depuis"
      },
      {
        "id": "r16",
        "type": "neutral",
        "text": "(parfois c'est plus dûr, mais en général ça va)"
      },
      {
        "id": "r17",
        "type": "neutral",
        "text": "Valider ma formation me permettra de finaliser ce long parcours d'apprentissage"
      },
      {
        "id": "r18",
        "type": "neutral",
        "text": "et de me spécialiser dans un langage très versatile"
      },
      {
        "id": "r19",
        "type": "neutral",
        "text": "(JS permet une infinité de possibilités d'application)"
      },
      {
        "id": "r20",
        "type": "neutral",
        "text": "Et enfin d'être opérationnel"
      },
      {
        "id": "r21",
        "type": "neutral",
        "text": "pour apporter ma contribution à ce domaine passionant"
      },
      {
        "id": "r22",
        "type": "question",
        "text": "et si central dans notre société",
        "a": [{
            "type": "radio",
            "store": false,
            "text": "Qu'allez-vous pouvoir faire ?",
            "next": "r23"
          },
          {
            "type": "radio",
            "store": false,
            "text": "Parlez-moi de votre parcours",
            "next": "r37"
          }
        ]
      },
      {
        "id": "r23",
        "type": "neutral",
        "text": "JS est le langage, avec HTML et CSS, utilisé par tous les navigateurs web"
      },
      {
        "id": "r24",
        "type": "neutral",
        "text": "Il est central dans tout travail de développement front-end"
      },
      {
        "id": "r25",
        "type": "neutral",
        "text": "tant pour le web que pour le mobile"
      },
      {
        "id": "r26",
        "type": "neutral",
        "text": "(tout seul ou avec l'aide de ses nombreuses librairies)"
      },
      {
        "id": "r27",
        "type": "neutral",
        "text": "(comme JQuery, Angular, Bootstrap, Foundation, etc...)"
      },
      {
        "id": "r28",
        "type": "neutral",
        "text": "JS est aussi de plus en plus utilisé dans le développement back-end"
      },
      {
        "id": "r29",
        "type": "neutral",
        "text": "grâce à des techno comme Node, Express, MongoDB, Meteor et Ajax"
      },
      {
        "id": "r30",
        "type": "neutral",
        "text": "Tous ces outils sont ceux dont j'ai pu faire l'expérience tout au long de mon parcours"
      },
      {
        "id": "r31",
        "type": "neutral",
        "text": "Et que je maîtriserai entièrement à la fin de ma formation"
      },
      {
        "id": "r32",
        "type": "neutral",
        "text": "Pour plus de détails sur le programme de ma formation vous pouvez consulter ce document"
      },
      {
        "id": "r33",
        "type": "link",
        "text": "Formation DIWJS",
        "url": "doc/DIWFULLS.pdf"
      },
      {
        "id": "r34",
        "type": "neutral",
        "text": "Vous pouvez aussi voir certaines de mes réalisations sur mon compte github"
      },
      {
        "id": "r35",
        "type": "link",
        "text": "@github.com/giuseppedeponte",
        "url": "https://github.com/giuseppedeponte"
      },
      {
        "id": "r36",
        "type": "question",
        "text": "(vous y trouverez aussi le code source de cette page)",
        "a": [{
            "type": "partial",
            "text": [{
                "prop": "bio",
                "value": true,
                "text": "Parlez-moi de vous"
              },
              {
                "prop": "bio",
                "value": false,
                "text": "Reparlez-moi de vous"
              }
            ],
            "store": "bio",
            "value": true,
            "next": "b0"
          },
          {
            "type": "radio",
            "store": false,
            "text": "Parlez-moi de votre parcours",
            "next": "r37"
          },
          {
            "type": "partial",
            "text": [{
                "prop": "game",
                "value": false,
                "text": "Je m'ennuie !"
              },
              {
                "prop": "game",
                "value": true,
                "text": "Je m'ennuie encore !"
              }
            ],
            "store": "game",
            "value": true,
            "next": "g0"
          }
        ]
      },
      {
        "id": "r37",
        "type": "neutral",
        "text": "Je vais tenter de résumer..."
      },
      {
        "id": "r38",
        "type": "neutral",
        "text": "J'ai obtenu un bac scientifique en 2003"
      },
      {
        "id": "r39",
        "type": "neutral",
        "text": "Puis validé une licence en études cinématographiques"
      },
      {
        "id": "r40",
        "type": "neutral",
        "text": "en 2007"
      },
      {
        "id": "r41",
        "type": "neutral",
        "text": "suivie en 2008 d'un master en écritures pour le cinéma"
      },
      {
        "id": "r42",
        "type": "neutral",
        "text": "De 2008 à 2010 j'ai collaboré avec l'association Affabula Readings"
      },
      {
        "id": "r43",
        "type": "neutral",
        "text": "en tant que story-editor"
      },
      {
        "id": "r44",
        "type": "neutral",
        "text": "De 2010 à 2017"
      },
      {
        "id": "r45",
        "type": "neutral",
        "text": "j'ai été employé en tant que conseiller de vente"
      },
      {
        "id": "r46",
        "type": "neutral",
        "text": "dans la boutique Le Géant des Beaux-Arts à Paris"
      },
      {
        "id": "r47",
        "type": "neutral",
        "text": "Depuis 2015 j'ai développé et je maintien le site web de l'association Nicarali"
      },
      {
        "id": "r48",
        "type": "link",
        "text": "nicarali.com",
        "url": "http://www.nicarali.com"
      },
      {
        "id": "r49",
        "type": "neutral",
        "text": "Voilà mon parcours de formation"
      },
      {
        "id": "r50",
        "type": "neutral",
        "text": "et mes expériences proféssionnelles"
      },
      {
        "id": "r51",
        "type": "neutral",
        "text": "Si vous voulez vous pouvez aussi consulter mon CV"
      },
      {
        "id": "r52",
        "type": "link",
        "text": "Curriculum Vitae",
        "url": "docs/CV_Giuseppe_DE_PONTE.pdf"
      },
      {
        "id": "r53",
        "type": "neutral",
        "text": "ou me suivre sur LinkedIn"
      },
      {
        "id": "r54",
        "type": "link",
        "text": "@linkedin/giuseppedeponte",
        "url": "https://www.linkedin.com/in/giuseppedeponte"
      },
      {
        "id": "r55",
        "type": "question",
        "text": "Et maintenat, de quoi aimeriez-vous parler ?",
        "a": [{
            "type": "partial",
            "text": [{
                "prop": "bio",
                "value": true,
                "text": "Parlez-moi de vous"
              },
              {
                "prop": "bio",
                "value": false,
                "text": "Reparlez-moi de vous"
              }
            ],
            "store": "bio",
            "value": true,
            "next": "b0"
          },
          {
            "type": "radio",
            "store": "false",
            "text": "Que faîtes-vous aujourd'hui ?",
            "next": "r3"
          },
          {
            "type": "partial",
            "text": [{
                "prop": "game",
                "value": false,
                "text": "Je m'ennuie !"
              },
              {
                "prop": "game",
                "value": true,
                "text": "Je m'ennuie encore !"
              }
            ],
            "store": "game",
            "value": true,
            "next": "g0"
          }
        ]
      }
    ],
    "g": [{
        "id": "g0",
        "type": "neutral",
        "text": "Ooh, désolé de l'entendre..."
      },
      {
        "id": "g1",
        "type": "question",
        "text": "Voulez-vous faire un jeu ?",
        "a": [{
            "type": "radio",
            "store": false,
            "text": "Oh, oui !",
            "next": "g2"
          },
          {
            "type": "radio",
            "store": false,
            "text": "Parlons de vous, plutôt",
            "next": "i12"
          },
          {
            "type": "radio",
            "store": false,
            "text": "Je dois partir",
            "next": "o0"
          }
        ]
      },
      {
        "id": "g2",
        "type": "neutral",
        "text": "Je peux vous proposer..."
      },
      {
        "id": "g3",
        "type": "neutral",
        "text": "une partie de 'pierre feuille ciseaux' ?"
      },
      {
        "id": "g4",
        "type": "neutral",
        "text": "(j'ai crée moi même ce petit jeux en JS)"
      },
      {
        "id": "g5",
        "type": "question",
        "text": "Cela vous intéresse ?",
        "a": [{
            "type": "radio",
            "store": false,
            "text": "Bien sûr",
            "next": "g6"
          },
          {
            "type": "radio",
            "store": false,
            "text": "Mmh... Essayons",
            "next": "g6"
          },
          {
            "type": "radio",
            "store": false,
            "text": "Je dois partir",
            "next": "o0"
          }
        ]
      },
      {
        "id": "g6",
        "type": "neutral",
        "text": "Ok, c'est parti"
      },
      {
        "id": "g7",
        "type": "neutral",
        "text": "Suivez le lien suivant pour jouer"
      },
      {
        "id": "g8",
        "type": "link",
        "text": "Pierre | Feuille | Ciseaux",
        "url": "https://giuseppedeponte.github.io/rock-paper-scissor"
      },
      {
        "id": "g9",
        "type": "neutral",
        "text": "(Le lien s'ouvrira dans un nouvel onglet...)"
      },
      {
        "id": "g10",
        "type": "neutral",
        "text": "(...je vous attends ici...)"
      }
    ],
    "o": [{
        "id": "o0",
        "type": "neutral",
        "text": "Le temps passe vite..."
      },
      {
        "id": "o1",
        "type": "neutral",
        "text": "Mais n'hésitez pas à me recontacter !"
      },
      {
        "id": "o2",
        "type": "neutral",
        "text": "Voici ma carte de visite"
      },
      {
        "id": "o3",
        "type": "figure",
        "text": "Mes coordonnées",
        "img": "img/card.jpg"
      },
      {
        "id": "o4",
        "type": "question",
        "text": "Merci beacoup de votre amabilité !",
        "a": [{
            "type": "radio",
            "store": false,
            "text": "Merci à vous",
            "next": "o5"
          },
          {
            "type": "radio",
            "store": false,
            "text": "Bonne continuation",
            "next": "o5"
          },
          {
            "type": "radio",
            "store": false,
            "text": "Au revoir",
            "next": "o5"
          }
        ]
      },
      {
        "id": "o5",
        "type": "neutral",
        "text": "Au revoir #name"
      }
    ]
  }
};
