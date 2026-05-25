import sys
import webbrowser

def lancer_recherche_filtree():
    # Liste de mots interdits
    mots_interdits = ["porno", "sexe", "xxx", "adulte", "nude", "hard"]
    
    recherche = input("Que recherches-tu ? ").lower()
    
    # VERROU ABSOLU : Si un mot est trouvé, on affiche un message et on quitte tout de suite.
    for mot in mots_interdits:
        if mot in recherche:
            print("\n[BLOCAGE] : CONTENU INTERDIT.")
            sys.exit() # Cette commande ferme le programme immédiatement.

    # Si on arrive ici, la recherche est validée.
    print("\n[MENTOR] : Recherche en cours...")
    url = f"https://duckduckgo.com/?q={recherche.replace(' ', '+')}+site:edu+OR+site:gouv&kp=-1"
    webbrowser.open(url)
