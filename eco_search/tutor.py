import webbrowser

MOTS_INTERDITS = ["porno", "sexe", "xxx", "adulte", "nude", "hard", "hack", "crack"]

def lancer_recherche_filtree():
    while True:
        recherche = input("\nQue recherches-tu ? (ou 'quitter' pour sortir) : ").strip().lower()

        if recherche == "quitter":
            print("[MENTOR] : À bientôt !")
            break

        if not recherche:
            print("[MENTOR] : Tu n'as rien écrit. Réessaie.")
            continue

        # ── Vérification des mots interdits ─────────────────────────────────
        mot_bloque = next((mot for mot in MOTS_INTERDITS if mot in recherche), None)
        if mot_bloque:
            print(f"\n[BLOCAGE] Contenu interdit détecté : « {mot_bloque} ».")
            print("[MENTOR] : KRAK Mentor est réservé aux recherches scolaires.")
            print("           Reformule ta question.\n")
            continue  # ← on repose la question, on ne quitte PAS le programme

        # ── Recherche validée ────────────────────────────────────────────────
        print("\n[MENTOR] : Recherche en cours...")
        url = (
            f"https://duckduckgo.com/?q={recherche.replace(' ', '+')}"
            f"+site:edu+OR+site:ac-ci.edu.ci+OR+site:fasomoutra.com"
            f"+OR+site:toupty.com&kp=1&kl=fr-fr"
        )
        webbrowser.open(url)
        print("[MENTOR] : Résultats ouverts dans ton navigateur.")

        autre = input("\nFaire une autre recherche ? (o/n) : ").strip().lower()
        if autre != 'o':
            print("[MENTOR] : Bonne étude !")
            break
