import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const MATIERES_RAPIDES = [
  { nom: 'Mathématiques',      emoji: '📐', couleur: '#3b82f6' },
  { nom: 'Physique - Chimie',  emoji: '⚡', couleur: '#ef4444' },
  { nom: 'SVT',                emoji: '🧬', couleur: '#10b981' },
  { nom: 'Français',           emoji: '📚', couleur: '#a855f7' },
  { nom: 'Anglais',            emoji: '🌍', couleur: '#f59e0b' },
  { nom: 'Histoire - Géographie', emoji: '🗺️', couleur: '#06b6d4' },
  { nom: 'Philosophie',        emoji: '🧠', couleur: '#f43f5e' },
  { nom: 'Allemand / Espagnol',emoji: '💬', couleur: '#64748b' },
  { nom: 'EDHC',               emoji: '🏛️', couleur: '#ec4899' },
];

const NIVEAUX = ['6ème','5ème','4ème','3ème','2nde A','2nde C','1ère A','1ère C/D','Tle A','Tle C','Tle D'];

export default function CoursScreen() {
  const router = useRouter();
  const [niveauChoisi, setNiveauChoisi] = useState('2nde C');

  const allerVersMatiere = (nom: string) => {
    router.push({ pathname: '/matiere/[nom]', params: { nom } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>

        {/* En-tête */}
        <View style={styles.header}>
          <Text style={styles.title}>📖 Mes Cours</Text>
          <Text style={styles.subtitle}>Accès direct à une matière</Text>
        </View>

        {/* Sélecteur de niveau */}
        <Text style={styles.sectionLabel}>TON NIVEAU</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.niveauxRow}>
          {NIVEAUX.map((n) => (
            <TouchableOpacity
              key={n}
              style={[styles.niveauPill, niveauChoisi === n && styles.niveauPillActive]}
              onPress={() => setNiveauChoisi(n)}
            >
              <Text style={[styles.niveauText, niveauChoisi === n && styles.niveauTextActive]}>
                {n}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Grille de matières */}
        <Text style={styles.sectionLabel}>MATIÈRES — {niveauChoisi}</Text>
        <View style={styles.grid}>
          {MATIERES_RAPIDES.map((m) => (
            <TouchableOpacity
              key={m.nom}
              style={[styles.card, { borderTopColor: m.couleur }]}
              onPress={() => allerVersMatiere(m.nom)}
            >
              <Text style={styles.cardEmoji}>{m.emoji}</Text>
              <Text style={styles.cardNom} numberOfLines={2}>{m.nom}</Text>
              <View style={[styles.badge, { backgroundColor: m.couleur + '22' }]}>
                <Text style={[styles.badgeText, { color: m.couleur }]}>Ouvrir →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Raccourci vers Devoirs */}
        <TouchableOpacity
          style={styles.devoirBanner}
          onPress={() => router.push('/devoirs')}
        >
          <Text style={styles.devoirBannerEmoji}>📝</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.devoirBannerTitle}>Espace Entraînement</Text>
            <Text style={styles.devoirBannerSub}>Traite un devoir avec chrono</Text>
          </View>
          <Text style={styles.devoirBannerArrow}>›</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: '#121214' },
  scroll:      { padding: 20, paddingBottom: 80 },
  header:      { marginBottom: 20 },
  title:       { fontSize: 30, fontWeight: 'bold', color: '#ffffff', letterSpacing: 1 },
  subtitle:    { fontSize: 14, color: '#8d8d99', marginTop: 4 },

  sectionLabel: {
    color: '#555', fontSize: 11, fontWeight: 'bold',
    letterSpacing: 1.5, marginBottom: 10, marginTop: 4,
  },

  niveauxRow:   { marginBottom: 24 },
  niveauPill:   {
    backgroundColor: '#202024', paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 20, marginRight: 8, borderWidth: 1, borderColor: '#29292e',
  },
  niveauPillActive: { backgroundColor: '#00875f', borderColor: '#00875f' },
  niveauText:       { color: '#a8a8b3', fontSize: 13, fontWeight: '600' },
  niveauTextActive: { color: '#fff' },

  grid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24,
  },
  card: {
    width: '47%', backgroundColor: '#202024', borderRadius: 12,
    padding: 16, borderWidth: 1, borderColor: '#29292e', borderTopWidth: 3,
  },
  cardEmoji: { fontSize: 28, marginBottom: 8 },
  cardNom:   { color: '#e1e1e6', fontWeight: 'bold', fontSize: 14, marginBottom: 10, lineHeight: 18 },
  badge:     { borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4, alignSelf: 'flex-start' },
  badgeText: { fontSize: 12, fontWeight: '700' },

  devoirBanner: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1a1a1e',
    borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#00875f44', gap: 12,
  },
  devoirBannerEmoji: { fontSize: 28 },
  devoirBannerTitle: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  devoirBannerSub:   { color: '#8d8d99', fontSize: 13, marginTop: 2 },
  devoirBannerArrow: { color: '#00875f', fontSize: 28, fontWeight: 'bold' },
});
