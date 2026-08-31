export const ow2Heroes = [
    "Dmon", "Dva", "Domina", "Doomfist","Hazard","Junker Queen","Mauga","Orisa","Ramattra","Reinhardt","Roadhog","Sigma","Winston","Wrecking Ball","Zarya",
    "Ashe", "Anran", "Bastion", "Cassidy", "Echo", "Emre", "Freja", "Genji", "Hanzo", "Junkrat", "Mei", "Pharah", "Reaper", "Sierra", "Sojourn", "Soldier 76", "Sombra", "Symmetra", "Torbjorn", "Tracer", "Vendetta", "Venture",  "Widowmaker", "Shion",
    "Ana", "Baptiste", "Brigitte", "Illari", "Kiriko", "Lifeweaver", "Lucio", "Jetpack Cat", "Juno", "Mercy", "Mizuki", "Moira", "Wuyang", "Zenyatta"
] as const;

export const ow2Roles = [
    "Tank",
    "Damage",
    "Support",
    "Flex"
]

export const ow2Maps = { 
    0: { name: "No Map", mode: "Push" },
     1: { name: "Antarctic Peninsula", mode: "Control" },
      2: { name: "Busan", mode: "Control" },
       3: { name: "Ilios", mode: "Control" },
        4: { name: "Lijiang Tower", mode: "Control" },
         5: { name: "Nepal", mode: "Control" },
          6: { name: "Oasis", mode: "Control" },
           7: { name: "Samoa", mode: "Control" },
            8: { name: "Circuit Royal", mode: "Escort" },
             9: { name: "Dorado", mode: "Escort" },
              10: { name: "Havana", mode: "Escort" },
               11: { name: "Junkertown", mode: "Escort" },
                12: { name: "Rialto", mode: "Escort" },
                 13: { name: "Route 66", mode: "Escort" },
                  14: { name: "Shambali Monastery", mode: "Escort" },
                   15: { name: "Watchpoint: Gibraltar", mode: "Escort" },
                    16: { name: "Aatlis", mode: "Flashpoint" },
                     17: { name: "New Junk City", mode: "Flashpoint" },
                      18: { name: "Suravasa", mode: "Flashpoint" },
                       19: { name: "Blizzard World", mode: "Hybrid" },
                        20: { name: "Eichenwalde", mode: "Hybrid" },
                         21: { name: "King's Row", mode: "Hybrid" },
                          22: { name: "Midtown", mode: "Hybrid" },
                           23: { name: "Neon Junction", mode: "Hybrid" },
                            24: { name: "Numbani", mode: "Hybrid" },
                             25: { name: "Paraiso", mode: "Hybrid" },
                              26: { name: "Colosseo", mode: "Push" },
                               27: { name: "Esperanca", mode: "Push" },
                                28: { name: "New Queen Street", mode: "Push" },
                                 29: { name: "Runasapi", mode: "Push" }
 } as const;