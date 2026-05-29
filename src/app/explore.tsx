import * as WebBrowser from 'expo-web-browser';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ─── Mots interdits (repris de eco_search/tutor.py) ───────────────────────────
const MOTS_INTERDITS = ['porno', 'sexe', 'xxx', 'adulte', 'nude', 'hard', 'hack', 'crack'];

// ─── Suggestions rapides par matière ──────────────────────────────────────────
const SUGGESTIONS = [
  { label: '📐 Théorème de Pythagore', query: 'théorème de Pythagore exercices corrigés' },
  { label: '⚡ Loi d\'Ohm', query: 'loi ohm exercices corrigés seconde' },
  { label: '🧬 Génétique', query: 'génétique mendel cours terminale' },
  { label: '📚 Dissertation', query: 'méthode dissertation français lycée' },
  { label: '🌍 Côte d\'Ivoire', query: 'histoire côte ivoire colonisation indépendance' },
  { label: '🔢 Probabilités', query: 'probabilités conditionnelles terminale exercices' },
  { label: '🧪 Chimie Organique', query: 'chimie organique estérification terminale' },
  { label: '🌡️ Thermodynamique', query: 'thermodynamique cours terminale C physique' },
];

// ─── Filtres de sources éducatives ────────────────────────────────────────────
const FILTRES = [
  { label: '🎓 Tous (éducatif)', filtre: 'site:edu OR site:ac-' },
  { label: '📖 Fasomoutra', filtre: 'site:fasomoutra.com' },
  { label: '✏️ Toupty', filtre: 'site:toupty.com' },
  { label: '🇫🇷 Cours gratuits', filtre: 'cours gratuit filetype:pdf' },
  { label: '▶️ YouTube', filtre: 'site:youtube.com cours' },
];

