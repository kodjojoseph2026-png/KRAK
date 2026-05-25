import time
import webbrowser

def lancer_recherche_filtree():
    recherche = input("Que recherches-tu ? ")
    filtres = "intitle:(cours|exercice|fiche|leçon) filetype:pdf OR filetype:html -site:pinterest.* -site:tiktok.* -site:instagram.* -site:facebook.* -site:youtube.* -site:tukif.porn -site:pornhub.com -site:xvideos.com -site:xnxx.com"
    url = f"https://www.google.com/search?q={recherche.replace(' ', '+')}+{filtres.replace(' ', '+')}"
    print("\n[MENTOR] : Je prépare tes résultats sécurisés...")
    time.sleep(1)
    webbrowser.open(url)

def analyse_par_ia():
    print("\n--- ANALYSE PAR IA ---")
    # ... (le reste de ton code analyse_par_ia ici si tu veux le garder)

def menu_eco_search():
    print("\n--- ECO SEARCH : Mentor Monde ---")
    print("1. Recherche Web Éducative")
    print("2. Analyse par IA")
    choix = input("Choisis (1 ou 2) : ")
    if choix == "1":
        lancer_recherche_filtree()
    elif choix == "2":
        analyse_par_ia()
