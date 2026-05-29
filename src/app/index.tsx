import React, { useState, useRef } from 'react';
import {
  StyleSheet, Text, View, ScrollView,
  TouchableOpacity, StatusBar, FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const PROGRAMME: Record<string, { nom: string; desc: string; couleur: string }[]> = {
  '6ème': [
    { nom: 'Mathématiques',         desc: 'Nombres entiers, décimaux, géométrie de base',          couleur: '#3b82f6' },
    { nom: 'Physique - Chimie',     desc: 'Sources de lumière, états de la matière',               couleur: '#ef4444' },
    { nom: 'SVT',                   desc: 'Milieux naturels, respiration des êtres vivants',       couleur: '#10b981' },
    { nom: 'Français',              desc: 'Grammaire, conjugaison, lecture méthodique',            couleur: '#a855f7' },
    { nom: 'Anglais',               desc: 'Verb tenses, vocabulary, greeting basics',              couleur: '#f59e0b' },
    { nom: 'Histoire - Géographie', desc: 'La préhistoire, étude du milieu local',                 couleur: '#06b6d4' },
    { nom: 'EDHC',                  desc: 'Droits de l\'enfant, civisme et valeurs',               couleur: '#ec4899' },
  ],
  '5ème': [
    { nom: 'Mathématiques',         desc: 'Fractions, angles, symétrie centrale',                  couleur: '#3b82f6' },
    { nom: 'Physique - Chimie',     desc: 'Combustions, intensité et tension du courant',          couleur: '#ef4444' },
    { nom: 'SVT',                   desc: 'Alimentation des êtres vivants, les sols',              couleur: '#10b981' },
    { nom: 'Français',              desc: 'Texte narratif, dictée, vocabulaire',                   couleur: '#a855f7' },
    { nom: 'Anglais',               desc: 'Present continuous, daily routines',                    couleur: '#f59e0b' },
    { nom: 'Histoire - Géographie', desc: 'Premiers empires africains, les climats',               couleur: '#06b6d4' },
    { nom: 'EDHC',                  desc: 'Règles de vie en communauté, citoyenneté',              couleur: '#ec4899' },
  ],
  '4ème': [
    { nom: 'Mathématiques',         desc: 'Théorème de Pythagore, équations simples',              couleur: '#3b82f6' },
    { nom: 'Physique - Chimie',     desc: 'Molécules, atomes, lentilles et miroirs',               couleur: '#ef4444' },
    { nom: 'SVT',                   desc: 'Reproduction chez l\'homme, tectonique des plaques',    couleur: '#10b981' },
    { nom: 'Français',              desc: 'Texte argumentatif, résumé de texte',                   couleur: '#a855f7' },
    { nom: 'Anglais',               desc: 'Past simple, comparative and superlative',              couleur: '#f59e0b' },
    { nom: 'Histoire - Géographie', desc: 'Relief et population de Côte d\'Ivoire',                couleur: '#06b6d4' },
    { nom: 'Allemand / Espagnol',   desc: 'Bases de la 2ème langue, grammaire',                   couleur: '#64748b' },
  ],
  '3ème': [
    { nom: 'Mathématiques (BEPC)',  desc: 'Racines carrées, vecteurs, systèmes d\'équations',      couleur: '#3b82f6' },
    { nom: 'Physique - Chimie',     desc: 'Poids et masse, solutions acides et basiques',          couleur: '#ef4444' },
    { nom: 'SVT',                   desc: 'Immunologie, digestion, éducation à la santé',          couleur: '#10b981' },
    { nom: 'Français',              desc: 'Rédaction, étude d\'œuvre intégrale',                   couleur: '#a855f7' },
    { nom: 'Anglais',               desc: 'Passive voice, conditional sentences',                  couleur: '#f59e0b' },
    { nom: 'Histoire - Géographie', desc: 'De la colonisation à l\'indépendance',                  couleur: '#06b6d4' },
    { nom: 'Allemand / Espagnol',   desc: 'Expression écrite et orale, BEPC',                     couleur: '#64748b' },
  ],
  '2nde A': [
    { nom: 'Français',              desc: 'Commentaire composé, dissertation',                     couleur: '#a855f7' },
    { nom: 'Histoire - Géographie', desc: 'Démographie mondiale, civilisations',                   couleur: '#06b6d4' },
    { nom: 'Anglais',               desc: 'Advanced grammar, text analysis',                       couleur: '#f59e0b' },
    { nom: 'Mathématiques',         desc: 'Statistiques, équations, algèbre',                      couleur: '#3b82f6' },
    { nom: 'SVT',                   desc: 'Environnement et santé, dynamique terrestre',           couleur: '#10b981' },
    { nom: 'Allemand / Espagnol',   desc: 'Étude de textes, grammaire approfondie',               couleur: '#64748b' },
  ],
  '2nde C': [
    { nom: 'Mathématiques',         desc: 'Vecteurs, fonctions polynômes, repérage',               couleur: '#3b82f6' },
    { nom: 'Physique - Chimie',     desc: 'Loi d\'Ohm, conductivité, ions, équations',             couleur: '#ef4444' },
    { nom: 'SVT',                   desc: 'Écosystèmes, géologie structurale',                     couleur: '#10b981' },
    { nom: 'Français',              desc: 'Commentaire composé, dissertation',                     couleur: '#a855f7' },
    { nom: 'Histoire - Géographie', desc: 'Géographie économique, structures sociales',            couleur: '#06b6d4' },
    { nom: 'Anglais',               desc: 'Technical reading, vocabulary extension',               couleur: '#f59e0b' },
  ],
  '1ère A': [
    { nom: 'Français',              desc: 'Mouvements littéraires, contraction de texte',          couleur: '#a855f7' },
    { nom: 'Philosophie',           desc: 'Introduction à la pensée philosophique',                couleur: '#f43f5e' },
    { nom: 'Histoire - Géographie', desc: 'Côte d\'Ivoire physique et humaine',                    couleur: '#06b6d4' },
    { nom: 'Anglais',               desc: 'Literature, debate and composition',                    couleur: '#f59e0b' },
    { nom: 'Mathématiques',         desc: 'Suites numériques, probabilités',                       couleur: '#3b82f6' },
    { nom: 'Allemand / Espagnol',   desc: 'Littérature et culture de la langue',                   couleur: '#64748b' },
  ],
  '1ère C/D': [
    { nom: 'Mathématiques',         desc: 'Dérivabilité, limites, trigonométrie',                  couleur: '#3b82f6' },
    { nom: 'Physique - Chimie',     desc: 'Travail, puissance, chimie organique',                  couleur: '#ef4444' },
    { nom: 'SVT',                   desc: 'Génétique formelle, physiologie nerveuse',              couleur: '#10b981' },
    { nom: 'Français',              desc: 'Dissertation littéraire',                               couleur: '#a855f7' },
    { nom: 'Histoire - Géographie', desc: 'Étude économique des grandes puissances',               couleur: '#06b6d4' },
  ],
  'Tle A': [
    { nom: 'Philosophie (BAC)',     desc: 'Conscience, État, Liberté, Vérité',                     couleur: '#f43f5e' },
    { nom: 'Français',              desc: 'Œuvres intégrales, commentaire',                        couleur: '#a855f7' },
    { nom: 'Histoire - Géographie', desc: 'Le monde de 1945 à nos jours',                          couleur: '#06b6d4' },
    { nom: 'Anglais (Oral & Écrit)',desc: 'Exam prep, advanced essays',                            couleur: '#f59e0b' },
    { nom: 'Mathématiques',         desc: 'Analyse de fonctions, statistiques',                    couleur: '#3b82f6' },
    { nom: 'Allemand / Espagnol',   desc: 'Commentaire de texte, BAC',                             couleur: '#64748b' },
  ],
  'Tle C': [
    { nom: 'Mathématiques (BAC)',   desc: 'Complexes, intégrales, espaces vectoriels',             couleur: '#3b82f6' },
    { nom: 'Physique - Chimie',     desc: 'Cinématique, électromagnétisme, pH-métrie',             couleur: '#ef4444' },
    { nom: 'SVT',                   desc: 'Génétique humaine, évolution',                          couleur: '#10b981' },
    { nom: 'Philosophie',           desc: 'Grands courants philosophiques, BAC',                   couleur: '#f43f5e' },
    { nom: 'Français',              desc: 'Synthèse de documents, expression',                     couleur: '#a855f7' },
  ],
  'Tle D': [
    { nom: 'Mathématiques (BAC)',   desc: 'Fonctions LN/Exp, probabilités, suites',                couleur: '#3b82f6' },
    { nom: 'Physique - Chimie',     desc: 'Mécanique de Newton, estérification',                   couleur: '#ef4444' },
    { nom: 'SVT',                   desc: 'Évolution humaine, endocrinologie',                     couleur: '#10b981' },
    { nom: 'Philosophie',           desc: 'L\'Homme, la Société, la Connaissance',                 couleur: '#f43f5e' },
    { nom: 'Histoire - Géographie', desc: 'Relations internationales contemporaines',              couleur: '#06b6d4' },
  ],
};

const NIVEAUX = Object.keys(PROGRAMME);

const EMOJI: Record<string, string> = {
  'Mathématiques': '📐', 'Physique': '⚡', 'SVT': '🧬',
  'Français': '📚', 'Anglais': '🌍', 'Histoire': '🗺️',
  'EDHC': '🏛️', 'Philosophie': '🧠', 'Allemand': '💬', 'Espagnol': '💬',
};

function getEmoji(nom: string) {
  const key = Object.keys(EMOJI).find((k) => nom.includes(k));
  return key ? EMOJI[key] : '📌';
}

export default function HomeScreen() {
  const router = useRouter();
  const [classeActive, setClasseActive] = useState('2nde C');
  const tabScrollRef = useRef<ScrollView>(null);
  const matieres = PROGRAMME[classeActive] ?? [];

  return (
    <SafeAreaView style={s.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#0a0a0c" />

      {/* ── En-tête fixe ──────────────────────────────────────────────────── */}
      <View style={s.header}>
        <Text style={s.logo}>KRAK</Text>
        <View style={s.headerRight}>
          <Text style={s.flagBadge}>🇨🇮</Text>
          <View style={s.countBadge}>
            <Text style={s.countBadgeText}>{matieres.length} matières</Text>
          </View>
        </View>
      </View>

      {/* ── Onglets niveaux (scrollable horizontal, collés) ───────────────── */}
      <View style={s.tabsWrapper}>
        <ScrollView
          ref={tabScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.tabsContent}
          style={s.tabsScroll}
        >
          {NIVEAUX.map((n) => {
            const actif = classeActive === n;
            return (
              <TouchableOpacity
                key={n}
                style={[s.tab, actif && s.tabActive]}
                onPress={() => setClasseActive(n)}
                activeOpacity={0.7}
              >
                <Text style={[s.tabText, actif && s.tabTextActive]}>{n}</Text>
                {actif && <View style={s.tabUnderline} />}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* ── Liste matières ─────────────────────────────────────────────────── */}
      <FlatList
        data={matieres}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={s.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={s.listHeader}>
            Classe de <Text style={s.listHeaderBold}>{classeActive}</Text>
          </Text>
        }
        renderItem={({ item: m }) => (
          <TouchableOpacity
            style={s.row}
            onPress={() => router.push({ pathname: '/matiere/[nom]', params: { nom: m.nom } })}
            activeOpacity={0.7}
          >
            {/* Accent couleur */}
            <View style={[s.rowAccent, { backgroundColor: m.couleur }]} />

            {/* Icône */}
            <View style={[s.rowIcon, { backgroundColor: m.couleur + '20' }]}>
              <Text style={s.rowIconText}>{getEmoji(m.nom)}</Text>
            </View>

            {/* Nom + desc sur UNE SEULE LIGNE */}
            <View style={s.rowBody}>
              <Text style={s.rowName} numberOfLines={1}>{m.nom}</Text>
              <Text style={s.rowDesc} numberOfLines={1}>{m.desc}</Text>
            </View>

            {/* Flèche */}
            <Text style={[s.rowArrow, { color: m.couleur }]}>›</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0a0a0c' },

  // ── En-tête ────────────────────────────────────────────────────────────────
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 18, paddingTop: 10, paddingBottom: 12,
  },
  logo: { fontSize: 28, fontWeight: '900', color: '#00875f', letterSpacing: 1 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  flagBadge: { fontSize: 22 },
  countBadge: {
    backgroundColor: '#00875f18', borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 4,
    borderWidth: 1, borderColor: '#00875f33',
  },
  countBadgeText: { color: '#00875f', fontSize: 12, fontWeight: '700' },

  // ── Onglets niveaux ────────────────────────────────────────────────────────
  tabsWrapper: {
    borderBottomWidth: 1,
    borderColor: '#1e1e24',
  },
  tabsScroll: { backgroundColor: '#0a0a0c' },
  tabsContent: { paddingHorizontal: 14, gap: 4 },
  tab: {
    paddingHorizontal: 14, paddingVertical: 12,
    alignItems: 'center', position: 'relative',
  },
  tabActive: {},
  tabText: { color: '#444', fontSize: 13, fontWeight: '700' },
  tabTextActive: { color: '#00875f' },
  tabUnderline: {
    position: 'absolute', bottom: 0, left: 6, right: 6,
    height: 2, backgroundColor: '#00875f', borderRadius: 2,
  },

  // ── Liste ──────────────────────────────────────────────────────────────────
  listContent: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 90 },
  listHeader: { color: '#444', fontSize: 12, marginBottom: 10 },
  listHeaderBold: { color: '#aaa', fontWeight: '700' },

  // ── Ligne matière (tout sur UNE SEULE ligne) ───────────────────────────────
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111115',
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#1a1a20',
    overflow: 'hidden',
    height: 58,
  },
  rowAccent: { width: 3, alignSelf: 'stretch' },
  rowIcon: {
    width: 36, height: 36, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center',
    marginHorizontal: 12,
  },
  rowIconText: { fontSize: 18 },
  rowBody: { flex: 1, justifyContent: 'center' },
  rowName: { color: '#e8e8f0', fontSize: 14, fontWeight: '700', letterSpacing: 0.1 },
  rowDesc: { color: '#444', fontSize: 11, marginTop: 2 },
  rowArrow: { fontSize: 26, paddingHorizontal: 14, fontWeight: '300' },
});