export default function EcoSearchScreen() {
  const [recherche, setRecherche] = useState('');
  const [filtreActif, setFiltreActif] = useState(0);
  const [historique, setHistorique] = useState<string[]>([]);

  const lancerRecherche = async (queryOverride?: string) => {
    const query = (queryOverride ?? recherche).trim().toLowerCase();

    if (!query) {
      Alert.alert('KRAK Mentor', 'Entre un mot ou une question pour rechercher.');
      return;
    }

    // ── Verrou de contenu ────────────────────────────────────────────────────
    for (const mot of MOTS_INTERDITS) {
      if (query.includes(mot)) {
        Alert.alert(
          '🚫 Contenu bloqué',
          `Le mot « ${mot} » est interdit.\n\nKRAK Mentor est réservé aux contenus scolaires. Reformule ta question.`,
          [{ text: 'Corriger ma recherche', style: 'cancel' }]
        );
        return; // ← on reste dans l'app, pas de sys.exit() !
      }
    }

    // ── Construction de l'URL avec safe search forcé ──────────────────────
    const filtre = FILTRES[filtreActif].filtre;
    // kp=1 = safe search activé | kl=fr-fr = résultats en français
    const urlQuery = encodeURIComponent(`${query} ${filtre}`);
    const url = `https://duckduckgo.com/?q=${urlQuery}&kp=1&kl=fr-fr&kaf=1`;

    // ── Historique local ──────────────────────────────────────────────────
    setHistorique((prev) =>
      [query, ...prev.filter((h) => h !== query)].slice(0, 8)
    );
    setRecherche('');

    // ── Ouverture dans le navigateur INTÉGRÉ (pas Chrome/Safari externe) ──
    // WebBrowser reste dans l'app : l'utilisateur ne peut pas changer l'URL
    // de départ ni naviguer vers d'autres apps. Il ferme et revient sur KRAK.
    await WebBrowser.openBrowserAsync(url, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
      toolbarColor: '#121214',
      controlsColor: '#00875f',
      showTitle: true,
      enableBarCollapsing: false,
    });
  };

  const viderHistorique = () => {
    Alert.alert('Effacer l\'historique ?', '', [
      { text: 'Annuler', style: 'cancel' },
      { text: 'Effacer', style: 'destructive', onPress: () => setHistorique([]) },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        {/* ── En-tête ───────────────────────────────────────────────────────── */}
        <View style={styles.header}>
          <Text style={styles.title}>🔍 KRAK Mentor</Text>
          <Text style={styles.subtitle}>Recherche scolaire filtrée — sûre et éducative</Text>
        </View>

        {/* ── Barre de recherche ────────────────────────────────────────────── */}
        <View style={styles.searchRow}>
          <TextInput
            style={styles.input}
            placeholder="Ex: théorème de Pythagore..."
            placeholderTextColor="#555"
            value={recherche}
            onChangeText={setRecherche}
            onSubmitEditing={() => lancerRecherche()}
            returnKeyType="search"
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.searchBtn} onPress={() => lancerRecherche()}>
            <Text style={styles.searchBtnText}>GO</Text>
          </TouchableOpacity>
        </View>

        {/* ── Filtres de sources ────────────────────────────────────────────── */}
        <Text style={styles.sectionLabel}>SOURCE</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtresRow}>
          {FILTRES.map((f, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.filtrePill, filtreActif === i && styles.filtrePillActive]}
              onPress={() => setFiltreActif(i)}
            >
              <Text style={[styles.filtrePillText, filtreActif === i && styles.filtrePillTextActive]}>
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Suggestions rapides ───────────────────────────────────────────── */}
        <Text style={styles.sectionLabel}>SUGGESTIONS RAPIDES</Text>
        <View style={styles.suggestionsGrid}>
          {SUGGESTIONS.map((s, i) => (
            <TouchableOpacity
              key={i}
              style={styles.suggestionCard}
              onPress={() => lancerRecherche(s.query)}
            >
              <Text style={styles.suggestionText}>{s.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Historique ────────────────────────────────────────────────────── */}
        {historique.length > 0 && (
          <>
            <View style={styles.historiqueHeader}>
              <Text style={styles.sectionLabel}>HISTORIQUE</Text>
              <TouchableOpacity onPress={viderHistorique}>
                <Text style={styles.effacer}>Effacer</Text>
              </TouchableOpacity>
            </View>
            {historique.map((h, i) => (
              <TouchableOpacity
                key={i}
                style={styles.historiqueItem}
                onPress={() => lancerRecherche(h)}
              >
                <Text style={styles.historiqueIcon}>🕐</Text>
                <Text style={styles.historiqueText}>{h}</Text>
              </TouchableOpacity>
            ))}
          </>
        )}

        {/* ── Bandeau info sécurité ─────────────────────────────────────────── */}
        <View style={styles.infoBanner}>
          <Text style={styles.infoText}>
            🛡️ KRAK Mentor filtre les contenus inappropriés et oriente vers des sources éducatives
            vérifiées (Fasomoutra, Toupty, sites académiques).
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121214' },
  scroll: { padding: 20, paddingBottom: 60 },

  header: { marginBottom: 24 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#00875f', letterSpacing: 1 },
  subtitle: { fontSize: 14, color: '#8d8d99', marginTop: 6 },

  searchRow: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  input: {
    flex: 1,
    backgroundColor: '#202024',
    color: '#fff',
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'web' ? 14 : 12,
    borderRadius: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#29292e',
  },
  searchBtn: {
    backgroundColor: '#00875f',
    paddingHorizontal: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  sectionLabel: {
    color: '#555',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 10,
    marginTop: 4,
  },

  filtresRow: { marginBottom: 24 },
  filtrePill: {
    backgroundColor: '#202024',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#29292e',
  },
  filtrePillActive: { backgroundColor: '#00875f', borderColor: '#00875f' },
  filtrePillText: { color: '#a8a8b3', fontSize: 13, fontWeight: '600' },
  filtrePillTextActive: { color: '#fff' },

  suggestionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 28,
  },
  suggestionCard: {
    backgroundColor: '#202024',
    borderWidth: 1,
    borderColor: '#29292e',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  suggestionText: { color: '#e1e1e6', fontSize: 13, fontWeight: '500' },

  historiqueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  effacer: { color: '#ef4444', fontSize: 13, fontWeight: '600' },
  historiqueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1e',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#29292e',
  },
  historiqueIcon: { marginRight: 10, fontSize: 14 },
  historiqueText: { color: '#a8a8b3', fontSize: 14 },

  infoBanner: {
    marginTop: 20,
    backgroundColor: '#0d2318',
    borderWidth: 1,
    borderColor: '#00875f33',
    borderRadius: 10,
    padding: 14,
  },
  infoText: { color: '#6dba97', fontSize: 13, lineHeight: 20 },
});
