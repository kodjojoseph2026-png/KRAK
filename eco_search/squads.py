import time

# Liste des salles actives (Squads)
salles = {
    "Maths": {"eleves": ["Alice", "Bob"], "statut": "En cours"},
    "Physique": {"eleves": ["Charlie"], "statut": "En cours"},
    "Histoire": {"eleves": [], "statut": "Libre"}
}

def vue_superviseur():
    print("\n--- TABLEAU DE BORD DU SUPERVISEUR ---")
    for nom, info in salles.items():
        print(f"Squad : {nom} | Statut : {info['statut']} | Présents : {len(info['eleves'])}")
    print("---------------------------------------")

def rejoindre_squad(nom_eleve, nom_squad):
    if nom_squad in salles:
        salles[nom_squad]["eleves"].append(nom_eleve)
        print(f"[SYSTEME] {nom_eleve} a rejoint la Squad {nom_squad}.")
    else:
        print("Cette Squad n'existe pas.")
