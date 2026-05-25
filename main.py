import sys
import os

# Ajoute le dossier au chemin système pour pouvoir importer le fichier
sys.path.append(os.path.join(os.getcwd(), 'eco_search'))
from tutor import lancer_recherche_filtree

def menu():
    print("\n================================")
    print("      BIENVENUE DANS KRAK       ")
    print("================================")
    print("1. Accéder au Mentor (Eco Search)")
    print("2. Accéder aux Squads")
    print("3. Quitter")
    choix = input("Choisis une option : ")

    if choix == "1":
        lancer_recherche_filtree()
    elif choix == "2":
        # Ton autre script ici
        print("Accès aux Squads...")
    else:
        print("Au revoir !")

if __name__ == "__main__":
    menu()
