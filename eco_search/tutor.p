def lancer_recherche_filtree():
    # Liste de mots strictement interdits
    MOTS_INTERDITS = ["porno", "sexe", "xxx", "adulte", "nude", "hard"]
    
    recherche = input("Que recherches-tu ? ")
    
    # On vérifie si la recherche contient un mot interdit
    if any(mot in recherche.lower() for mot in MOTS_INTERDITS):
        print("\n[ALERTE SÉCURITÉ] : Recherche bloquée. Ce type de contenu n'est pas autorisé sur KRAK.")
        return # On arrête tout ici, le navigateur ne s'ouvre pas
        
    # Si le mot n'est pas interdit, on continue normalement
    filtres = "intitle:(cours|exercice|fiche|leçon) filetype:pdf OR filetype:html site:edu OR site:gouv OR site:ac-*.fr"
    url = f"https://www.google.com/search?q={recherche.replace(' ', '+')}+{filtres.replace(' ', '+')}"
    
    print("\n[MENTOR] : Je prépare tes résultats sécurisés...")
    import time
    time.sleep(1)
    import webbrowser
    webbrowser.open(url)
