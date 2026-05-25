def manager():
    print("--- ESPACE SQUAD ---")
    print("1. Voir les sujets")
    print("2. Poster un sujet")
    choix = input("Choisis une option : ")
    if choix == "1":
        print("Liste des sujets disponibles...")
    else:
        print("Fonctionnalité de dépôt en cours de création !")

if __name__ == "__main__":
    manager()
